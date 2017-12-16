/**
 * File: elementInnerSize.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 30 Nov, 2017 | 10:41 AM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const VER = "vertical";

export default function getInnerSize( axis, el ) {
    
    const offsetSize = axis === VER ? el.offsetHeight : el.offsetWidth;

    const style         = window.getComputedStyle ? getComputedStyle( el, null ) : el.currentStyle;
    const marginLeft    = parseInt( style.marginLeft, 10 ) || 0;
    const marginRight   = parseInt( style.marginRight, 10 ) || 0;
    const marginTop     = parseInt( style.marginTop, 10 ) || 0;
    const marginBottom  = parseInt( style.marginBottom, 10 ) || 0;
    const paddingLeft   = parseInt( style.paddingLeft, 10 ) || 0;
    const paddingRight  = parseInt( style.paddingRight, 10 ) || 0;
    const paddingTop    = parseInt( style.paddingTop, 10 ) || 0;
    const paddingBottom = parseInt( style.paddingBottom, 10 ) || 0;
    const borderLeft    = parseInt( style.borderLeftWidth, 10 ) || 0;
    const borderRight   = parseInt( style.borderRightWidth, 10 ) || 0;
    const borderTop     = parseInt( style.borderTopWidth, 10 ) || 0;
    const borderBottom  = parseInt( style.borderBottomWidth, 10 ) || 0;
    const borders       = axis === VER ? borderTop + borderBottom : borderLeft + borderRight;
    const margins       = axis === VER ? marginTop + marginBottom : marginLeft + marginRight;
    const paddings      = axis === VER ? paddingTop + paddingBottom : paddingLeft + paddingRight;

    return offsetSize - (borders + margins + paddings);
}