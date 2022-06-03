import React from 'react';
import { render, screen } from '@nezhos/testing/react';

import Header from './Header'

test('Header renders', async () => {
  render(
    <Header title="Example title" />
  );

  expect(screen.getByText(/Example title/i)).toBeTruthy()
})
