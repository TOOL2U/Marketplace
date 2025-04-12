import json
import fnmatch
from pathlib import Path
import openai
import tiktoken

# CONFIG
MODEL = "text-embedding-ada-002"
LOG_FILE = "embedding_log.csv"

# Load filters
with open("embedding_filter.json", "r") as f:
    filters = json.load(f)

# Token counter
encoding = tiktoken.encoding_for_model(MODEL)
def count_tokens(text): return len(encoding.encode(text))

# Path filter logic
def matches(path, patterns): return any(fnmatch.fnmatch(path, pat) for pat in patterns)
def get_files():
    root = Path(".")
    files = []
    for file in root.rglob("*"):
        if file.is_file():
            rel = str(file.relative_to(root))
            if matches(rel, filters["exclude"]): continue
            if "include" in filters and not matches(rel, filters["include"]): continue
            files.append(file)
    return files

# Start embedding
total = 0
with open(LOG_FILE, "w") as log:
    log.write("file,tokens\n")
    for file in get_files():
        try:
            text = file.read_text(encoding="utf-8", errors="ignore")
            if not text.strip(): continue
            tokens = count_tokens(text)
            print(f"📄 {file} → {tokens} tokens")

            response = openai.embeddings.create(input=text, model=MODEL)
            used = response.usage.total_tokens
            total += used
            log.write(f"{file},{used}\n")

        except Exception as e:
            print(f"⚠️ {file}: {e}")

print(f"\n✅ All done. Total tokens used: {total}")