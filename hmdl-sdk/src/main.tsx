import React from 'react';
import ReactDOM from 'react-dom/client';
import { HmdlClient, HmdlWidget } from '.';

const App: React.FC = () => {
    const hmdl = new HmdlClient({apiKey:"CxVHrClHgVGwj7UAOHOCsyyPiUG4F8IiIw6jj23yWvc24VfG", baseUrl:"yeah"})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const textarea = e.currentTarget.elements.namedItem('inputText') as HTMLTextAreaElement
        if (textarea) {
            if (!hmdl.hasConfirmed()) {
                hmdl.setErrorPopup(true)
                return
            } else {
                const analysis = hmdl.analyse(textarea.value)
                console.log(analysis.workId)
            }
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "72px", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                    name="inputText"
                    style={{ width: "500px", height: "200px" }}
                />
                <button type="submit">Submit</button>
            </form>
            <HmdlWidget 
                key={hmdl.key}
                client={hmdl}
                theme={'dark'}
                defaultExpanded={true}
            />
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);