import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {client} from "../../index";
import {Logger} from "../../utils";

@Entity()
export class User {

    @PrimaryColumn({
        name: 'discord_id',
        unique: true,
        nullable: false
    })
    discordId: string;

    @Column({
        name: 'discord_tag',
        nullable: false
    })
    discordTag: string;

    @Column({
        name: 'discord_name',
        nullable: false
    })
    discordName: string;

    @Column({
        name: 'points',
        nullable: false,
        default: 0
    })
    points: number;

    @Column({
        name: 'guilde',
        nullable: false
    })
    guilde: string

    setDiscordId(value: string) {
        this.discordId = value;
        return this;
    }

    setDiscordTag(value: string) {
        this.discordTag = value;
        return this;
    }

    setDiscordName(value: string) {
        this.discordName = value;
        return this;
    }

    setPoints(value: number) {
        this.points = value;
        return this;
    }

    addPoints(value: number) {
        this.points += value;
        return this;
    }

    removePoints(value: number) {
        this.points -= value;
        return this;
    }

    setGuilde(value: string) {
        this.guilde = value;
        return this;
    }

    async update() {
        try {
            return await client.database.users.save(this);
        } catch (e) {
            Logger.error(e);
        }
    }
}