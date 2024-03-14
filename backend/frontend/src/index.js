import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { TeacherProvider } from "../src/contexts/TeacherContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TeacherProvider>
      <App />
    </TeacherProvider>
  </React.StrictMode>
);
