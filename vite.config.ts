import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '~/src': path.resolve(__dirname, 'src'), // @를 src 폴더로 매핑
      },
    },
    server: {
      host: true,
      port: parseInt(process.env.VITE_PORT || '3031'),
    },
  };
});
