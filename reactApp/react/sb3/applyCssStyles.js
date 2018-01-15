/**
 * File: applyCssStyles.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 30 Nov, 2017 | 10:58 AM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import css from 'dom-css';

export function yThumb( element, values ){
    css( element, { 
        height: values.thumbHeight,
        transform: `translateY(${values.posYThumb}px)`
    } );
};

export function yBar( element, values ){
    css( element, { 
        ...( !values.yShowable && { display:"none" }),
        ...( values.yShowable && { display:"block" })
    } );
}

export function xThumb( element, values ){
    css( element, { 
        width: values.thumbWidth,
        transform: `translateX(${values.posXThumb}px)`
    } );
};

export function xBar( element, values ){
    css( element, { 
        ...( !values.xShowable && { display:"none" }),
        ...( values.xShowable && { display:"block" }),
    } );
}

