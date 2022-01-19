import {Command} from "../../structures";
import {User} from "../../database/entities";
import {Embeds, Logger} from "../../utils";

export default new Command({
    name: 'rank',
    description: 'View member rank',

    options: [
        {
            name: 'user',
            description: 'User to see rank',
            type: "USER",
            required: true,
        }
    ],

    permissions: [],

    run: async ({client, interaction, args}) => {

        const user = args.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        let db_user = await client.dbUsers.fetch(user.id);
        const guilde = member.roles.cache.has(client.config.ids.roles.versus) ? "Versus" : "Wersus";

        if (!db_user) db_user = new User()
            .setDiscordId(user.id)
            .setPoints(0);

        await db_user.setDiscordTag(user.tag)
            .setDiscordName(member.displayName)
            .setGuilde(guilde)
            .update();

        const top = await client.database.users.find({
            order: {points: 'DESC'}
        });

        const rank = top.findIndex(u => u.discordId === user.id) + 1;

        await interaction.reply({
            embeds: [
                Embeds.DEFAULT_TEMPLATE()
                    .setTitle(`Rank de ${db_user.discordTag}`)
                    .setDescription(`**${rank}/${top.length}**  ${db_user.points} points`)
            ]
        });
    }
});