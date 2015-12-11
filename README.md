# Web prototype generator
A [Yeoman](http://yeoman.io) generator for a simple prototype web application. Sets up a very simple directory structure with gulp and a small web server. This is not meant for production apps, but for setting up a simple project for prototyping and proof of concept work.

## Background
I do a lot of web application prototyping and found it tedious to build the application from the ground up every time. However, I don't want a full application stack either since most of what I'm working with is either new or new-to-me technology. I built this generator in order to quickly stand up a small web application with a tiny server so that I can get started quickly without recreating the stack every time.
 
## Getting started

- Install dependencies: `npm install -g yo gulp bower`
- Install the generator: `npm install -g generator-web-prototype`
- Run `yo web-prototype` to build the project
- Follow the prompts to determine the few options you want to edit.
    - Name the project. Defaults to the folder name.
    - Determine the name of your document root or source. Defaults to "src".
    - Determine the name of the assets directory. This is where CSS, Javascript, and the like are stored. This folder will live under the document root. Defaults to "assets".
    - Determine the name of the bower_components directory. This is where bower will install it's components, and it lives under the "assets" directory. Defaults to "lib".
    - Determine the port number for the gulp server. Defaults to 80.
    - Determine which frameworks you wish to install. This list will grow over time.
    - If you are using Bootstrap, determine if you want to use the Bootstrap Theme. I sometimes use this to test ui features. Defaults to false.
- Once the generator has completed, run `gulp serve` or `gulp`. This will start your server.
- Go to any browser and type http://localhost:<port> where `<port>` is the value you provided above. If you used the default, `:<port>` is optional.

## Ok I'm setup, now what?
That's up to you. The web application you have is extremely simple and can become anything.

## What's next?
At this point, I've made the changes I need for now. I have plans to add the following, but it's a toss up of when that will be.

- Sass support
- ESLint support

## License
[MIT license](http://opensource.org/licenses/mit-license.html)
