import { describe, expect, test } from 'vitest'
import { render, screen } from '@hugios/testing/solid';

import App from './App'

describe('App renders with correct text', async () => {
    test('renders', () => {
        const { unmount } = render(() => <App />)
        expect(screen.getByText(/Learn Solid/i)).toBeTruthy();

        unmount()
    })
})
