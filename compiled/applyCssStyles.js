"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File: applyCssStyles.js | Package: Monoux
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                   * Created: 30 Nov, 2017 | 10:58 AM
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

exports.yThumb = yThumb;
exports.yBar = yBar;
exports.xThumb = xThumb;
exports.xBar = xBar;

var _domCss = require("dom-css");

var _domCss2 = _interopRequireDefault(_domCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function yThumb(element, values) {
    (0, _domCss2.default)(element, {
        height: values.thumbHeight,
        transform: "translateY(" + values.posYThumb + "px)"
    });
};

function yBar(element, values) {
    (0, _domCss2.default)(element, _extends({}, !values.yShowable && { display: "none" }));
}

function xThumb(element, values) {
    (0, _domCss2.default)(element, {
        width: values.thumbWidth,
        transform: "translateX(" + values.posXThumb + "px)"
    });
};

function xBar(element, values) {
    (0, _domCss2.default)(element, _extends({}, !values.xShowable && { display: "none" }));
}