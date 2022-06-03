import React from 'react';
import { expect, test } from 'vitest'
import { render, screen } from '@nezhos/testing/react';

import { Button } from './Button'

test('Button renders', async () => {
  render(
    <Button>Nezhivar</Button>,
  )

  expect(screen.getByText('Nezhivar')).toBeTruthy()
})
