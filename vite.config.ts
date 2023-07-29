import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), 'VITE_APP')

  return {
    plugins: [react()],
    define: {
      'process.env': `${JSON.stringify(env)}`,
    },
    base: `/${name}/`,
    esbuild: {
      keepNames: true,
    },
    resolve: {
      alias: {
        '@/styles': path.resolve(__dirname, './styles'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
