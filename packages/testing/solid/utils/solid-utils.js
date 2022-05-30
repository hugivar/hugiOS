/* eslint-disable import/export */
import { render } from 'solid-testing-library'

const customRender = (ui, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })

export * from 'solid-testing-library'
// override render export
export { customRender as render }