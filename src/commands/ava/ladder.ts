import {Command} from "../../structures";
import {Embeds, Logger} from "../../utils";
import {client} from "../../index";
import {EmbedFieldData} from "discord.js";
import '../../extensions/string.extension'

export default new Command({
    name: 'ladder',
    description: 'View top 10',
    defaultPermission: true,

    permissions: [],

    options: [
        {
            type: "STRING",
            name: 'guilde',
            description: 'top 10 of guilde',
            required: false,
            choices: [
                {
                    name: 'Versus',
                    value: 'versus'
                },
                {
                    name: 'Wersus',
                    value: 'wersus'
                }
            ]
        }
    ],

    run: async ({client, interaction, args}) => {

        const guilde = args.getString('guilde');

        const top10 = args.data.length === 0?
            await client.database.users.find({
                order: {
                    points: 'DESC'
                },
                take: 10,
            }) :
            await client.database.users.find({
                order: {
                    points: 'DESC'
                },
                take: 10,
                where: [
                    {guilde}
                ]
            });

        let description: string[] = ["\n**Top Players**"]

        top10.map((member, index) => {
            description.push(`**${index + 1}.** ${member.discordName} (${member.points} points)`);
        });

        await interaction.reply({
            embeds: [
                Embeds.DEFAULT_TEMPLATE()
                    .setTitle(`Leaderboard AvA ${args.data.length === 0? "" : `Guilde ${guilde.capitalize()}`}`)
                    .setDescription(`${description.length === 1? "Il n'y a aucun membres" : description.join('\n')}`)
            ]
        });
    }
});