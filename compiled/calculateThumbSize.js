"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = thumbSize;
/**
 * File: calculateThumbSize.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 30 Nov, 2017 | 10:43 AM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var VER = "vertical";

function thumbSize(axis, dataSource, props) {

  var windowSize = axis === VER ? dataSource.clientHeight : dataSource.clientWidth;
  var contentSize = axis === VER ? dataSource.scrollHeight : dataSource.scrollWidth;
  var trackSize = axis === VER ? dataSource.trackHeight : dataSource.trackWidth;
  var contentRatio = windowSize / contentSize;

  var size = trackSize * contentRatio;
  var minSize = props.thumbMinSize;
  var finalSize = minSize > size ? minSize : size;

  return finalSize - dataSource.barWidth / 2 + 2;
}