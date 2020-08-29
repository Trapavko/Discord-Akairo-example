const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('reload', {
           aliases: ['reload'],
           ownerOnly: true,
           args: [
                {
                    id: 'command',
                    type: 'string',
                    default: ''
                },
            ]
        });
    }

    exec(message, { command }) {
        if(!command) {
            return message.reply("Please supply the id of the command");
        }
        
        const commandHandler = this.client.commandHandler;
        const hasModule = commandHandler.modules.has(command);
        if(!hasModule) {
            return message.reply("This command does not exist or is not loaded.");
        }

        commandHandler.reload(command);
        return message.reply(`Reloaded \`${command}\`!`);
    }
}

module.exports = PingCommand;