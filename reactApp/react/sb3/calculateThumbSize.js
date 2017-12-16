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

const VER = "vertical";

export default function thumbSize( axis, dataSource, props ) {
    
    const windowSize   = axis === VER ? dataSource.clientHeight : dataSource.clientWidth;
    const contentSize  = axis === VER ? dataSource.scrollHeight : dataSource.scrollWidth;
    const trackSize    = axis === VER ? dataSource.trackHeight : dataSource.trackWidth;
    const contentRatio = windowSize / contentSize;

    const size      = trackSize * contentRatio;
    const minSize   = props.thumbMinSize;
    const finalSize = minSize > size ? minSize : size;

    return finalSize - (dataSource.barWidth / 2) + 2;
}