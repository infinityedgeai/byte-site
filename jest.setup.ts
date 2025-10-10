import '@testing-library/jest-dom';
import 'whatwg-fetch';
import React from 'react';
jest.mock('react-d3-cloud-modern', () => ({
  __esModule: true,
  default: (): React.ReactElement =>
    React.createElement('div', { 'data-testid': 'mocked-wordcloud' }, 'Mocked WordCloud'),
}));

class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})