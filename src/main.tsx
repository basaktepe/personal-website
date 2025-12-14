import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ProfileProvider } from './context/ProfileContext'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
<ProfileProvider>
 <BrowserRouter>
    <AuthProvider>
       <App />
    </AuthProvider>
     
    </BrowserRouter>
</ProfileProvider>
   
    </ThemeProvider>,
)
