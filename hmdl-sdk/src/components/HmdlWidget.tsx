import type { WidgetProps } from "../types"

export const HmdlWidget: React.FC<WidgetProps> = ({
    apiKey,
    checkedState,
    theme
}) => {


    return (
        <div className={`widget-container ${theme === 'dark' && 'dark'}`}>
            <h1>hello</h1>
        </div>
    )
}