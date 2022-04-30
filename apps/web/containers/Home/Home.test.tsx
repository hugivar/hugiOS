import React from 'react';
import { render, screen } from '../../utils/test-utils';

import Home from './Home'

test('Home renders', async () => {
    render(
    <Home />
  )

    expect(screen.getByText(/Names are meaningless. Seek knowledge and understanding. Question Everything./i)).toBeTruthy()
})
