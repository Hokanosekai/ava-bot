import {Event} from "../structures";
import {client} from "../index";
import {Embeds, Logger} from "../utils";
import {CommandInteractionOptionResolver} from "discord.js";
import {ExtendedInteraction} from "../typings";

export default new Event('interactionCreate', async (interaction) => {
   if (interaction.isCommand()) {
       const command = client.commands.get(interaction.commandName);
       if (!command) return await interaction.reply({
           embeds: [
               Embeds.ERROR()
                   .setDescription(`Sorry this command doesn't exist`)
           ]
       });

       try {
           command.run({
               args: interaction.options as CommandInteractionOptionResolver,
               client,
               interaction: interaction as ExtendedInteraction
           })
       } catch (e) {
           Logger.error(e);
           interaction.channel.send({
               embeds: [
                   Embeds.ERROR()
                       .setDescription(`An error occurred, retry or inform us of the error`)
               ]
           });
       }
   }
});