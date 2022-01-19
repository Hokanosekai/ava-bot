import {Command} from "../../structures";
import {Embeds, Logger} from "../../utils";
import {VoiceChannel} from "discord.js";
import {client} from "../../index";
import {User} from "../../database/entities";

export default new Command({
    name: 'ava',
    description: 'ava commande',
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
            name: 'presence',
            description: 'Add points to all people in voice channel',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'points',
                    description: 'Points to add',
                    type: 'INTEGER',
                    required: true
                }
            ]
        },
        {
            name: 'add',
            description: 'Add points to user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'user',
                    description: 'User to add points',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'points',
                    description: 'Points to add',
                    type: 'INTEGER',
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'remove points to user',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'user',
                    description: 'User to remove points',
                    type: 'USER',
                    required: true
                },
                {
                    name: 'points',
                    description: 'Points to remove',
                    type: 'INTEGER',
                    required: true
                }
            ]
        },
    ],

    run: async ({client, interaction, args}) => {

        if (args.getSubcommand() === 'presence') {

            const member = interaction.member;
            const points = args.getInteger('points') || 1;

            if (!member.voice.channelId)
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        Embeds.ERROR()
                            .setDescription(`Sorry you can't use this command if you're not connected to a voice channel`)
                    ]
                })

            const voiceChannel = interaction.guild.channels.cache.get(member.voice.channelId) as VoiceChannel;

            voiceChannel.members.map(async connectedMember => {
                let dbUser = await client.dbUsers.fetch(connectedMember.id);
                const guilde = connectedMember.roles.cache.has(client.config.ids.roles.versus) ? "Versus" : "Wersus";

                if (!dbUser) dbUser = new User()
                    .setDiscordId(connectedMember.id)
                    .setPoints(0);

                await dbUser.addPoints(points)
                    .setDiscordTag(connectedMember.user.tag)
                    .setDiscordName(connectedMember.displayName)
                    .setGuilde(guilde)
                    .update();

                /*connectedMember.createDM(true).then(channel => {
                    channel.send({
                        embeds: [
                            Embeds.SUCCESS()
                                .setDescription(`Hello, une AvA à été comptabilisée, tu as gagné **${points} point(s)**`)
                        ]
                    });
                });*/
            });

            await interaction.reply({
                ephemeral: true,
                embeds: [
                    Embeds.SUCCESS()
                        .setDescription(`Successfully updated members points`)
                ]
            });
        } else if (args.getSubcommand() === 'add') {

            const user = await args.getUser('user');
            const points = args.getInteger('points');

            const member = await interaction.guild.members.fetch(user.id);

            let db_user = await client.dbUsers.fetch(user.id);
            const guilde = member.roles.cache.has(client.config.ids.roles.versus) ? "Versus" : "Wersus";

            if (!db_user) db_user = new User()
                .setDiscordId(user.id)
                .setPoints(0);

            await db_user.addPoints(points)
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

        } else if (args.getSubcommand() === 'remove') {

            const user = await args.getUser('user');
            const points = args.getInteger('points');

            const member = await interaction.guild.members.fetch(user.id);

            let db_user = await client.dbUsers.fetch(user.id);
            const guilde = member.roles.cache.has(client.config.ids.roles.versus) ? "Versus" : "Wersus";

            if (!db_user) db_user = new User()
                .setDiscordId(user.id)
                .setPoints(0);

            await db_user.removePoints(points)
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
    }
})