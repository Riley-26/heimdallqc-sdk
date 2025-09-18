import React from 'react';
import ReactDOM from 'react-dom/client';
import { HmdlClient, HmdlWidget } from '.';

const App: React.FC = () => {
    const hmdl = new HmdlClient({apiKey:"1", baseUrl:"yeah"})

    hmdl.analyse("text")

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <HmdlWidget 
                apiKey={'1'}
                checkedState={true}
                theme={'dark'}
            />
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);