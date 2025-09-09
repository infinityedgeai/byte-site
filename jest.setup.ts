import '@testing-library/jest-dom';
import React from 'react';
jest.mock('react-d3-cloud-modern', () => ({
  __esModule: true,
  default: () => React.createElement('div', null, 'Mocked WordCloud'),
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