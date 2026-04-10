# Heimdall QC - SDK

The SDK to work with a Heimdall QC subscription. It provides a way for users to automatically submit texts for analysis. It also contains a webhook system for live results, and a widget component.

## Installation
```
npm install heimdallqc
```

## Getting started

To start, we import the custom hook from our 'hmdl' package and set a new instance for the client object. The valid API key and webhook url gets saved to the instance's config.

```
import { HmdlClient, HmdlWidget } from 'hmdl'

const hmdl = new HmdlClient({
    apiKey: 'abc123-def456...',
    baseUrl: 'https://webhook...'
})
```

## Features

### Analysing text



### Optional widget

A widget to display near text areas. Acts as both a deterrant and a confirmation step. The user must disclose if they have used AI generated content by ticking a box and confirming. The system will use the result in the analysis; the analysis will only be skipped if the user has ticked to say that they have used AI as an analysis would be redundant. The text gets instantly marked 'Action needed' in the dashboard.
