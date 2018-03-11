/**
 * File: rbc.karma.test.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

/* global describe, it, expect, mount, shallow, sinon */

import React from 'react';
import App from '../../App';
//import Sb3 from '../../../../compiled/Scrollbar';
import {Scrollbars as Sb3} from '../../../../compiled';
import {DomNodeManager} from '../configuration/utilities/tddUtils';

let obs     = 110;
let objects = [];

for (let index = 0; index < obs; index++) {
    objects.push("Element " + ( index + 1 ));
}

function elementCreator( object, index ){
    return (
        <div key={object}>
            {object} with index: {index}
        </div>
    );
};

function autoDestroy( destroyable, wrapper, destroy ){
    if( destroyable ){
        wrapper.unmount();
        destroy(true);
    }
}

const wrapMount = ( nodeObject, props = {}, empty = false, wrapperProps = false ) =>{

    if( wrapperProps ){
        return mount( 
            <Sb3 {...props}>
                {   empty ? "empty content" : 
                    <div {...wrapperProps}>
                        { objects.map( elementCreator ) }
                    </div> 
                }
            </Sb3>, {
                attachTo: nodeObject
            } )
    }
    return mount( 
    <Sb3 {...props}>
        { empty ? "empty content" : objects.map( elementCreator ) }
    </Sb3>, {
        attachTo: nodeObject
    } )
};

const nodeManager = new DomNodeManager();

function testSetup( nodeStyle = {} ){
    const nodeData = nodeManager.makeNode({
        height: 200,
        ...nodeStyle
    });
    return{
        node   : nodeData.node,
        spy    : sinon.spy(),
        destroy: nodeData.destroy
    };
}

describe( "<Scrollbar/> All elements required for testing", () =>{

    const destroyable = true;

    it("Should have wrapper defined", () =>{
        const { node, destroy } = testSetup();
        const wrapper           = wrapMount( node, {}, true );

        expect( wrapper ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it("Should have innerRef present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );

    } );

    it("Should have view element present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef.view ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it("Should have xBar element present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef.xBar ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it("Should have xThumb element present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef.xThumb ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it("Should have yBar element present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef.yBar ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it("Should have yThumb element present", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef.yThumb ).toBeDefined();
        autoDestroy( destroyable, wrapper, destroy );
    } );

} );

describe( "<Scrollbar/> No Necessary Tracks", done =>{

    const destroyable = true;

    it( "Should have xBar display = none", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        const barStyle = window.getComputedStyle( rRef.xBar );
        expect( barStyle.display ).toEqual("none");
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "Should have yBar display = none", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        const barStyle = window.getComputedStyle( rRef.yBar );
        expect( barStyle.display ).toEqual("none");
        if( destroyable ){
            wrapper.unmount();
            destroy(true);
        }
    } );

    it( "Should not respond to scroll movement", done =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const spyX    = sinon.spy();
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            onScroll: spyX,
            onScrollFrame: spyX,
            onScrollStart: spyX,
            onScrollEnd: spyX
        }, true );

        rRef.view.scrollTop = 90;
        
        const to = setTimeout( ()=>{
            expect( spyX.called).toEqual( false );
            
            if( destroyable ){
                wrapper.unmount();
                destroy(true);
                done();
            }
            clearTimeout(to);
            done();
        }, 100 );

    } );
} );

