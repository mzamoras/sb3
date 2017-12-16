"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getInnerSize;
/**
 * File: elementInnerSize.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 30 Nov, 2017 | 10:41 AM
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

var VER = "vertical";

function getInnerSize(axis, el) {

    var offsetSize = axis === VER ? el.offsetHeight : el.offsetWidth;

    var style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    var marginLeft = parseInt(style.marginLeft, 10) || 0;
    var marginRight = parseInt(style.marginRight, 10) || 0;
    var marginTop = parseInt(style.marginTop, 10) || 0;
    var marginBottom = parseInt(style.marginBottom, 10) || 0;
    var paddingLeft = parseInt(style.paddingLeft, 10) || 0;
    var paddingRight = parseInt(style.paddingRight, 10) || 0;
    var paddingTop = parseInt(style.paddingTop, 10) || 0;
    var paddingBottom = parseInt(style.paddingBottom, 10) || 0;
    var borderLeft = parseInt(style.borderLeftWidth, 10) || 0;
    var borderRight = parseInt(style.borderRightWidth, 10) || 0;
    var borderTop = parseInt(style.borderTopWidth, 10) || 0;
    var borderBottom = parseInt(style.borderBottomWidth, 10) || 0;
    var borders = axis === VER ? borderTop + borderBottom : borderLeft + borderRight;
    var margins = axis === VER ? marginTop + marginBottom : marginLeft + marginRight;
    var paddings = axis === VER ? paddingTop + paddingBottom : paddingLeft + paddingRight;

    return offsetSize - (borders + margins + paddings);
}