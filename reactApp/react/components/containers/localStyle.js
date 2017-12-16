/**
 * File: localStyle.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 28 Nov, 2017 | 8:12 PM
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

export const scrollbarContainerStyle = theme => {
    return {
        root:{
            width:"100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },

        container:{
            border:"1px solid purple",
            width: "60%",
            height: "60%"
        }
    }
};
