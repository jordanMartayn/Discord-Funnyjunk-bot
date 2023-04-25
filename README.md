Since I am not hosting this bot publically, you will need to run it yourself. Which can be a pain.
<li>Clone this repo locally</li>
<li>Go to the Discord Developer Hub Getting Started section: <a href="https://discord.com/developers/docs/getting-started">https://discord.com/developers/docs/getting-started</a></li>
<li>Go to the Application Center and create a new app: <a href="https://discord.com/developers/applications">https://discord.com/developers/applications</a></li>
<li>Follow the first steps in the Getting Started section, which instruct you to add a bot, give it relevant permissions and scopes make sure to also add permission for embedds, and generate a URL that can be used to install the bot to a Discord server.</li>
<li>Install ngrok with sudo to setup a local tunnel to act as an endpoint for the bot, as it is needed to host the response server locally.</li>
<li>Sign up for an account on ngrok, and obtain an authentication code to register with the <code>ngrok auth</code> command.</li>
<li>Withing the project directory create a <code>.env</code> file in the example project directory to store credentials and tokens, and place the necessary values in quotes instead of angle brackets. The tokens can be found in the getting started section and the application page for your app</li>
<li>Inside the example project directory, run the <code>node app.js</code> command to start the example application.</li>
<li>Run the <code>ngrok http 3000</code> command in a new terminal to start a local tunnel using ngrok, and copy the forwarding secure URL.</li>
<li>Run the <code>npm run register</code> command in the example project directory to install slash commands. The register script is detailed in the <code>package.json</code> file.</li>
<li>Add <code>/interactions</code> to the end of the forwarding secure URL and paste it as the interactions endpoint URL in the Discord Developer Portal for the app's slash command.</li>
<li>Test the <code>/fj-random</code> command to verify that the bot is working correctly.</li>