describe( "<Scrollbar/> Check references existence", () =>{

    const destroyable = true;

    it( "Root element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let rootEl = null;
        const wrapper = wrapMount( node, { 
            refRoot: el =>{ rootEl = el }
        }, false );

        expect( rootEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "View element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let viewEl = null;
        const wrapper = wrapMount( node, { 
            refView: el =>{ viewEl = el }
        }, false );

        expect( viewEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "XBar element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let barEl = null;
        const wrapper = wrapMount( node, { 
            refXBar: el =>{ barEl = el }
        }, false );

        expect( barEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "YBar element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let barEl = null;
        const wrapper = wrapMount( node, { 
            refYBar: el =>{ barEl = el }
        }, false );

        expect( barEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "XThumb element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let thumbEl = null;
        const wrapper = wrapMount( node, { 
            refXThumb: el =>{ thumbEl = el }
        }, false );

        expect( thumbEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "YThumb element should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let thumbEl = null;
        const wrapper = wrapMount( node, { 
            refYThumb: el =>{ thumbEl = el }
        }, false );

        expect( thumbEl.tagName ).toEqual( 'DIV' );
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "All elements should be returned", () =>{
        const { node, destroy } = testSetup();
        
        let allElements = null;
        let root = null;
        const wrapper = wrapMount( node, { 
            refAll: el =>{ allElements = el }
        }, false );

        expect( allElements.root.tagName ).toEqual( 'DIV' );
        expect( allElements.view.tagName ).toEqual( 'DIV' );
        expect( allElements.xBar.tagName ).toEqual( 'DIV' );
        expect( allElements.yBar.tagName ).toEqual( 'DIV' );
        expect( allElements.xThumb.tagName ).toEqual( 'DIV' );
        expect( allElements.yThumb.tagName ).toEqual( 'DIV' );
        
        autoDestroy( destroyable, wrapper, destroy );
    } );

} )

describe( "<Scrollbar/> Vertical Bar Required", ()=>{

    const destroyable = true;
    
    it( "Should have xBar display = none and yBar display = block", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, false );

        const xBarStyle = window.getComputedStyle( rRef.xBar );
        const yBarStyle = window.getComputedStyle( rRef.yBar );

        expect( xBarStyle.display ).toEqual("none");
        expect( yBarStyle.display ).toEqual("block");

        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "Should Call onScroll functions [ Scroll, scrollFrame, Start, End ]", done =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        const spyX    = sinon.spy();
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            onScroll: spyX,
            onScrollFrame: spyX,
            onScrollStart: spyX,
            onScrollEnd: spyX
        }, false );

        rRef.view.scrollTop = 90;
        
        const to = setTimeout( ()=>{
            expect( spyX.callCount).toEqual( 4 );
            autoDestroy( destroyable, wrapper, destroy );
            clearTimeout(to);
            done();
        }, 300 );
    } );

    it( "yBar should be showable", () =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, false );

        expect( rRef.values.yShowable ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "xBar should be notShowable", () =>{

        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            showX: false
        }, false, {
            style: {
                border: "1px solid pink",
                width: '130%'
            }
        } );

        expect( rRef.values.xShowable ).toEqual(false);
        autoDestroy( destroyable, wrapper, destroy );
    } );

    it( "yBar should NOT autoHide", done =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            showX: false,
            flashTime: 10,
            autoHide: false
        }, false, {
            style: {
                border: "1px solid pink",
                width: '130%'
            }
        } );

        expect( rRef.values.yShowable ).toEqual(true);
        expect( rRef.values.xShowable ).toEqual(false);

        expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("block");
        expect( window.getComputedStyle( rRef.yBar ).opacity ).toEqual("1");
        expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("none");

        const to = setTimeout( ()=>{
            expect( window.getComputedStyle( rRef.yBar ).opacity ).toEqual("1");
            autoDestroy( destroyable, wrapper, destroy );
            done();
        }, 400 );

    } );

    it( "yBar should autoHide with 200ms timeout", done =>{
        const { node, destroy } = testSetup();
        
        let   rRef    = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            showX: false,
            flashTime: 10,
            thumbMinSize: 50,
            //initialFlashDelay: 1000
        }, false, {
            style: {
                border: "1px solid pink",
                width: '130%'
            }
        } );

        expect( rRef.values.yShowable ).toEqual(true);
        expect( rRef.values.xShowable ).toEqual(false);

        expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("block");
        expect( window.getComputedStyle( rRef.yBar ).opacity ).toEqual("1");
        expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("none");

        const to = setTimeout( ()=>{
            expect( window.getComputedStyle( rRef.yBar ).opacity ).toEqual("0");
            autoDestroy( destroyable, wrapper, destroy );
            done();
        }, 400 );

    } );
    
});

