import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';


// fj-random url command
const FJ_RANDOM_COMMAND = {
  name: 'fj-random',
  description: 'Get a random top funnyjunk post.',
  type: 1,
};



const ALL_COMMANDS = [FJ_RANDOM_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);