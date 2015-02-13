module.exports = function() {
    var root = './';
    var temp = './.tmp/';
    var config = {
        /**
         * Files paths
         */
        alljs: [
            './client/*.js',
            './server/*.js',
            './*.js'
        ],
        client: './client/',
        index: client + 'index.html',

        server: './server/',
        temp: temp,
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages : [
            './package.json',
            './bower.json'
        ],

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './server/app.js'

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;

 
};
