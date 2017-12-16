"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * File: localStyles.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 28 Nov, 2017 | 9:19 PM
 * 
 * This file is part of a package and all the information, intellectual
 * and technical concepts contained here are property of their owners.
 * Any kind of use, reproduction, distribution, publication, etc. without
 * express written permission from CapitalMental && BackLogics Technologies
 * is strictly forbidden.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var scrollbarsStyle = exports.scrollbarsStyle = function scrollbarsStyle(theme) {
    var transitions = theme.transitions;


    return {
        root: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: 'hidden',
            backgroundColor: '#E5E5E5'
        },
        viewContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'scroll'
        },
        xBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "rgba(0,0,0,0.2)",
            transition: transitions.create(['opacity', 'background'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.leavingScreen
            }),
            "&.autoShowing": {
                opacity: 1
            },
            "&.autoHiding": {
                opacity: 0
            }
        },
        yBar: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 10,
            backgroundColor: "rgba(0,0,0,0.2)",
            transition: transitions.create(['opacity', 'background'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.leavingScreen
            }),
            "&.autoShowing": {
                opacity: 1
            },
            "&.autoHiding": {
                opacity: 0
            }
        },
        xThumb: {
            borderRadius: 8,
            height: "100%",
            minWidth: 30,
            backgroundColor: "rgba(0,0,0,0.3)"
        },
        yThumb: {
            borderRadius: 8,
            width: "100%",
            minHeight: 30,
            backgroundColor: "rgba(0,0,0,0.3)"
        }
    };
};