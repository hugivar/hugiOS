import React from 'react';
import { render, screen } from '@nezhos/testing/react';
import { vi } from 'vitest'

import Drawer from './Drawer'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

test('Drawer renders', async () => {
  render(
    <Drawer />
  );

  expect(screen.getByText(/Home/i)).toBeTruthy()
  expect(screen.getByText(/Journal/i)).toBeTruthy()
})
