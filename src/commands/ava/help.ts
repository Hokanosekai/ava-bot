import {Command} from "../../structures";
import {Embeds} from "../../utils";

export default new Command({
    name: 'help',
    description: 'Shows bot\'s command list',

    permissions: [],

    options: [],

    run: async ({client, interaction}) => {
        await interaction.reply({
            ephemeral: true,
            embeds: [
                Embeds.DEFAULT_TEMPLATE()
                    .setTitle('Help command\'s')
                    .setDescription(`\`<arg>\` optional argument\n\`[arg]\` required argument`)
                    .addFields([
                        {name: 'â¹ï¸ General', value: `\`/help\`: Shows bot's command`},
                        {name: 'ð Classement', value: `\`/rank [member]\`: Display member rank \n\`/ladder <guilde>\`: Display TOP 10 member`},
                        {name: 'ð¥ AvA', value: `\`/ava presence [points]\`: Add points to all connected member in voice channel \n\`/ava add [member] [points]\`: Add points to the member \n\`/ava remove [member] [points]\`: Remove points to the member`},
                        {name: 'ð¢ Announce', value: `\`/annonce [heure] [map] [zaap] [zone] [points]\`: Send new announce in AvA channel`},
                        {name: 'â»ï¸Reset', value: `\`/reset\`: ðï¸`},
                    ])
            ]
        })
    }
})