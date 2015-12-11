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
                    default: this.appname,
                    store: true
                },
                {
                    type: 'input',
                    name: 'sourceDir',
                    message: 'Where do you want your site files to be installed?',
                    default: 'src',
                    store: true
                },
                {
                    type: 'input',
                    name: 'assetsDir',
                    message: 'Where do you want your assets (css, js, etc.) to be installed within site files?',
                    default: 'assets',
                    store: true
                },
                {
                    type: 'input',
                    name: 'vendorDir',
                    message: 'Where do you want bower to install your vendor libraries within assets?',
                    default: 'lib',
                    store: true
                },
                {
                    type: 'input',
                    name: 'serverPort',
                    message: 'What port would you like to use for the gulp serve?',
                    default: '80',
                    store: true
                },
                {
                    type: 'checkbox',
                    message: 'Which frameworks do you want to use?',
                    name: 'frameworks',
                    choices: [
                        { name: 'Angular' },
                        { name: 'Bootstrap' },
                        { name: 'jQuery' }
                    ],
                    store: true
                },
                {
                    type: 'confirm',
                    name: 'useBootstrapTheme',
                    message: 'If using Bootstrap, do you want to use the Bootstrap theme?',
                    default: false,
                    store: true
                }
            ], function (answers) {
                this.answers = answers;
                done();
            }.bind(this));
        },

        configuring: function () {
            this.config.save();
        },

        writing: {
            writeBowerRc: function () {
                this.fs.copyTpl(
                    this.templatePath('.bowerrc.ejs'),
                    this.destinationPath('.bowerrc'),
                    { directory: this.answers.sourceDir + '/' + this.answers.assetsDir + '/' + this.answers.vendorDir }
                );
            },

            writePackageJson: function () {
                this.fs.copyTpl(
                    this.templatePath('package.json.ejs'),
                    this.destinationPath('package.json'),
                    { project: this.answers.project.split(' ').join('-') }
                );
            },

            writeBowerJson: function () {
                this.fs.copyTpl(
                    this.templatePath('bower.json.ejs'),
                    this.destinationPath('bower.json'),
                    { project: this.answers.project.split(' ').join('-') }
                );
            },

            writeGulpFile: function () {
                this.fs.copyTpl(
                    this.templatePath('gulpfile.js.ejs'),
                    this.destinationPath('gulpfile.js'),
                    {
                        sourceDir: this.answers.sourceDir,
                        serverPort: Number(this.answers.serverPort)
                    }
                );
            },

            writeIndexHtml: function () {
                this.fs.copyTpl(
                    this.templatePath('index.html.ejs'),
                    this.destinationPath('src/index.html'),
                    {
                        frameworks: {
                            bootstrap: this.answers.frameworks.indexOf('Bootstrap') !== -1,
                            bootstrapTheme: this.answers.frameworks.indexOf('Bootstrap') !== -1 && this.answers.useBootstrapTheme,
                            jquery: this.answers.frameworks.indexOf('jQuery') !== -1,
                            angular: this.answers.frameworks.indexOf('Angular') !== -1
                        },
                        vendorDir: this.answers.assetsDir + '/' + this.answers.vendorDir
                    }
                );
            }
        },

        install: {
            installNpmDeps: function () {
                this.npmInstall(['gulp', 'gulp-serve'], { saveDev: true });
            },

            installBowerDeps: function () {
                var bowerDeps = [];

                if (this.answers.frameworks.indexOf('jQuery') > -1) {
                    bowerDeps.push('jquery');
                }

                if (this.answers.frameworks.indexOf('Bootstrap') > -1) {
                    bowerDeps.push('bootstrap');
                }

                if (this.answers.frameworks.indexOf('Angular') > -1) {
                    bowerDeps.push('angular');
                }

                this.bowerInstall(bowerDeps, { save: true });
            }
        }
    });

}());
