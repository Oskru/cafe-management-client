import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { CssBaseline } from '@mui/material';

// Material UI Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
