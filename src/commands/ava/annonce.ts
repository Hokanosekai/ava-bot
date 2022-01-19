import {Command} from "../../structures";
import {client} from "../../index";
import {TextChannel} from "discord.js";
import '../../extensions/string.extension'
import {Emojis} from "../../utils/Emojis";
import {Embeds, Logger} from "../../utils";

export default new Command({
    name: 'annonce',
    description: 'Faire une annonce',
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
            name: "heure",
            description: "Heure de l'AvA (ex: 21h15)",
            type: "STRING",
            required: true
        },
        {
            name: "map",
            description: "Map de l'AvA (ex: [42;43])",
            type: "STRING",
            required: true
        },
        {
            name: "zaap",
            description: "Zaap pour se rendre a l'AvA",
            type: "STRING",
            required: true
        },
        {
            name: "zone",
            description: "Zone de l'AvA",
            type: "STRING",
            required: true
        },
        {
            name: "points",
            description: "Nombre de points gagnable",
            type: "INTEGER",
            required: true
        },
    ],

    run: async ({client, interaction, args}) => {

        const heure = args.getString('heure');
        const map = args.getString('map');
        const zaap = args.getString('zaap');
        const zone = args.getString('zone');
        const points = args.getInteger('points');

        const avaChannel = await interaction.guild.channels.fetch(client.config.ids.channels.ava) as TextChannel;

        try {
            const message = await avaChannel.send({
                embeds: [
                    Embeds.DEFAULT_TEMPLATE()
                        .setTitle(`${Emojis.ANNOUNCE} Nouvelle AvA ${Emojis.ANNOUNCE}`)
                        .setDescription(`Une nouvelle AvA arrive préparez vous à combattre !!`)
                        .addFields([
                            {name: `${Emojis.HOUR} Heure de l'AvA`, value: `${heure}`},
                            {name: `${Emojis.MAP} Map de rassemblement`, value: `${map}`},
                            {name: `${Emojis.ZAAP} Zaap`, value: `${zaap}`},
                            {name: `${Emojis.ZONE} Zone de l'AvA`, value: `${zone}`},
                            {name: `${Emojis.POINTS} Points à gagner`, value: `${points} points`},
                        ])
                ]
            });

            await message.react(`${Emojis.YES}`);
            await message.react(`${Emojis.NO}`);
        } catch (e) {
            Logger.error(e);
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    Embeds.ERROR()
                        .setDescription(`Une erreur s'est produite\n\n\`\`\`C#\n${e}\`\`\``)
                ]
            })
        }

        await interaction.reply({
            ephemeral: true,
            embeds: [
                Embeds.SUCCESS()
                    .setDescription(`Successfully send new AvA to <#${client.config.ids.channels.ava}>`)
            ]
        })
    }
});