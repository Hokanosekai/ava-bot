import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {client} from "../../index";
import {Logger} from "../../utils";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'discord_id',
        nullable: false
    })
    discordId: string;

    @Column({
        name: 'discord_tag',
        nullable: false
    })
    discordTag: string;

    @Column({
        name: 'points',
        nullable: false,
        default: 0
    })
    points: number;

    setId(value: number) {
        this.id = value;
        return this;
    }

    setDiscordId(value: string) {
        this.discordId = value;
        return this;
    }

    setDiscordTag(value: string) {
        this.discordTag = value;
        return this;
    }

    setPoints(value: number) {
        this.points = value;
        return this;
    }

    async create() {
        try {
            return await client.database.users.save(this, {reload: true});
        } catch (e) {
            Logger.error(e);
        }
    }
}