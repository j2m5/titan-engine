import './styles/base.scss'
import { createRoot, Root } from 'react-dom/client'
import App from './ui/App'

const app: Element | null = document.querySelector('#app')

if (app) {
  const root: Root = createRoot(app)
  root.render(<App />)
}
