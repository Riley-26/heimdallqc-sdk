# Heimdall QC - SDK

The SDK to work with a Heimdall QC subscription. It provides a way for users to automatically submit texts for analysis. It also contains a webhook system for live results, and a widget component.

## Installation
```ts
npm install heimdallqc
```

## Getting started

To start, we import the custom hook from our 'hmdl' package and set a new instance for the client object. The valid API key and webhook url gets saved to the instance's config.

```ts
import { HmdlClient, HmdlWidget } from 'hmdl'

const hmdl = new HmdlClient({
    apiKey: 'abc123-def456...',
    baseUrl: 'https://webhook...'
})
```

## Features

### Analysing text

Ideally used in form elements, which takes an input text and analyses the text in the form submit handler. Calling the 'analyse' method of the client ('hmdl' in this case) is synchronous; as soon as the text is submitted, the user is free to leave the page.

```ts
const analysis = hmdl.analyse(textarea.value)
```

Full example use

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const textarea = e.currentTarget.elements.namedItem('inputText') as HTMLTextAreaElement
    if (textarea) {
        if (!hmdl.hasConfirmed()) {
            hmdl.setErrorPopup(true)
            return
        } else {
            const analysis = hmdl.analyse(textarea.value)
            console.log(analysis)
        }
    }
}
```

### Widget

An optional widget to display near text areas. Acts as both a deterrant and a confirmation step. The user must disclose if they have used AI generated content by ticking a box and confirming. The system will use the result in the analysis; the analysis will only be skipped if the user has ticked to say that they have used AI as an analysis would be redundant. The text gets instantly marked 'Action needed' in the dashboard.

```ts
import 'heimdallqc/dist/heimdallqc.css'

...
return (
    <HmdlWidget 
        key={hmdl.key}
        client={hmdl}
        theme={'dark'}
        defaultExpanded={true}
    />
)
```

### Work ID

Each submission of text generates a work ID. This can be used to see what stage the submission is at in the analysis in the dashboard. The 'analyse' method will return a 200 or 500 status with the 'workId'.

### Webhook

When the submission is finished analysing, the system returns a status:

**200**: Analysis results are received, sent to the webhook  
**400**: Data couldn't be sent to the webhook  
**500**: Internal error, data not sent to webhook  

### Error state

An optional error popup for when the user hasn't confirmed but tries to submit. This is ideal to implement, but may create a bit of friction for users when they just want to submit text.

```ts
if (!hmdl.hasConfirmed()) {
    hmdl.setErrorPopup(true)
    return
```
