import React from 'react';
import { render, screen } from 'utils/test-utils';

import { Button } from './Button'

test('Button renders', async () => {
    render(
    <Button>Nezhivar</Button>,
  )

    // expect(screen.getByText('Nezhivar')).toBeTruthy()
})
