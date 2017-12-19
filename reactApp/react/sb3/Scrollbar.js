/**
 * File: Scrollbars.js | Package: Monoux
 * 
 * Author : Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 28 Nov, 2017 | 7: 44 PM
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind-helper';
import css from 'dom-css';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import raf, { cancel as caf } from 'raf';


import calculateData, { 
    scrollLeftForOffset, 
    scrollTopForOffset, 
    eventDataForMouseDownTrack,
    eventDataForMouseDownThumb 
} from './calculateData';

import * as cssStyles from './applyCssStyles';
import { scrollbarsStyle } from './localStyles';
import { setTimeout } from 'timers';

function returnFalse(){
    return false;
}

class Scrollbar extends React.Component{

    constructor( props ){
        super( props );
        autobind( this );

        this.componentMounted = false;

        this.root = null;
        this.view      = null;
        this.xBar      = null;
        this.yBar      = null;
        this.xThumb    = null;
        this.yThumb    = null;


        this.values    = {};

        this.prevPageX = 0;
        this.prevPageY = 0;

        this.lastViewScrollLeft = null;
        this.lastViewScrollTop  = null;

        this.scrolling = false;
        this.hovering  = false;
        this.reached   = {
            top   : false,
            bottom: false,
            right : false,
            left  : false
        };
        
        this.fDelay = isNaN( props.initialFlashDelay ) ? 0 : props.initialFlashDelay;
    }

    /* *********************************
    ** L I S T E N E R S **
    ********************************* */
    addListeners(){
        const { passive } = this.props;
        const capture     = true;

        this.view.addEventListener( 'scroll', this.onScroll, { passive, capture } );
        this.view.addEventListener( 'wheel', this.onScroll, { capture } );

        /** object events **/
        this.xBar.addEventListener( 'mouseenter', this.onMouseEnterTrack );
        this.xBar.addEventListener( 'mouseleave', this.onMouseLeaveTrack );
        this.yBar.addEventListener( 'mouseenter', this.onMouseEnterTrack );
        this.yBar.addEventListener( 'mouseleave', this.onMouseLeaveTrack );
        this.xBar.addEventListener( 'mousedown', this.onMouseDownTrackX );
        this.yBar.addEventListener( 'mousedown', this.onMouseDownTrackY );

        //thumb
        this.xThumb.addEventListener( 'mousedown', this.onMouseDownThumbX );
        this.yThumb.addEventListener( 'mousedown', this.onMouseDownThumbY );

    }

    removeListeners(){
        const { passive } = this.props;
        const capture     = true;

        this.view.removeEventListener( 'scroll', this.onScroll, { passive, capture } );
        this.view.removeEventListener( 'wheel', this.onScroll, { capture } );

        /** object events **/
        this.xBar.removeEventListener( 'mouseenter', this.onMouseEnterTrack );
        this.xBar.removeEventListener( 'mouseleave', this.onMouseLeaveTrack );
        this.yBar.removeEventListener( 'mouseenter', this.onMouseEnterTrack );
        this.yBar.removeEventListener( 'mouseleave', this.onMouseLeaveTrack );
        this.xBar.removeEventListener( 'mousedown', this.onMouseDownTrackX );
        this.yBar.removeEventListener( 'mousedown', this.onMouseDownTrackY );

        //thumbs events
        this.xThumb.removeEventListener( 'mousedown', this.onMouseDownThumbX );
        this.yThumb.removeEventListener( 'mousedown', this.onMouseDownThumbY );

    }

    onMouseEnterTrack(){
        this.hovering = true;
        this.autoShowTracks();
    }

    onMouseLeaveTrack(){
        this.hovering = false;
        this.autoHideTracks();
    }

    onMouseDownTrackX( event ){

        this.values = calculateData(this.view, this.xBar, this.yBar, this.props);
        const eData = eventDataForMouseDownTrack( event, 'x' );
        
        const offset = Math.abs(eData.targetLeft - eData.clientX) - this.values.thumbWidth / 2;
        this.view.scrollLeft = scrollLeftForOffset( this.values, offset );
    }

    onMouseDownTrackY( event ){

        this.values = calculateData(this.view, this.xBar, this.yBar, this.props);
        const eData = eventDataForMouseDownTrack( event, 'y' );
        
        const offset = Math.abs(eData.targetTop - eData.clientY) - this.values.thumbHeight / 2;
        this.view.scrollTop = scrollTopForOffset( this.values, offset );
    }

    onMouseDownThumbX( event ){
        const eData = eventDataForMouseDownThumb( event, 'x' );
        this.onDragStart( event );
        this.prevPageX = eData.offsetWidth - (eData.clientX - eData.targetLeft);
    }

    onMouseDownThumbY( event ){
        const eData = eventDataForMouseDownThumb( event, 'y' );
        this.onDragStart( event );
        this.prevPageY = eData.offsetHeight - (eData.clientY - eData.targetTop);
    }

    onDragStart( event ){
        event.stopImmediatePropagation();
        this.dragging = true;
        this.onInitializeDragging();
    }

    onDragEnd( event ){
        event.stopImmediatePropagation();
        this.dragging = false;
        this.prevPageX = 0;
        this.prevPageY = 0;
        this.onTearDownDragging();
    }

    onInitializeDragging(){
        //css(document.body, disableSelectStyle);
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.onDragEnd);
        document.onselectstart = returnFalse;
    }

    onTearDownDragging(){
        //css(document.body, disableSelectStyleReset);
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.onDragEnd);
        document.onselectstart = undefined;
    }

    onDrag(event){

        this.values = calculateData(this.view, this.xBar, this.yBar, this.props);
        
        if (this.prevPageX) {
            const { clientX } = event;
            const { left: trackLeft } = this.xBar.getBoundingClientRect();
            
            const clickPosition = this.values.thumbWidth - this.prevPageX;
            this.view.scrollLeft = scrollLeftForOffset( this.values, -trackLeft + clientX - clickPosition );
        }
        if (this.prevPageY) {
            const { clientY } = event;
            const { top: trackTop } = this.yBar.getBoundingClientRect();
            
            const clickPosition = this.values.thumbHeight - this.prevPageY;
            this.view.scrollTop = scrollTopForOffset( this.values, -trackTop + clientY - clickPosition );
        }
        return false;
        
    }
    
    onScroll(){

        this.update( values =>{ 

            if( this.props.onScrollFrame ){
                this.props.onScrollFrame( values );
            }

            this.detectLimits(values);
        } );

        if( this.props.onScroll ){
            this.props.onScroll( this.values );
        }

        this.detectScrolling();
    }

    onScrollStarts(){
        if( this.props.onScrollStart ){
            this.props.onScrollStart( this.values );
        }
        if( this.props.autoHide ){
            this.autoShowTracks();
        }
    }

    onScrollEnds(){
        if( this.props.onScrollEnd ){
            this.props.onScrollEnd( this.values );
        }
        this.autoHideTracks();
    }
    
    autoShowTracks(){
        
        if( !this.componentMounted || this._dontAutoHide()) return;
        clearInterval(this.flashInterval);
        this.showTracks();
    }

    autoHideTracks(){

        if( !this.componentMounted || this._dontAutoHide()) return;
        
        this.flashInterval = setInterval( ()=>{
            if( this.scrolling || this.isHovering) return;
            this.hideTracks();
            clearInterval(this.flashInterval);
        }, this._flashTime() );
        return;
    }

    showTracks(){
        if( this._dontAutoHide() ) return;

        if( this.values.yShowable ){
            this.yBar.classList.remove("autoHiding");
            this.yBar.classList.add("autoShowing");
        }
        if( this.values.xShowable ){
            this.xBar.classList.remove("autoHiding");
            this.xBar.classList.add("autoShowing");
        }
    }

    hideTracks(){
        if( this._dontAutoHide() ) return;

        if( this.values.yShowable ){
            this.yBar.classList.remove("autoShowing");
            this.yBar.classList.add("autoHiding");
        }
        if( this.values.xShowable ){
            this.xBar.classList.remove("autoShowing");
            this.xBar.classList.add("autoHiding");
        }
    }

    /* *********************************
    ** T I M E R S  A N D  A U T O H I D E  S E T T I N G S **
    ********************************* */

    _flashTime(){
        const { flashTime } = this.props;
        if(  !isNaN( flashTime ) ){
            return flashTime;
        }
        return 0;
    }

    _initialFlashTime(){
        const { initialFlashTime } = this.props;
        if(  !isNaN( initialFlashTime ) ){
            return initialFlashTime;
        }
        return this._flashTime();
    }

    _autoHide(){
        return this._flashTime() > 0 && this.props.autoHide;
    }

    _dontAutoHide(){
        return !this._autoHide();
    }


    /* *********************************
    ** L I M I T  R E A C H I N G  A N D  D E T E C T I O N S**
    ********************************* */

    detectLimits( values ){

        const { atTop, atBottom, atRight, atLeft } = values;
        const { scrollTop, maxScrollTop}           = values;
        const { scrollLeft, maxScrollLeft}         = values;

        if( atTop && !this.reached.top){
            if( this.props.onTopReached ){
                this.props.onTopReached( values );
                this.reached.top = true;
            }
        }

        if( atBottom && !this.reached.bottom){
            if( this.props.onBottomReached ){
                this.props.onBottomReached( values );
                this.reached.bottom = true;
            }
        }

        if( atLeft ){
            if( this.props.onLeftReached ){
                this.props.onLeftReached( values );
                this.reached.left = true;
            }
        }

        if( atRight ){
            if( this.props.onRightReached ){
                this.props.onRightReached( values );
                this.reached.right = true;
            }
        }
        
        if( scrollTop > 10 && scrollTop < ( maxScrollTop - 10 ) ){
            this.reached.top    = false;
            this.reached.bottom = false;
        }

        if( scrollLeft > 10 && screenLeft < ( maxScrollLeft - 10 ) ){
            this.reached.left  = false;
            this.reached.right = false;
        }

        this.viewScrollTop  = values.scrollTop;
        this.viewScrollLeft = values.scrollLeft;
    }

    detectScrolling() {

        if (this.scrolling) return;

        this.scrolling = true;
        this.onScrollStarts();
        this.detectScrollingInterval = setInterval(() => {

            if (this.lastViewScrollLeft === this.viewScrollLeft
                && this.lastViewScrollTop === this.viewScrollTop && !this.hovering) {
                clearInterval(this.detectScrollingInterval);
                this.scrolling = false;
                this.onScrollEnds();
            }

            this.lastViewScrollLeft = this.viewScrollLeft;
            this.lastViewScrollTop  = this.viewScrollTop;
        }, 100);
    }

    /* *********************************
    ** U P D A T E S **
    ********************************* */
    raf(callback) {
        
        if (this.requestFrame) raf.cancel(this.requestFrame);

        this.requestFrame = raf( () => {
            this.requestFrame = undefined;
            callback();
        });
    }

    update(callback) {
        this.raf(() => this.rafUpdate(callback));
    }

    rafUpdate( callback ){

        this.values = calculateData(this.view, this.xBar, this.yBar, this.props);
        
        cssStyles.yThumb( this.yThumb, this.values );
        cssStyles.xThumb( this.xThumb, this.values );
        cssStyles.yBar( this.yBar, this.values );
        cssStyles.xBar( this.xBar, this.values );
        callback( this.values );
    }

    /* *********************************
    ** L I F E C Y C L E **
    ********************************* */
    componentDidMount(){
        
        this.componentMounted = true;
        this.values = calculateData(this.view, this.xBar, this.yBar, this.props);

        if( this._autoHide){
            //this.hideTracks();
            this.flashDelay = setTimeout( ()=>{
                this.showTracks();
                const to = setTimeout( ()=>{
                    this.autoHideTracks();
                    clearTimeout( to );
                    clearTimeout( this.flashDelay );
                }, this._initialFlashTime() );
                
            } , this.props.initialFlashDelay)
        }

        this.addListeners();
        cssStyles.yThumb( this.yThumb, this.values );
        cssStyles.xThumb( this.xThumb, this.values );
        cssStyles.yBar( this.yBar, this.values );
        cssStyles.xBar( this.xBar, this.values );

        //Retrieve references
        if( this.props.refRoot ){
            this.props.refRoot( this.root )
        }

        if( this.props.refView ){
            this.props.refView( this.view )
        }

        if( this.props.refXBar ){
            this.props.refXBar( this.xBar )
        }

        if( this.props.refYBar ){
            this.props.refYBar( this.yBar )
        }

        if( this.props.refXThumb ){
            this.props.refXThumb( this.xThumb )
        }

        if( this.props.refYThumb ){
            this.props.refYThumb( this.yThumb )
        }

        if( this.props.refAll ){
            this.props.refAll( {
                root: this.root,
                view: this.view,
                xBar: this.xBar,
                yBar: this.yBar,
                xThumb: this.xThumb,
                yThumb: this.yThumb,
            } );
        }
        
    }

    componentWillUnmount(){
        this.componentMounted = false;
        this.removeListeners();
    }

    render(){

        const { root, container, xBar, yBar, viewContainer, xThumb, yThumb } = this.props.classes;

        // CSS Classes
        const _rootCss   = classNames( root, this.props.elementClasses.root || null );
        const _viewCss   = classNames( viewContainer, this.props.elementClasses.view || null );
        const _yThumbCss = classNames( yThumb, this.props.elementClasses.yThumb || null );
        const _xThumbCss = classNames( xThumb, this.props.elementClasses.xThumb || null );
        const _yBarCss   = classNames( yBar, this.props.elementClasses.yBar || null, {
            autoHiding: this.fDelay > 0
        } );
        const _xBarCss   = classNames( xBar, this.props.elementClasses.xBar || null, {
            autoHiding: this.fDelay > 0
        } );

        //Styles
        const viewStyle = {
            marginRight : -( window.sb2GlobalData.scrollbarWidth ) || 0,
            marginBottom: -( window.sb2GlobalData.scrollbarWidth ) || 0,
            ...( !this.props.showX && { overflowX: 'hidden' } ), 
            ...( !this.props.showY && { overflowY: 'hidden' } ) 
        };

        const xBarStyle = { ...( !this.props.showX && { display:'none' } ) };
        const yBarStyle = { ...( !this.props.showY && { display:'none' } ) };

        return(
            <div className={ _rootCss } ref={ e => { this.root = e } }>     
                <div className={_viewCss} style={viewStyle} ref={ e => { this.view = e } }>
                    {this.props.children}
                </div>
                <div className={_yBarCss} ref={ e => { this.yBar = e } } style={ yBarStyle }>
                    <div className={_yThumbCss} ref={ e => { this.yThumb = e } }/>
                </div>
                <div className={_xBarCss} ref={ e => { this.xBar = e } } style={ xBarStyle }>
                    <div className={_xThumbCss} ref={ e => { this.xThumb = e } }/>
                </div>
            </div>
        );

    }

    static defaultProps = {
        flashTime     : 500,
        elementClasses: {},
        autoHide      : true,
        showX         : true,
        showY         : true,
        thumbMinSize  : 30,
        
        initialFlashDelay: 0
    };
    static propTypes    = {

        /** Events */
        onScrollStart  : PropTypes.func,
        onScrollEnd    : PropTypes.func,
        onScroll       : PropTypes.func,
        onScrollFrame  : PropTypes.func,
        onTopReached   : PropTypes.func,
        onBottomReached: PropTypes.func,
        onLeftReached  : PropTypes.func,
        onRightReached : PropTypes.func,

        /** Styling */
        initialFlashTime: PropTypes.number,
        initialFlashDelay: PropTypes.number,
        thumbMinSize: PropTypes.number,
        

        autoHide : PropTypes.bool,
        flashTime: PropTypes.number,
        showX    : PropTypes.bool,
        showY    : PropTypes.bool,
        

        /** elementClasses */
        elementClasses: PropTypes.object,

        /** element reference */
        refRoot: PropTypes.func,
        refView: PropTypes.func,
        refXBar: PropTypes.func,
        refYBar: PropTypes.func,
        refXThumb: PropTypes.func,
        refYThumb: PropTypes.func,
        refAll: PropTypes.func
    };
}
export default withStyles( scrollbarsStyle )( Scrollbar );