describe( "<Scrollbar/> Horizontal Bar Required", ()=>{
    
        const destroyable = true;
        const commonProps = {
            autoHide: false,
            showY: false
        };
        const wrapperStyle = {
            width: "200%"
        };
        
        it( "Should have xBar display = block and yBar display = none", () =>{
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el }, ...commonProps
            }, false, {
                style: wrapperStyle
            } );
    
            expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("block");
            expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("none");
    
            autoDestroy( destroyable, wrapper, destroy );
        } );
    
        it( "Should Call onScroll functions [ Scroll, scrollFrame, Start, End ]", done =>{
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            const spyX    = sinon.spy();
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps,
                onScroll: spyX,
                onScrollFrame: spyX,
                onScrollStart: spyX,
                onScrollEnd: spyX
            }, false, { style: wrapperStyle } );
    
            rRef.view.scrollLeft = 90;
            
            const to = setTimeout( ()=>{
                expect( spyX.callCount).toEqual( 4 );
                autoDestroy( destroyable, wrapper, destroy );
                clearTimeout(to);
                done();
            }, 300 );
        } );
    
        it( "yBar should be notShowable", () =>{
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps
            }, false, {
                style: wrapperStyle
            } );
    
            expect( rRef.values.yShowable ).toEqual(false);
            expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("none");
            autoDestroy( destroyable, wrapper, destroy );
        } );
    
        it( "xBar should be showable", () =>{
    
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps
            }, false, {
                style: wrapperStyle
            } );
    
            expect( rRef.values.xShowable ).toEqual(true);
            expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("block");
            autoDestroy( destroyable, wrapper, destroy );
        } );
    
        it( "xBar should NOT autoHide", done =>{
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps,
                flashTime: 10,
                autoHide: false
            }, false, {
                style: wrapperStyle
            } );
    
            expect( rRef.values.yShowable ).toEqual(false);
            expect( rRef.values.xShowable ).toEqual(true);
    
            expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("block");
            expect( window.getComputedStyle( rRef.xBar ).opacity ).toEqual("1");
            expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("none");
    
            const to = setTimeout( ()=>{
                expect( window.getComputedStyle( rRef.xBar ).opacity ).toEqual("1");
                autoDestroy( destroyable, wrapper, destroy );
                done();
            }, 400 );
    
        } );
    
        it( "xBar should autoHide with 200ms timeout", done =>{
            const { node, destroy } = testSetup();
            
            let   rRef    = null;
            
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps,
                initialFlashTime: 10,
                flashTime: 10,
                autoHide: true
            }, false, {
                style: wrapperStyle
            } );
    
            expect( rRef.values.yShowable ).toEqual(false);
            expect( rRef.values.xShowable ).toEqual(true);
    
            expect( window.getComputedStyle( rRef.xBar ).display ).toEqual("block");
            expect( window.getComputedStyle( rRef.xBar ).opacity ).toEqual("1");
            expect( window.getComputedStyle( rRef.yBar ).display ).toEqual("none");
    
            const to = setTimeout( ()=>{
                expect( window.getComputedStyle( rRef.xBar ).opacity ).toEqual("0");
                autoDestroy( destroyable, wrapper, destroy );
                done();
            }, 400 );
    
        } );
        
    });


describe('External classes applied', ()=>{

    const destroyable = true;
    const passingCssStyle = {
        root: "rootClass",
        view: "viewClass",
        yBar: "yBarClass",
        xBar: "xBarClass",
        xThumb: "xThumbClass",
        yThumb: "yThumbClass",
    };

    it('Should Modify Root Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.root.classList.contains('rootClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });

    it('Should Modify View Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.view.classList.contains('viewClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });

    it('Should Modify yBar Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.yBar.classList.contains('yBarClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });

    it('Should Modify xBar Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.xBar.classList.contains('xBarClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });

    it('Should Modify yThumb Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.yThumb.classList.contains('yThumbClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });

    it('Should Modify xThumb Element Class', ()=>{
        const { node, destroy } = testSetup();
        
        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el },
            elementClasses: passingCssStyle,
        });

        expect( rRef.xThumb.classList.contains('xThumbClass') ).toEqual(true);
        autoDestroy( destroyable, wrapper, destroy );
    });
});

