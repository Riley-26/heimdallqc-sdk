// Core response types
export interface BaseResult {
    status: 200 | 500
    message: string
    workId: string
    text: string
}

export interface WebhookResult extends BaseResult {
    modifiedText: string
}

// Configuration types
export interface ClientConfig {
    apiKey: string
    baseUrl?: string
}

// Widget props
export interface WidgetProps {
    apiKey: string
    checkedState: boolean
    theme: 'dark' | 'light'
}