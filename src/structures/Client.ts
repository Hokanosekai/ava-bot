import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    ClientOptions,
    Collection
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import * as process from "process";
import ConfigJson from '../config/config.json';
import {Event} from "./Event";
import {Logger} from "../utils";
import {CommandType, ConfigType} from "../typings";
import {DataBase} from "../managers";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {

    database: DataBase = new DataBase();

    commands: Collection<string, CommandType> = new Collection<string, CommandType>();

    config: ConfigType = {
        ids: process.env.APP_ENV === 'dev'? ConfigJson.dev : ConfigJson.live,
        text: ConfigJson.text
    };

    constructor(options: ClientOptions) {
        super(options);
    }

    static async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async start() {

        await this.registerCommands();
        await this.registerEvents();

        this.login(process.env.TOKEN).then(async () => {

            Logger.test(this.database)
        });
    }

    async registerEvents() {
        const eventsFiles = await globPromise(
            `${__dirname}/../Events/*{.ts,.js}`
        );
        for (const filePath of eventsFiles) {
            const event: Event<keyof ClientEvents> = await ExtendedClient.importFile(filePath);
            Logger.info(`Loaded Event - ${event.event}`)
            this.on(event.event, event.run);
        }
    }

    async registerCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../Commands/*/*{.ts,.js}`
        );
        for (const filePath of commandFiles) {
            const command: CommandType = await ExtendedClient.importFile(filePath);
            if (!command.name) continue;
            Logger.info(`Loaded Command - ${command.name}`);
            await this.commands.set(command.name, command);
            slashCommands.push(command);
        }

        this.on('ready', async () => {
            try {
                Logger.info(`Started refreshing application (/) commands.`);
                const guild = await this.guilds.fetch(this.config.ids.guild_id);
                guild.commands.set(slashCommands).then(async cmd => {
                    const fullPermissions = cmd.reduce((accumulator, x) => {
                        // @ts-ignore
                        const cmd: CommandType = slashCommands.find(u => u.name === x.name);
                        return [
                            ...accumulator,
                            {
                                id: x.id,
                                permissions: cmd.permissions
                            }
                        ];
                    }, []);

                    await guild.commands.permissions.set({fullPermissions});
                })

            } catch (e) {
                Logger.error(`Failed refreshing application (/)  commands.\n- ${e}`);
            } finally {
                Logger.success(`Successfully reloaded application (/) commands.`);
            }
        });
    }
}