describe.only( "Extra props should be applied to the root element", ( )=>{

    const destroyable = true;
    const commonProps = {
        autoHide: false,
        showY: false
    };
    const wrapperStyle = {
        width: "200%"
    };

    it( "Should Apply id attribute to the root element", ( )=>{
        const { node, destroy } = testSetup();
            
            let   rRef    = null;
            
            const wrapper = wrapMount( node, { 
                innerRef: el => { rRef = el },
                ...commonProps,
                flashTime: 10,
                autoHide: false,
                id: "some_id"
            }, false, {
                style: wrapperStyle
            } );

            expect( document.getElementById("some_id") ).toBeTruthy;
    });
});

describe( "Scrollbar", ()=>{

    /* it( "No Tracks because not necessary.", done =>{

        const { node, destroy } = testSetup();

        let rRef = null;
        
        const wrapper = wrapMount( node, { 
            innerRef: el => { rRef = el }
        }, true );

        expect( rRef ).toBeDefined();
        expect( wrapper ).toBeDefined();

        const yBarStyle = window.getComputedStyle( rRef.yBar );
        const xBarStyle = window.getComputedStyle( rRef.xBar );
        
        expect( yBarStyle.display ).toEqual("none");
        expect( xBarStyle.display ).toEqual("none");

        done();
    } );

    it( "Shouldn't be display on scroll attempt", done =>{

    } );

    it( "<Scrollbars/> Only Vertical Track.", done =>{
        
                const { node, destroy } = testSetup();
        
                let   rRef = null;
                const spyX = sinon.spy();
                
                const wrapper = wrapMount( node, { 
                    innerRef     : el => { rRef = el },
                    onScroll     : spyX,
                    onScrollFrame: spyX
                }, false );
        
                expect( rRef ).toBeDefined();
                expect( wrapper ).toBeDefined();
        
                const yBarStyle = window.getComputedStyle( rRef.yBar );
                const xBarStyle = window.getComputedStyle( rRef.xBar );
                
                expect( yBarStyle.display ).toEqual("block");
                expect( xBarStyle.display ).toEqual("none");
        
                rRef.view.scrollTop = 90;

                const to = setTimeout( ()=>{
                    expect( spyX.calledTwice).toEqual( true );
                    done();
                    clearTimeout(to);
                }, 100 );

                
        
    } );

    it( "<Scrollbars/> OnScroll " , ( done )=>{
        
                const { node, destroy } = testSetup();
        
                let   rRef = null;
                const spyX = sinon.spy();
                
                const wrapper = wrapMount( node, { 
                    innerRef     : el => { rRef = el },
                    onScroll     : spyX,
                    onScrollFrame: spyX
                }, false );
        
                expect( rRef ).toBeDefined();
                expect( wrapper ).toBeDefined();
        
                const yBarStyle = window.getComputedStyle( rRef.yBar );
                const xBarStyle = window.getComputedStyle( rRef.xBar );
                
                expect( yBarStyle.display ).toEqual("block");
                expect( xBarStyle.display ).toEqual("none");
        
                rRef.view.scrollTop = 90;
                
                const to = setTimeout( ()=>{
                    expect( spyX.calledTwice).toEqual( true );
                    done();
                    clearTimeout(to);
                }, 100 );

                
        
    } );
 */
    /* it( "Should be rendered", ()=>{

        const { node, destroy } = testSetup();
        
        const wrapper = mount( 
        <Sb3> MyContent </Sb3>, {
            attachTo: node
        } );

        
        expect(wrapper).toBeDefined();
        expect(1).toEqual(1);
    } );

    it( "Should have both scrollbars hidden ( not necessary )", ()=>{
        
                const { node, destroy } = testSetup();

                const elementClasses = {
                    view: "theView"
                }

                let rRef = null;

                const wrapper = mount( 
                <Sb3 elementClasses={ elementClasses } innerRef={ ob => { rRef = ob } } autoHide={true} flashTime={1000}>
                        {objects.map( (o,i)=>{
                            return(
                                <div key={o}>
                                    {o}
                                </div>
                            );
                        } ) }
                </Sb3>, {
                    attachTo: node
                } );
                expect( rRef.view.scrollTop ).toEqual(0);
                rRef.view.scrollTop = 90;
                expect( rRef.view.scrollTop ).toEqual(90);

                const objectInstance = wrapper.instance();
                console.log("FOUND", objectInstance, rRef);
                expect(wrapper).toBeDefined();
                expect(1).toEqual(1);
            } ); */
} );