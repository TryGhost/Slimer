'use strict';
const Generator = require('../../lib/Generator');

module.exports = class extends Generator {
    writing() {
        this.fs.copyTpl(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'),
            {date: `2013-${new Date().getFullYear()}`}
        );
    }
};
