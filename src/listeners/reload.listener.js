const { Listener } = require('discord-akairo');

class ReloadListener extends Listener {
    constructor() {
        super('reload', {
            emitter: 'commandHandler',
            event: 'load'
        });
    }

    exec(command, isReload) {
        if(isReload) {
            console.log(`Reloaded command "${command.id}"`);
        }
    }
}

module.exports = ReloadListener;