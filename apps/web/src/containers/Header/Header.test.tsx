import React from 'react';
import { render, screen } from '@hugios/testing/react';
import { vi } from 'vitest';

import Header from './Header'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));


test('Header renders', async () => {
  render(
    <Header title="Example title" />
  );

  expect(screen.getByText(/Example title/i)).toBeTruthy()
})
