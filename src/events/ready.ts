import {Logger} from "../utils";
import {Event} from "../structures";

export default new Event("ready", async (client) => {
    Logger.success(`${client.user.tag} online`);
});