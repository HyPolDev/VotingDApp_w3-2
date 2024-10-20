import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme/Provider.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
