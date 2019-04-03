const cliYo = require('../../lib/cli-yo');
const fs = require('../../lib/fs-utils');
const ui = require('@tryghost/pretty-cli').ui;

// Internal ID in case we need one.
exports.id = 'travis';

// The command to run and any params
exports.flags = 'travis <supportPolicy>';

// Description for the top level command
exports.desc = 'Rewrite the local .travis.yml';

// Descriptions for the individual params
exports.paramsDesc = ['A renovate-style support policy (autodetected)'];

// What to do when this command is executed
exports.run = async (argv, cb) => {
    // @TODO make a generic tool that can read type and public into argv instead of this
    argv.public = await fs.isPublic();
    argv.type = fs.getType();

    if (argv.type === 'pkg') {
        ui.log.error('.travis.yml should exist at project root');
        return;
    }

    if (!argv.public) {
        ui.log.error('Cannot add .travis.yml file for private repository');
        return;
    }

    return cliYo.callGenerator('@tryghost/slimer:travisyml', argv, cb);
};
