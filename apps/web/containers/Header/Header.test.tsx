import React from 'react';
import { render, screen } from '../../utils/test-utils';

import Header from './Header'

test('Header renders', async () => {
  render(
    <Header title="Example title" />
  );

  expect(screen.getByText(/Example title/i)).toBeTruthy()
})
