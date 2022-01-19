import {Command} from "../../structures";

export default new Command({
    name: 'ping',
    description: 'Ping bot',
    defaultPermission: true,

    options: [],

    permissions: [],

    run: async ({client, interaction}) => {
        await interaction.reply({
            content: `Bot ping is ${client.ws.ping}ms`
        })
    }
})