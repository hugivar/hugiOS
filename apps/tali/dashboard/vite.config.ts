import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      TODOIST_CLIENT_ID: process.env.TODOIST_CLIENT_ID || JSON.stringify(env.TODOIST_CLIENT_ID),
    },
  }
})