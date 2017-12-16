/**
 * File: calculateData.js | Package: Monoux
 * 
 * Author : Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 30 Nov, 2017 | 10: 49 AM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import calculateBarWidth from './calculateBarWidth';
import getElementInnerSize from './calculateElementInnerSize';
import calculateThumbSize from './calculateThumbSize';

const VER = "vertical";
const HOR = "horizontal";

export default function getCalculations( view, thumbX, thumbY, props ){
    
    const tmpData = {};

    tmpData.barWidth     = window.sb2GlobalData.scrollbarWidth;
    tmpData.scrollLeft   = view.scrollLeft;
    tmpData.scrollTop    = view.scrollTop;
    tmpData.scrollWidth  = view.scrollWidth;
    tmpData.scrollHeight = view.scrollHeight;
    tmpData.clientWidth  = view.clientWidth;
    tmpData.clientHeight = view.clientHeight;
    tmpData.trackHeight  = getElementInnerSize( VER, thumbY );
    tmpData.trackWidth   = getElementInnerSize( HOR, thumbX );

    /** Basic Calculations **/
    tmpData.maxScrollTop  = tmpData.scrollHeight - tmpData.clientHeight;
    tmpData.maxScrollLeft = tmpData.scrollWidth - tmpData.clientWidth;
    tmpData.thumbWidth    = Number( calculateThumbSize( HOR, tmpData, props ).toFixed( 0 ) );
    tmpData.thumbHeight   = Number( calculateThumbSize( VER, tmpData, props ).toFixed( 0 ) );

    tmpData.posXThumb = tmpData.scrollLeft / ( tmpData.scrollWidth - tmpData.clientWidth ) * ( tmpData.trackWidth - tmpData.thumbWidth );
    tmpData.posYThumb = tmpData.scrollTop / ( tmpData.scrollHeight - tmpData.clientHeight ) * ( tmpData.trackHeight - tmpData.thumbHeight );

    tmpData.atTop    = !(tmpData.scrollTop > 0);
    tmpData.atBottom = !(tmpData.scrollTop < tmpData.maxScrollTop);

    tmpData.yRequired = tmpData.scrollHeight > tmpData.clientHeight;
    tmpData.xRequired = tmpData.scrollWidth > tmpData.clientWidth;
    tmpData.noneRequired = !tmpData.yRequired && !tmpData.xRequired;

    tmpData.xShowable = tmpData.xRequired  && props.showX; 
    tmpData.yShowable = tmpData.yRequired && props.showY; 

    tmpData.flashTime = props.flashTime;

    return tmpData;
}

export function scrollLeftForOffset( values, offset ){
    return offset / (values.trackWidth - values.thumbWidth) * (values.scrollWidth - values.clientWidth);
}

export function scrollTopForOffset( values, offset ){
    return offset / (values.trackHeight - values.thumbHeight) * (values.scrollHeight - values.clientHeight);
}

export function eventDataForMouseDownTrack( event, dir ){
    event.preventDefault();
    const { target, clientX, clientY } = event; 
    const res = target.getBoundingClientRect();
    return {
        target,
        ...( dir === 'x' && { clientX }),
        ...( dir === 'y' && { clientY }),
        ...( dir === 'x' && { targetLeft: res.left }),
        ...( dir === 'y' && { targetTop: res.top }),
    }
}

export function eventDataForMouseDownThumb( event, dir ){
    event.preventDefault();
    const { target, clientX, clientY } = event; 
    const res = target.getBoundingClientRect();
    return {
        target,
        ...( dir === 'x' && { clientX }),
        ...( dir === 'y' && { clientY }),
        ...( dir === 'x' && { targetLeft: res.left }),
        ...( dir === 'y' && { targetTop: res.top }),
        offsetHeight: target.offsetHeight,
        offsetWidth: target.offsetWidth,
    }
}