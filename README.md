# Your SDK Name

The SDK to work with a Heimdall QC subscription. It provides a way for users to automatically submit texts for analysis. It also contains a webhook system for live results, and a widget component.

## Installation
```bash
npm install heimdallqc
```

## Getting started

import { HmdlClient, HmdlWidget } from 'hmdl'

const hmdl = new HmdlClient({
    apiKey: 'abc123-def456...'
})