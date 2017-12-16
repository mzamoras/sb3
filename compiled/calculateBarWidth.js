'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = calculateScrollbarWidth;
/**
 * File: calculateBarWidth.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 29 Nov, 2017 | 11:38 AM
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

window.sb2GlobalData = window.sb2GlobalData || {};
window.sb2GlobalData.scrollbarWidth = window.sb2GlobalData.scrollbarWidth || calculateScrollbarWidth(true) || null;

function calculateScrollbarWidth() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


    if (window.sb2GlobalData.scrollbarWidth !== null && !force) {
        return window.sb2GlobalData.scrollbarWidth;
    }

    var div1 = void 0,
        div2 = void 0;

    div1 = document.createElement('div');
    div2 = document.createElement('div');

    div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
    div1.style.overflow = 'scroll';
    div2.style.overflow = 'hidden';

    document.body.appendChild(div1);
    document.body.appendChild(div2);

    window.sb2GlobalData.scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);

    document.body.removeChild(div1);
    document.body.removeChild(div2);

    return window.sb2GlobalData.scrollbarWidth;
}