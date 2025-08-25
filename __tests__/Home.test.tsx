import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

describe('Home page', () => {
  it('renders the main content', () => {
    render(<Home />);
    expect(screen.getByText(/Software Development Services/i)).toBeInTheDocument();
  });
});
