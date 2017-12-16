/**
 * File: App.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultTheme from './themes/default';
import '../assets/less/app.less';

//Replace with your component
//import RbcWelcome from './components/rbc/RbcWelcome';
import ScrollbarContainer from './components/containers/ScrollbarContainer';
import Scrollbar from './sb3/Scrollbar';

let obs = 90;
let objects = [];

for (let index = 0; index < obs; index++) {
    objects.push("Element " + ( index + 1 ));
}


class App extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
            themeStyle: "light"
        }
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    handleThemeChange(){
        this.setState({ 
            themeStyle: this.state.themeStyle === 'light' ? 'dark' : 'light' 
        });
    }

    atTop(){
        console.log("AT TOP");
    }

    atBottom(){
        console.log("AT BOTTOM");
    }

    render(){    
        
        return(
            <MuiThemeProvider theme={ defaultTheme( this.state.themeStyle ) }>
                <ScrollbarContainer>
                    <Scrollbar autoHide={true} onTopReached={this.atTop} onBottomReached={this.atBottom}>
                        {objects.map( (o,i)=>{
                            return(
                                <div key={o}>
                                    {o}
                                </div>
                            );
                        } ) }
                    </Scrollbar>
                </ScrollbarContainer>
            </MuiThemeProvider>    
        );
    }
}

export default App;