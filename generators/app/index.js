(function () {
    'use strict';

    var generators = require('yeoman-generator');

    var WebPrototypeBase = generators.Base.extend({

    });

    module.exports = WebPrototypeBase.extend({
        prompting: function () {
            var done = this.async();
            this.prompt([
                {
                    type: 'input',
                    name: 'project',
                    message: 'Your prototype project name',
                    default: this.appname
                },
                {
                    type: "checkbox",
                    message: 'Which frameworks do you want to use?',
                    name: 'frameworks',
                    choices: [
                        { name: 'Angular' },
                        { name: 'Bootstrap' }
                    ]
                }
            ], function (answers) {
                this.answers = answers;
                done();
            }.bind(this));
        },

        configuring: function () {
            this.config.save();
        }
    });

}());
