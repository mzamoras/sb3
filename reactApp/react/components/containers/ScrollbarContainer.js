/**
 * File: ScrollbarContainer.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 28 Nov, 2017 | 8:6 PM
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

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { scrollbarContainerStyle } from './localStyle';

class ScrollbarContainer extends React.Component{

    render(){
        const { root, container } = this.props.classes;
        return(
            <div className={root}>
                <div className={container}>
                    {this.props.children}
                </div>
            </div>
            
        );

    }
}
export default withStyles( scrollbarContainerStyle )(ScrollbarContainer);