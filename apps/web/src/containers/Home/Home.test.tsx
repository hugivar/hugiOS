import React from 'react';
import { render, screen, TestWrapper } from '@hugios/testing/react';
import { vi } from 'vitest';

import Home from './Home'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

test('Home renders with correct text', async () => {
  render(
    <TestWrapper>
      <Home />
    </TestWrapper>
  )

  expect(screen.getByText(/Hey, I'm Hugivar/i)).toBeTruthy()

  expect(screen.getByText(/I'm a full-stack engineer/i)).toBeTruthy()
  expect(screen.getByText(/page for a glimpse into the various technologies/i)).toBeTruthy()

  expect(screen.getByText('Anonymity')).toBeTruthy()
  expect(screen.getByText(/See that bird?/i)).toBeTruthy()
  expect(screen.getByText(/Richard Feynman/i)).toBeTruthy()

  expect(screen.getByText(/Names are meaningless/i)).toBeTruthy()
  expect(screen.getByText(/Anonymity should be sought after at all costs/i)).toBeTruthy()
})
