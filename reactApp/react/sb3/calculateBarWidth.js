/**
 * File: calculateBarWidth.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 29 Nov, 2017 | 11:38 AM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

window.sb2GlobalData                = window.sb2GlobalData || {};
window.sb2GlobalData.scrollbarWidth = window.sb2GlobalData.scrollbarWidth || calculateScrollbarWidth(true) || null;

export default function calculateScrollbarWidth( force = false ) {
    
        if ( window.sb2GlobalData.scrollbarWidth !== null && !force ) {
            return window.sb2GlobalData.scrollbarWidth;
        }
    
        let div1, div2;
    
        div1 = document.createElement( 'div' );
        div2 = document.createElement( 'div' );
    
        div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
        div1.style.overflow = 'scroll';
        div2.style.overflow = 'hidden';
    
        document.body.appendChild( div1 );
        document.body.appendChild( div2 );
    
        window.sb2GlobalData.scrollbarWidth = Math.abs( div1.scrollHeight - div2.scrollHeight );
    
        document.body.removeChild( div1 );
        document.body.removeChild( div2 );
    
        return window.sb2GlobalData.scrollbarWidth;
    
}