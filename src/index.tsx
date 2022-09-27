import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './containers/App';
import './index.css';
import isDev from './utils/isDev';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

// We only want to log performance results in dev
if (isDev()) {
  reportWebVitals(console.log);
}
