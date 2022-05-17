import React from 'react';
import { render, screen } from '../../utils/test-utils';

import Home from './Home'

test('Home renders with correct text', async () => {
  render(
    <Home />
  )

  expect(screen.getByText(/Hey, I'm nezhivar /i)).toBeTruthy()

  expect(screen.getByText(/home.me.subtitle1 /i)).toBeTruthy()
  expect(screen.getByText(/journal.title/i)).toBeTruthy()
  expect(screen.getByText(/home.me.visit/i)).toBeTruthy()
  expect(screen.getByText(/collection.title/i)).toBeTruthy()
  expect(screen.getByText(/home.me.subtitle2/i)).toBeTruthy()

  expect(screen.getByText(/home.quote.title/i)).toBeTruthy()
  expect(screen.getByText(/home.quote.desc/i)).toBeTruthy()
  expect(screen.getByText(/home.quote.author/i)).toBeTruthy()

  expect(screen.getByText(/home.idea.names/i)).toBeTruthy()
  expect(screen.getByText(/home.idea.anonymity/i)).toBeTruthy()
})
