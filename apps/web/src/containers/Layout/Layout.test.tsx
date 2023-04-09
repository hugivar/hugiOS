import React from 'react';
import { render, screen } from '@hugios/testing/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';

import Layout from './Layout'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

test('Layout renders', async () => {
  render(
    <HelmetProvider>
      <Layout>
        <div>Hello World</div>
      </Layout>
    </HelmetProvider>
  )

  expect(screen.getByText(/Hugivar/i)).toBeTruthy()
  expect(screen.getByText(/Hello World/i)).toBeTruthy()
})
