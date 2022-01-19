import * as process from "process";
require('dotenv').config({path: `${process.cwd()}/.env`})
import {ExtendedClient} from "./structures";

export const client = new ExtendedClient({intents: 32767});
client.start();