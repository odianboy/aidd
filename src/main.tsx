import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from 'antd';

import { SolutionOptimizationPage } from './pages/solution-optimization';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          colorPrimary: '#2FBEAD',
        },
      }}
    >
      <SolutionOptimizationPage />
    </ConfigProvider>
  </StrictMode>,
);
