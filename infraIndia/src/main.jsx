import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ProjectProvider } from './contextapi/ProjectContext.jsx';

createRoot(document.getElementById('root')).render(
  <ProjectProvider>
  <MantineProvider>
    <App />
  </MantineProvider>
  </ProjectProvider>

)
