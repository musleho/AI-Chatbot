## Basic instructions for use:

1. Download the files to your local device or clone the repository.
2. Navigate to the project's root directory and get dependencies by running ```npm install```
3. Create a .env file somewhere in your project directory.
4. In the .env file, create an environment variable OPENAI_API_KEY and copy+paste your OpenAI API key to this variable (this can be obtained from the OpenAI website).

#### NOTE: Using OpenAI's API is not completely free. You start off with an $18.00 time-limited credit after which you will have to pay every time someone makes a call to it (which happens after each message and costs about $0.002 per 1000 tokens. By default, this chatbot limits GPT's responses to 250 tokens).

5. In the root directory, create a folder called .webpack.
6. Inside the .webpack folder, create a file called webpack.config.js
7. Copy and paste the following, replacing ">>PATH TO .ENV FILE<<" with your actual .env file location or using the dotenv package's built in utility for locating the file.

```javascript
const webpack = require('webpack');
const dotenv = require('dotenv').config({path: '>>PATH TO .ENV FILE<<'});

module.exports = {
    entry: '/src/scripts/chat.js',
    mode: 'development',
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };
```

8. Run the command ```npm run bundle```. If no errors occur, everything was done correctly and the component should be able to load and run normally.
