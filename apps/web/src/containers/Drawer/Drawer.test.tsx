import React from 'react';
import { render, screen } from '@nezhos/testing/react';

import Drawer from './Drawer'

test('Drawer renders', async () => {
  render(
    <Drawer />
  );

  expect(screen.getByText(/Home/i)).toBeTruthy()
  expect(screen.getByText(/Journal/i)).toBeTruthy()
})
