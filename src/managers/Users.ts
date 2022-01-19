import {Collection} from "discord.js";
import {User} from "../database/entities";
import {client} from "../index";

export class UsersManager {

    private _cache: Collection<string, User> = new Collection<string, User>();

    constructor() {

    }

    async fetch(discordID: string) {
        if (!this._cache.has(discordID))
            this._cache.set(discordID, (await client.database.users.findOne({
                where: [
                    {_discord_id: discordID}
                ]
            })));
        return this._cache.get(discordID);
    }

    get cache(): Collection<string, User> {
        return this._cache;
    }
}