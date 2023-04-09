import React from 'react';
import { expect, test } from 'vitest'
import { render, screen } from '@hugios/testing/react';

import { Button } from './Button'

test('Button renders', async () => {
  render(
    <Button>Hugivar</Button>,
  )

  expect(screen.getByText('Hugivar')).toBeTruthy()
})
