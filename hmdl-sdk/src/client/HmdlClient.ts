import type { ClientConfig, BaseResult, WebhookResult } from "../types";

export class HmdlClient {
    private apiKey: string
    private baseUrl?: string

    constructor(config: ClientConfig) {
        this.apiKey = config.apiKey
        this.baseUrl = config.baseUrl
    }

    async analyse(text: string): Promise<BaseResult | WebhookResult> {
        throw new Error('Not implemented')
    }
}