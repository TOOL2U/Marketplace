import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the header title', () => {
    render(<Header />);
    const titleElement = screen.getByText(/MAN2U Admin/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    render(<Header />);
    const searchBar = screen.getByPlaceholderText(/Search.../i);
    expect(searchBar).toBeInTheDocument();
  });

  it('renders the notifications button', () => {
    render(<Header />);
    const notificationsButton = screen.getByRole('button', { name: /notifications/i });
    expect(notificationsButton).toBeInTheDocument();
  });
});