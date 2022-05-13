import React from 'react';
import { render, screen } from '../../utils/test-utils';
import { HelmetProvider } from 'react-helmet-async';

import Layout from './Layout'

test('Layout renders', async () => {
  render(
    <HelmetProvider>
      <Layout>
        <div>Hello World</div>
      </Layout>
    </HelmetProvider>
  )

  expect(screen.getByText(/Nezhivar/i)).toBeTruthy()
  expect(screen.getByText(/Hello World/i)).toBeTruthy()
})
