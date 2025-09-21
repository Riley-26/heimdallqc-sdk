import type { HmdlClient } from "../client/HmdlClient"

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
    client: HmdlClient
    theme?: 'dark' | 'light'
    defaultExpanded?: boolean,
    showErrorPopup?: any
}