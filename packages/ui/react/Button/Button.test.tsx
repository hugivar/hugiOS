import { render, screen } from '@nezhos/testing';

import { Button } from './Button'

test('Button renders', async () => {
  render(
    <Button>Nezhivar</Button>,
  )

  expect(screen.getByText('Nezhivar')).toBeTruthy()
})
