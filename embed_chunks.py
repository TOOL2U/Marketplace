import json
import fnmatch
from pathlib import Path
import openai
import tiktoken
import textwrap

# Config
MODEL = "text-embedding-ada-002"
CHUNK_TOKEN_LIMIT = 800
LOG_FILE = "embedding_log.csv"

# Load filter rules
with open("embedding_filter.json", "r") as f:
    filters = json.load(f)

# Tokenizer setup
encoding = tiktoken.encoding_for_model(MODEL)
def count_tokens(text): return len(encoding.encode(text))

# File filtering
def matches(path, patterns): return any(fnmatch.fnmatch(path, pat) for pat in patterns)
def get_valid_files():
    root = Path(".")
    included = filters.get("include", [])
    excluded = filters.get("exclude", [])

    print("\n🔍 Scanning for matching files...\n")
    for file in root.rglob("*"):
        rel = str(file.relative_to(root))
        if not file.is_file():
            continue

        is_included = not included or matches(rel, included)
        is_excluded = matches(rel, excluded)

        if is_included and not is_excluded:
            print(f"✅ Included: {rel}")
            yield file
        else:
            print(f"❌ Skipped:  {rel} (Included? {is_included}, Excluded? {is_excluded})")

# Chunking logic
def chunk_text(text, limit):
    words = text.split()
    chunks = []
    chunk = []
    for word in words:
        chunk.append(word)
        if count_tokens(" ".join(chunk)) > limit:
            chunks.append(" ".join(chunk[:-1]))
            chunk = [word]
    if chunk:
        chunks.append(" ".join(chunk))
    return chunks

# Embedding chunks
total_tokens = 0
with open(LOG_FILE, "w") as log:
    log.write("file,chunk_id,tokens\n")

    for file in get_valid_files():
        try:
            content = file.read_text(encoding="utf-8", errors="replace")
            if not content.strip():
                continue

            chunks = chunk_text(content, CHUNK_TOKEN_LIMIT)
            for idx, chunk in enumerate(chunks):
                token_len = count_tokens(chunk)
                print(f"\ud83d\udce6 {file} [Chunk {idx}] \u2192 {token_len} tokens")
                response = openai.embeddings.create(input=chunk, model=MODEL)
                used = response.usage.total_tokens
                total_tokens += used
                log.write(f"{file},{idx},{used}\n")

        except Exception as e:
            print(f"\u26a0\ufe0f Error with {file}: {e}")

print(f"\n\u2705 Done chunking. Total tokens used: {total_tokens}")