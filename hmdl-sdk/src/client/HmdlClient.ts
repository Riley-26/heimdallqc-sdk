import type { ClientConfig, BaseResult, WebhookResult } from "../types";

export class HmdlClient {
    private apiKey: string
    private baseUrl?: string
    private checkedState?: boolean = false
    private confirmedState?: boolean = false
    errorPopup: boolean = false
    readonly key: string = `hmdl-client-${Math.random().toString(36).substring(2, 9)}`
    private onErrorPopupChange?: (state: boolean) => void

    constructor(config: ClientConfig) {
        this.apiKey = config.apiKey
        this.baseUrl = config.baseUrl
    }

    analyse(text: string): BaseResult | WebhookResult {
        const workId = `hmdl-wk-${crypto.randomUUID()}`
        try {
            this.triggerWebhook(text, workId);
            return { status: 200, message: "Analysis started", workId: workId, text: text };
        } catch {
            return { status: 500, message: "Analysis failed to start", workId: workId, text: text };
        }
    }

    private async triggerWebhook(text: string, workId: string) {
        const createSubmission = await fetch("https://tranquil-miracle-production.up.railway.app/analyse", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                orig_text: text,
                work_id: workId,
                question_result: this.checkedState,
                domain: window.location.hostname,
                page_link: window.location.href,
                webhook_url: this.baseUrl
            })
        });
        
        const createSubmissionResponse = await createSubmission.json();
        
        if (!createSubmission.ok) throw new Error()
        console.log(createSubmissionResponse)

        // CALL USER WEBHOOK WITH RESULTS

        return createSubmissionResponse
    }

    setOnErrorPopupChange(callback: (state: boolean) => void): void {
        this.onErrorPopupChange = callback
    }
    
    setCheckedState(state: boolean | undefined): void {
        this.checkedState = state
    }
    
    getCheckedState(): boolean | undefined {
        if (typeof(this.checkedState) == 'boolean') return this.checkedState
        return undefined
    }

    setConfirmedState(state: boolean | undefined): void {
        this.confirmedState = state
    }

    hasConfirmed(): boolean | undefined {
        if (typeof(this.confirmedState) == 'boolean' && this.confirmedState === true) return this.confirmedState
        return undefined
    }

    setErrorPopup(state: boolean): void {
        console.log("error")
        const oldState = this.errorPopup
        this.errorPopup = state
        console.log(oldState)
        console.log(state)
        
        if (oldState !== state && this.onErrorPopupChange) {
            this.onErrorPopupChange(state)
        }
    }
}