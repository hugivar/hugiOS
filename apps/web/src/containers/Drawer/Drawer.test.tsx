import React from 'react';
import { render, screen } from '@hugios/testing/react';
import { vi } from 'vitest'

import Drawer from './Drawer'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

test('Drawer renders', async () => {
  render(
    <Drawer />
  );

  expect(screen.getByText(/Home/i)).toBeTruthy();
})
