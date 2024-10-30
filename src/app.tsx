import { createRoot } from 'react-dom/client';
import Main from './main';
import './main.scss';

const root = createRoot(document.getElementById('root'));
root.render(<Main />);