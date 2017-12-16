'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File: calculateData.js | Package: Monoux
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * Author : Miguel Zamora Serrano <mzamoras@backlogics.com>
                                                                                                                                                                                                                                                                   * Created: 30 Nov, 2017 | 10: 49 AM
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

exports.default = getCalculations;
exports.scrollLeftForOffset = scrollLeftForOffset;
exports.scrollTopForOffset = scrollTopForOffset;
exports.eventDataForMouseDownTrack = eventDataForMouseDownTrack;
exports.eventDataForMouseDownThumb = eventDataForMouseDownThumb;

var _calculateBarWidth = require('./calculateBarWidth');

var _calculateBarWidth2 = _interopRequireDefault(_calculateBarWidth);

var _calculateElementInnerSize = require('./calculateElementInnerSize');

var _calculateElementInnerSize2 = _interopRequireDefault(_calculateElementInnerSize);

var _calculateThumbSize = require('./calculateThumbSize');

var _calculateThumbSize2 = _interopRequireDefault(_calculateThumbSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VER = "vertical";
var HOR = "horizontal";

function getCalculations(view, thumbX, thumbY, props) {

    var tmpData = {};

    tmpData.barWidth = window.sb2GlobalData.scrollbarWidth;
    tmpData.scrollLeft = view.scrollLeft;
    tmpData.scrollTop = view.scrollTop;
    tmpData.scrollWidth = view.scrollWidth;
    tmpData.scrollHeight = view.scrollHeight;
    tmpData.clientWidth = view.clientWidth;
    tmpData.clientHeight = view.clientHeight;
    tmpData.trackHeight = (0, _calculateElementInnerSize2.default)(VER, thumbY);
    tmpData.trackWidth = (0, _calculateElementInnerSize2.default)(HOR, thumbX);

    /** Basic Calculations **/
    tmpData.maxScrollTop = tmpData.scrollHeight - tmpData.clientHeight;
    tmpData.maxScrollLeft = tmpData.scrollWidth - tmpData.clientWidth;
    tmpData.thumbWidth = Number((0, _calculateThumbSize2.default)(HOR, tmpData, props).toFixed(0));
    tmpData.thumbHeight = Number((0, _calculateThumbSize2.default)(VER, tmpData, props).toFixed(0));

    tmpData.posXThumb = tmpData.scrollLeft / (tmpData.scrollWidth - tmpData.clientWidth) * (tmpData.trackWidth - tmpData.thumbWidth);
    tmpData.posYThumb = tmpData.scrollTop / (tmpData.scrollHeight - tmpData.clientHeight) * (tmpData.trackHeight - tmpData.thumbHeight);

    tmpData.atTop = !(tmpData.scrollTop > 0);
    tmpData.atBottom = !(tmpData.scrollTop < tmpData.maxScrollTop);

    tmpData.yRequired = tmpData.scrollHeight > tmpData.clientHeight;
    tmpData.xRequired = tmpData.scrollWidth > tmpData.clientWidth;
    tmpData.noneRequired = !tmpData.yRequired && !tmpData.xRequired;

    tmpData.xShowable = tmpData.xRequired && props.showX;
    tmpData.yShowable = tmpData.yRequired && props.showY;

    tmpData.flashTime = props.flashTime;

    return tmpData;
}

function scrollLeftForOffset(values, offset) {
    return offset / (values.trackWidth - values.thumbWidth) * (values.scrollWidth - values.clientWidth);
}

function scrollTopForOffset(values, offset) {
    return offset / (values.trackHeight - values.thumbHeight) * (values.scrollHeight - values.clientHeight);
}

function eventDataForMouseDownTrack(event, dir) {
    event.preventDefault();
    var target = event.target,
        clientX = event.clientX,
        clientY = event.clientY;

    var res = target.getBoundingClientRect();
    return _extends({
        target: target
    }, dir === 'x' && { clientX: clientX }, dir === 'y' && { clientY: clientY }, dir === 'x' && { targetLeft: res.left }, dir === 'y' && { targetTop: res.top });
}

function eventDataForMouseDownThumb(event, dir) {
    event.preventDefault();
    var target = event.target,
        clientX = event.clientX,
        clientY = event.clientY;

    var res = target.getBoundingClientRect();
    return _extends({
        target: target
    }, dir === 'x' && { clientX: clientX }, dir === 'y' && { clientY: clientY }, dir === 'x' && { targetLeft: res.left }, dir === 'y' && { targetTop: res.top }, {
        offsetHeight: target.offsetHeight,
        offsetWidth: target.offsetWidth
    });
}