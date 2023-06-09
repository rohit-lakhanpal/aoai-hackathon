# Shared APIs

This is the Shared APIs project for the AOAI Hackathon repository. It's an Express app that provides helper APIs to call various Azure Cognitive Services. helping organizations explore the capabilities of democratized AI for SaaS businesses.

## Getting Started

### Prerequisites
#### Azure Services

1. Sign up for an Azure account: You need a [Microsoft account](https://account.microsoft.com/account) and an [Azure account](https://azure.microsoft.com/free/ai/)
1. Go to the Azure portal and create a Speech resource.   
    1. After the deployment is complete, fetch your api key and region (you will need this later)
    1. Access the speech studio at [https://speech.microsoft.com/](https://speech.microsoft.com/)
1. Go to the Azure portal and create a Language resource.
    1. After the deployment is complete, fetch your api key and region (you will need this later)
    1. Access the Language studio at [https://language.cognitive.azure.com/](https://language.cognitive.azure.com/)
1. Go to the Azure portal and create an Azure OpenAI resource.
    1. After the deployment is complete, fetch your api key and region (you will need this later)
    1. Access the Azure OpenAI studio at [https://oai.azure.com/](https://oai.azure.com/)

#### Development Environment
- Node.js (>=18.x)
- npm (>=9.x)
- yarn (>=1.22.x)



### Installing

1. Clone the repository
2. Change to the `shared-apis` directory:
    ```sh
    cd src/shared-apis
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file by copying the .env-sample and set up the required environment variables:
    ```sh
    cp .env-sample .env
    ```
    The file should look like so:
    ```    
    SPEECH_KEY=""
    SPEECH_REGION=""
    SPEECH_ENDPOINT_URL_OPTIONAL=""
    LANGUAGE_KEY=""
    LANGUAGE_REGION=""
    LANGUAGE_ENDPOINT_URL=""
    OPENAI_TYPE="azure"
    OPENAI_KEY=""
    OPENAI_AZURE_BASE_URL_OPTIONAL=""
    OPENAI_AZURE_API_VERSION_OPTIONAL=""

    ```
    

5. Start the development server:
    ```sh
    npm run start
    ```

## Usage

The server will run on `http://localhost:8085`. Refer to the API documentation for the available API endpoints and their usage. You can change the prot number by adding a PORT environment variable in the .env file.

## Contributing

Feel free to submit pull requests for new features, improvements or bug fixes. Make sure to follow the code style and update the API documentation if necessary.





