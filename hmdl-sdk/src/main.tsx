import React from 'react';
import ReactDOM from 'react-dom/client';
import { HmdlWidget } from '.';

const App: React.FC = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <HmdlWidget />
    </div>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);