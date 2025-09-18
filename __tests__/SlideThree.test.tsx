import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SlideThree from '../src/components/SlideThree';

beforeAll(() => {
  class IntersectionObserverMock {
    constructor(private cb: any) {}
    observe() { this.cb([{ isIntersecting: true }]); }
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  });

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 500 });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 400 });
});

describe('SlideThree (mocked WordCloud)', () => {
  it('renders the SlideThree component', () => {
    render(<SlideThree />);
    expect(screen.getByTestId('SlideThree')).toBeInTheDocument();
  });

  it('renders the mocked WordCloud', async () => {
    render(<SlideThree />);

    const wordCloud = await waitFor(() =>
      screen.getByTestId('mocked-wordcloud'),
      { timeout: 2000 } 
    );

    expect(wordCloud).toBeInTheDocument();
    expect(wordCloud).toHaveTextContent('Mocked WordCloud');
  });
});
