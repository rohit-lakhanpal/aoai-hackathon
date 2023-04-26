# Speech and Transcription

This is the Speech and Transcription project for the AOAI Hackathon repository. It's a React + Material UI web app that demonstrates how to transcribe audio in real time and how to convert text to speech using the Azure Speech Service. This app relies on APIs published via the shared-apis project within this repo. Please ensure that the shared-apis project is running before attempting to use this app.

## Getting Started

### Prerequisites
The shared-apis project must be running (follow the instructions in [shared-apis](../shared-apis/README.md))

#### Development Environment
- Node.js (>=18.x)
- npm (>=9.x)
- yarn (>=1.22.x)

### Installing

1. Clone the repository: https://github.com/rohit-lakhanpal/aoai-hackathon.git
    ```sh
    git clone https://github.com/rohit-lakhanpal/aoai-hackathon.git
    ```
2. Change to the `ui` directory:
    ```sh
    cs src/ui
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Run the project
    ```sh
    npm run start
    ```

## Usage

The server will run on `http://localhost:8081`. The web app allows you to test the real-time speech-to-text and text-to-speech capabilities using the Azure Speech Service.

Requests to `/api` are proxied to the shared-apis project at `http://localhost:8085/api`. 

## Contributing

Feel free to submit pull requests for new features, improvements, or bug fixes. Make sure to follow the code style and update the documentation if necessary.

