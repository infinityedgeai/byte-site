import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  it('renders Sun icon when theme is light', () => {
    const setThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    // Sun icon is visible
    expect(screen.getByRole('button')).toContainHTML('svg');
  });

  it('calls setTheme with "dark" when pressed', () => {
    const setThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
