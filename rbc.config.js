/**
 * File: rbc.config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const path = require( 'path' );

module.exports = function( isProductionEnvironment, isHotModuleReloadEnabled ){
    
    const config = {};

    /**
     * This is the folder where the app data is stored
     */
    const mainFolder = path.resolve("./reactApp");
    
    
    /**
     * P A T H S
     * this section configures the paths across the app,
     * servers and utilities
     */
    config.paths = {

        src : mainFolder,
        dest: path.resolve(mainFolder, 'public'),
        node: path.resolve("./node_modules"),

        src_react: path.join( mainFolder, 'react' ),
        src_js   : path.join( mainFolder, 'assets/js' ),
        src_css  : path.join( mainFolder, 'assets/css' ),
        src_less : path.join( mainFolder, 'assets/less' ),
        src_media: path.join( mainFolder, 'assets/media' ),
        src_fonts: path.join( mainFolder, 'assets/fonts' ),

    };

    config.base = {
        projectName      : "ScrollBars3",
        notificationsIcon: null,
        localURL         : "http://localhost:5500",
        //proxyURL        : "http://localhost:5500",
        allowCrossOrigin: isProductionEnvironment,
        useStaticHTML   : true,
        autoOpenChrome  : true,

        //sslCert         : {
        //    key : path.join( require('os').homedir(), '.localhost-ssl/localNetworkDev.key' ),
        //    cert: path.join( require('os').homedir(), '.localhost-ssl/localNetworkDev.crt' ),
        //}
    };
    
    config.wp ={
        
        entry:{

            /**
             * This base file is a compilation of global variables
             * and utilities needed across the app, and will be available
             * and required before the actual app, also includes the 
             * pollyfills needed
             */
            base: [
                'babel-polyfill',
                path.join(config.paths.src_js,"base.js")
            ],
            /**
             * The actual app's main file, this is the file that
             * attaches the App component to the dom
             */
            app:[
                path.join(config.paths.src_js,"app.js")
            ]
        },

        output:{
            filename     : "js/[name].js",
            chunkFilename: "js/zyx[chunkhash].js",
        },

        resolve:{
            extensions: [ ".js", ".jsx", ".json" ]
        },

        vendorsInSameChunk: [
            /moment/,
            /scrollbars/,
            /react-color/,
        ],
        eslintUsage:{
            useEslintrc: false,
        }

    };

    return config;
}