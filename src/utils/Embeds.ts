import {MessageEmbed} from "discord.js";
import {Colors} from "./Colors";
import {Images} from "./Images";

export class Embeds {
    static DEFAULT_TEMPLATE = (): MessageEmbed => {
        return new MessageEmbed()
            .setColor(Colors.EMBED_COLOR)
            .setAuthor({name: ``, iconURL: ``, url: ``});
    }
    static ERROR = (): MessageEmbed => {
        return new MessageEmbed()
            .setColor('#9D2933')
            .setThumbnail(Images.ERROR)
            .setTitle('Error')
    }

    static SUCCESS = (): MessageEmbed => {
        return new MessageEmbed()
            .setColor('#0c9000')
            .setThumbnail(Images.SUCCESS)
            .setTitle('Success')
    }
}