import { describe, expect, test } from 'vitest'
import { render, screen } from '@hugios/testing/solid';

import { Button } from './Button'

test('Button renders', async () => {
  render(
    <Button>Nezhivar</Button>,
  )

  expect(screen.getByText('Nezhivar')).toBeTruthy()
})
