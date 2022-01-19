import {Command} from "../../structures";
import {GuildMember} from "discord.js";
import {Embeds, Logger} from "../../utils";
import {User} from "../../database/entities";
import {client} from "../../index";

export default new Command({
    name: 'reset',
    description: 'Reset points number',
    defaultPermission: false,

    permissions: [
        {
            id: client.config.ids.roles.bras_droit,
            type: "ROLE",
            permission: true
        },
        {
            id: client.config.ids.roles.meneur,
            type: "ROLE",
            permission: true
        },
        {
            id: client.config.ids.roles.officier_versus,
            type: "ROLE",
            permission: true
        },
        {
            id: client.config.ids.roles.officier_wersus,
            type: "ROLE",
            permission: true
        },
        {
            id: "464810880035717122",
            type: "USER",
            permission: true
        }
    ],

    options: [
        {
            name: 'user',
            description: 'user to set points',
            type: "USER",
            required: true
        },
        {
            name: 'points',
            description: 'number of points to set',
            type: "INTEGER",
            required: true
        }
    ],

    run: async ({client, interaction, args}) => {

        const user = args.getUser('user');
        const points = args.getInteger('points');

        const member = await interaction.guild.members.fetch(user.id);

        let db_user = await client.dbUsers.fetch(user.id);
        const guilde = member.roles.cache.has(client.config.ids.roles.versus) ? "Versus" : "Wersus";

        if (!db_user) db_user = new User()
            .setDiscordId(user.id)
            .setPoints(0);

        await db_user.setPoints(points)
            .setDiscordTag(user.tag)
            .setDiscordName(user.username)
            .setGuilde(guilde)
            .update();

        return interaction.reply({
            ephemeral: true,
            embeds: [
                Embeds.SUCCESS()
                    .setDescription(`Successfully updated ${user.tag} points`)
            ]
        });
    }
})