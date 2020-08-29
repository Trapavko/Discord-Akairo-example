const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const path = require('path');

require('dotenv').config();

class Client extends AkairoClient {
    constructor() {
        super({
            // Options for Akairo go here.
            ownerID: process.env.OWNER_ID
        }, {
            // Options for discord.js goes here.
        });

        this.commandHandler = new CommandHandler(this, {
            directory: path.resolve(process.cwd(), 'src', './commands/'),
            prefix: process.env.COMMAND_PREFIX
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(process.cwd(), 'src', './inhibitors/')
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(process.cwd(), 'src', './listeners/')
        });
    }

    start() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        this.listenerHandler.loadAll();
        
        this.commandHandler.loadAll();

        this.login(process.env.TOKEN);
    }
}

module.exports = { Client };