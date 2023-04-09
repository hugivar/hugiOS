import { describe, expect, test } from 'vitest'
import { render, screen } from '@hugios/testing/solid';

import { Button } from './Button'

test('Button renders', async () => {
  render(() => <Button>Hugivar</Button>);

  expect(screen.getByText('Hugivar')).toBeTruthy()
})
