# FaceCheck AI – Next.js Face API Integration

## Overview
FaceCheck AI is an open-source Next.js project that integrates the Azure Face API for facial recognition and analysis. This project is designed to help developers quickly set up and utilize Azure's AI-powered facial recognition capabilities using the official JavaScript SDK. Whether you're a beginner exploring AI services or a developer looking for an SDK-implemented solution, this project is a great starting point.

## Features
- Ready-to-use Azure Face API integration with JavaScript SDK
- Face detection and recognition
- Next.js frontend for easy interaction
- Secure authentication using Azure Identity Client Library
- Open-source and community-driven

## Prerequisites
Before setting up the project, ensure you have the following:
- **Node.js** (v16 or later)
- **Azure Subscription**
- **Face API Key & Endpoint** (from [Azure Portal](https://portal.azure.com))
- **Next.js Installed**

## Installation
Follow these steps to set up the project:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/FaceCheck-AI.git
   cd FaceCheck-AI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file and add your Azure credentials:
   ```sh
   AZURE_FACE_API_KEY=your_api_key
   AZURE_FACE_API_ENDPOINT=your_endpoint
   ```

## Usage
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Upload an image or use a webcam to detect faces using Azure Face API.

## Integration with Azure Face API
This project follows Microsoft's [official JavaScript SDK tutorial](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/quickstarts-sdk/identity-client-library?tabs=windows%2Cvisual-studio&pivots=programming-language-javascript) and provides a working implementation.

Example of making a Face API request:
```javascript
import { AzureKeyCredential } from "@azure/ai-form-recognizer";
import { FaceClient } from "@azure/cognitiveservices-face";

const endpoint = process.env.AZURE_FACE_API_ENDPOINT;
const key = process.env.AZURE_FACE_API_KEY;

const client = new FaceClient(endpoint, new AzureKeyCredential(key));

async function detectFaces(imageUrl) {
  const detectedFaces = await client.face.detectWithUrl(imageUrl, {
    returnFaceId: true,
    returnFaceAttributes: ["age", "gender", "emotion"],
  });
  console.log(detectedFaces);
}
```

## Deployment
To deploy the project on Vercel:
```sh
npm run build
vercel deploy
```

## Contributing
This project is open-source, and contributions are welcome! Whether you want to improve the integration, add new features, or fix bugs, feel free to submit a pull request or open an issue. Let's build together!

## License
This project is licensed under the MIT License, so you are free to use, modify, and share it.

---
**Author:** Zubair Jamil

