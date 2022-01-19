import {Collection} from "discord.js";
import {User} from "../database/entities";
import {client} from "../index";
import {Logger} from "../utils";

export class UsersManager {

    private _cache: Collection<string, User> = new Collection<string, User>();

    constructor() {

    }

    async fetch(discordId: string) {
        if (!this._cache.has(discordId))
            this._cache.set(discordId, (await client.database.users.findOne({
                where: [
                    {discordId}
                ]
            })));
        return this._cache.get(discordId);
    }

    get cache(): Collection<string, User> {
        return this._cache;
    }
}