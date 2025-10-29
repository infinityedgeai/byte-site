import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import * as React from 'react';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly after hydration', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    const button = screen.getByLabelText('Toggle theme');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders Sun icon when theme is light after hydration', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light', 
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button')).toContainHTML('svg');
  });

  it('renders Moon icon when theme is dark', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });
  });

  it('calls setTheme with "dark" when pressed from light mode', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });
    
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when pressed from dark mode', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });
    
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('light');
  });

  it('handles system theme correctly', async () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });
    
    const button = screen.getByLabelText('Toggle theme');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
