'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAutobindHelper = require('react-autobind-helper');

var _reactAutobindHelper2 = _interopRequireDefault(_reactAutobindHelper);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _raf2 = require('raf');

var _raf3 = _interopRequireDefault(_raf2);

var _calculateData = require('./calculateData');

var _calculateData2 = _interopRequireDefault(_calculateData);

var _applyCssStyles = require('./applyCssStyles');

var cssStyles = _interopRequireWildcard(_applyCssStyles);

var _localStyles = require('./localStyles');

var _timers = require('timers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

//import css from 'dom-css';


function returnFalse() {
    return false;
}

var Scrollbar = function (_React$Component) {
    _inherits(Scrollbar, _React$Component);

    function Scrollbar(props) {
        _classCallCheck(this, Scrollbar);

        var _this = _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));

        (0, _reactAutobindHelper2.default)(_this);

        _this.componentMounted = false;

        _this.root = null;
        _this.view = null;
        _this.xBar = null;
        _this.yBar = null;
        _this.xThumb = null;
        _this.yThumb = null;

        _this.values = {};

        _this.prevPageX = 0;
        _this.prevPageY = 0;

        _this.lastViewScrollLeft = null;
        _this.lastViewScrollTop = null;

        _this.scrolling = false;
        _this.hovering = false;
        _this.reached = {
            top: false,
            bottom: false,
            right: false,
            left: false
        };

        _this.fDelay = isNaN(props.initialFlashDelay) ? 0 : props.initialFlashDelay;
        return _this;
    }

    /* *********************************
    ** L I S T E N E R S **
    ********************************* */


    _createClass(Scrollbar, [{
        key: 'addListeners',
        value: function addListeners() {
            var passive = this.props.passive;

            var capture = true;

            this.view.addEventListener('scroll', this.onScroll, { passive: passive, capture: capture });
            this.view.addEventListener('wheel', this.onScroll, { capture: capture });

            /** object events **/
            this.xBar.addEventListener('mouseenter', this.onMouseEnterTrack);
            this.xBar.addEventListener('mouseleave', this.onMouseLeaveTrack);
            this.yBar.addEventListener('mouseenter', this.onMouseEnterTrack);
            this.yBar.addEventListener('mouseleave', this.onMouseLeaveTrack);
            this.xBar.addEventListener('mousedown', this.onMouseDownTrackX);
            this.yBar.addEventListener('mousedown', this.onMouseDownTrackY);

            //thumb
            this.xThumb.addEventListener('mousedown', this.onMouseDownThumbX);
            this.yThumb.addEventListener('mousedown', this.onMouseDownThumbY);
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            var passive = this.props.passive;

            var capture = true;

            this.view.removeEventListener('scroll', this.onScroll, { passive: passive, capture: capture });
            this.view.removeEventListener('wheel', this.onScroll, { capture: capture });

            /** object events **/
            this.xBar.removeEventListener('mouseenter', this.onMouseEnterTrack);
            this.xBar.removeEventListener('mouseleave', this.onMouseLeaveTrack);
            this.yBar.removeEventListener('mouseenter', this.onMouseEnterTrack);
            this.yBar.removeEventListener('mouseleave', this.onMouseLeaveTrack);
            this.xBar.removeEventListener('mousedown', this.onMouseDownTrackX);
            this.yBar.removeEventListener('mousedown', this.onMouseDownTrackY);

            //thumbs events
            this.xThumb.removeEventListener('mousedown', this.onMouseDownThumbX);
            this.yThumb.removeEventListener('mousedown', this.onMouseDownThumbY);
        }
    }, {
        key: 'onMouseEnterTrack',
        value: function onMouseEnterTrack() {
            this.hovering = true;
            this.autoShowTracks();
        }
    }, {
        key: 'onMouseLeaveTrack',
        value: function onMouseLeaveTrack() {
            this.hovering = false;
            this.autoHideTracks();
        }
    }, {
        key: 'onMouseDownTrackX',
        value: function onMouseDownTrackX(event) {

            this.values = (0, _calculateData2.default)(this.view, this.xBar, this.yBar, this.props);
            var eData = (0, _calculateData.eventDataForMouseDownTrack)(event, 'x');

            var offset = Math.abs(eData.targetLeft - eData.clientX) - this.values.thumbWidth / 2;
            this.view.scrollLeft = (0, _calculateData.scrollLeftForOffset)(this.values, offset);
        }
    }, {
        key: 'onMouseDownTrackY',
        value: function onMouseDownTrackY(event) {

            this.values = (0, _calculateData2.default)(this.view, this.xBar, this.yBar, this.props);
            var eData = (0, _calculateData.eventDataForMouseDownTrack)(event, 'y');

            var offset = Math.abs(eData.targetTop - eData.clientY) - this.values.thumbHeight / 2;
            this.view.scrollTop = (0, _calculateData.scrollTopForOffset)(this.values, offset);
        }
    }, {
        key: 'onMouseDownThumbX',
        value: function onMouseDownThumbX(event) {
            var eData = (0, _calculateData.eventDataForMouseDownThumb)(event, 'x');
            this.onDragStart(event);
            this.prevPageX = eData.offsetWidth - (eData.clientX - eData.targetLeft);
        }
    }, {
        key: 'onMouseDownThumbY',
        value: function onMouseDownThumbY(event) {
            var eData = (0, _calculateData.eventDataForMouseDownThumb)(event, 'y');
            this.onDragStart(event);
            this.prevPageY = eData.offsetHeight - (eData.clientY - eData.targetTop);
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event) {
            event.stopImmediatePropagation();
            this.dragging = true;
            this.onInitializeDragging();
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            event.stopImmediatePropagation();
            this.dragging = false;
            this.prevPageX = 0;
            this.prevPageY = 0;
            this.onTearDownDragging();
        }
    }, {
        key: 'onInitializeDragging',
        value: function onInitializeDragging() {
            //css(document.body, disableSelectStyle);
            document.addEventListener('mousemove', this.onDrag);
            document.addEventListener('mouseup', this.onDragEnd);
            document.onselectstart = returnFalse;
        }
    }, {
        key: 'onTearDownDragging',
        value: function onTearDownDragging() {
            //css(document.body, disableSelectStyleReset);
            document.removeEventListener('mousemove', this.onDrag);
            document.removeEventListener('mouseup', this.onDragEnd);
            document.onselectstart = undefined;
        }
    }, {
        key: 'onDrag',
        value: function onDrag(event) {

            this.values = (0, _calculateData2.default)(this.view, this.xBar, this.yBar, this.props);

            if (this.prevPageX) {
                var clientX = event.clientX;

                var _xBar$getBoundingClie = this.xBar.getBoundingClientRect(),
                    trackLeft = _xBar$getBoundingClie.left;

                var clickPosition = this.values.thumbWidth - this.prevPageX;
                this.view.scrollLeft = (0, _calculateData.scrollLeftForOffset)(this.values, -trackLeft + clientX - clickPosition);
            }
            if (this.prevPageY) {
                var clientY = event.clientY;

                var _yBar$getBoundingClie = this.yBar.getBoundingClientRect(),
                    trackTop = _yBar$getBoundingClie.top;

                var _clickPosition = this.values.thumbHeight - this.prevPageY;
                this.view.scrollTop = (0, _calculateData.scrollTopForOffset)(this.values, -trackTop + clientY - _clickPosition);
            }
            return false;
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            var _this2 = this;

            this.update(function (values) {

                if (_this2.props.onScrollFrame) {
                    _this2.props.onScrollFrame(values);
                }

                _this2.detectLimits(values);
            });

            if (this.props.onScroll) {
                this.props.onScroll(this.values);
            }

            this.detectScrolling();
        }
    }, {
        key: 'onScrollStarts',
        value: function onScrollStarts() {
            if (this.props.onScrollStart) {
                this.props.onScrollStart(this.values);
            }
            if (this.props.autoHide) {
                this.autoShowTracks();
            }
        }
    }, {
        key: 'onScrollEnds',
        value: function onScrollEnds() {
            if (this.props.onScrollEnd) {
                this.props.onScrollEnd(this.values);
            }
            this.autoHideTracks();
        }
    }, {
        key: 'autoShowTracks',
        value: function autoShowTracks() {

            if (!this.componentMounted || this._dontAutoHide()) return;
            clearInterval(this.flashInterval);
            this.showTracks();
        }
    }, {
        key: 'autoHideTracks',
        value: function autoHideTracks() {
            var _this3 = this;

            if (!this.componentMounted || this._dontAutoHide()) return;

            this.flashInterval = setInterval(function () {
                if (_this3.scrolling || _this3.isHovering) return;
                _this3.hideTracks();
                clearInterval(_this3.flashInterval);
            }, this._flashTime());
            return;
        }
    }, {
        key: 'showTracks',
        value: function showTracks() {
            if (this._dontAutoHide()) return;

            if (this.values.yShowable && this.yBar) {
                this.yBar.classList.remove("autoHiding");
                this.yBar.classList.add("autoShowing");
            }
            if (this.values.xShowable && this.xBar) {
                this.xBar.classList.remove("autoHiding");
                this.xBar.classList.add("autoShowing");
            }
        }
    }, {
        key: 'hideTracks',
        value: function hideTracks() {
            if (this._dontAutoHide()) return;

            if (this.values.yShowable && this.yBar) {
                this.yBar.classList.remove("autoShowing");
                this.yBar.classList.add("autoHiding");
            }
            if (this.values.xShowable && this.xBar) {
                this.xBar.classList.remove("autoShowing");
                this.xBar.classList.add("autoHiding");
            }
        }

        /* *********************************
        ** T I M E R S  A N D  A U T O H I D E  S E T T I N G S **
        ********************************* */

    }, {
        key: '_flashTime',
        value: function _flashTime() {
            var flashTime = this.props.flashTime;

            if (!isNaN(flashTime)) {
                return flashTime;
            }
            return 0;
        }
    }, {
        key: '_initialFlashTime',
        value: function _initialFlashTime() {
            var initialFlashTime = this.props.initialFlashTime;

            if (!isNaN(initialFlashTime)) {
                return initialFlashTime;
            }
            return this._flashTime();
        }
    }, {
        key: '_autoHide',
        value: function _autoHide() {
            return this._flashTime() > 0 && this.props.autoHide;
        }
    }, {
        key: '_dontAutoHide',
        value: function _dontAutoHide() {
            return !this._autoHide();
        }

        /* *********************************
        ** L I M I T  R E A C H I N G  A N D  D E T E C T I O N S**
        ********************************* */

    }, {
        key: 'detectLimits',
        value: function detectLimits(values) {
            var atTop = values.atTop,
                atBottom = values.atBottom,
                atRight = values.atRight,
                atLeft = values.atLeft;
            var scrollTop = values.scrollTop,
                maxScrollTop = values.maxScrollTop;
            var scrollLeft = values.scrollLeft,
                maxScrollLeft = values.maxScrollLeft;


            if (atTop && !this.reached.top) {
                if (this.props.onTopReached) {
                    this.props.onTopReached(values);
                    this.reached.top = true;
                }
            }

            if (atBottom && !this.reached.bottom) {
                if (this.props.onBottomReached) {
                    this.props.onBottomReached(values);
                    this.reached.bottom = true;
                }
            }

            if (atLeft) {
                if (this.props.onLeftReached) {
                    this.props.onLeftReached(values);
                    this.reached.left = true;
                }
            }

            if (atRight) {
                if (this.props.onRightReached) {
                    this.props.onRightReached(values);
                    this.reached.right = true;
                }
            }

            if (scrollTop > 10 && scrollTop < maxScrollTop - 10) {
                this.reached.top = false;
                this.reached.bottom = false;
            }

            if (scrollLeft > 10 && screenLeft < maxScrollLeft - 10) {
                this.reached.left = false;
                this.reached.right = false;
            }

            this.viewScrollTop = values.scrollTop;
            this.viewScrollLeft = values.scrollLeft;
        }
    }, {
        key: 'detectScrolling',
        value: function detectScrolling() {
            var _this4 = this;

            if (this.scrolling) return;

            this.scrolling = true;
            this.onScrollStarts();
            this.detectScrollingInterval = setInterval(function () {

                if (_this4.lastViewScrollLeft === _this4.viewScrollLeft && _this4.lastViewScrollTop === _this4.viewScrollTop && !_this4.hovering) {
                    clearInterval(_this4.detectScrollingInterval);
                    _this4.scrolling = false;
                    _this4.onScrollEnds();
                }

                _this4.lastViewScrollLeft = _this4.viewScrollLeft;
                _this4.lastViewScrollTop = _this4.viewScrollTop;
            }, 100);
        }

        /* *********************************
        ** U P D A T E S **
        ********************************* */

    }, {
        key: 'raf',
        value: function raf(callback) {
            var _this5 = this;

            if (this.requestFrame) _raf3.default.cancel(this.requestFrame);

            this.requestFrame = (0, _raf3.default)(function () {
                _this5.requestFrame = undefined;
                callback();
            });
        }
    }, {
        key: 'update',
        value: function update(callback) {
            var _this6 = this;

            this.raf(function () {
                return _this6.rafUpdate(callback);
            });
        }
    }, {
        key: 'rafUpdate',
        value: function rafUpdate(callback) {

            this.values = (0, _calculateData2.default)(this.view, this.xBar, this.yBar, this.props);

            cssStyles.yThumb(this.yThumb, this.values);
            cssStyles.xThumb(this.xThumb, this.values);
            cssStyles.yBar(this.yBar, this.values);
            cssStyles.xBar(this.xBar, this.values);

            if (callback !== null) {
                callback(this.values);
            }
        }

        /* *********************************
        ** L I F E C Y C L E **
        ********************************* */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this7 = this;

            this.componentMounted = true;
            this.values = (0, _calculateData2.default)(this.view, this.xBar, this.yBar, this.props);

            if (this._autoHide) {
                //this.hideTracks();
                this.flashDelay = (0, _timers.setTimeout)(function () {
                    _this7.showTracks();
                    var to = (0, _timers.setTimeout)(function () {
                        _this7.autoHideTracks();
                        clearTimeout(to);
                        clearTimeout(_this7.flashDelay);
                    }, _this7._initialFlashTime());
                }, this.props.initialFlashDelay);
            }

            this.addListeners();
            cssStyles.yThumb(this.yThumb, this.values);
            cssStyles.xThumb(this.xThumb, this.values);
            cssStyles.yBar(this.yBar, this.values);
            cssStyles.xBar(this.xBar, this.values);

            //Retrieve references
            if (this.props.refRoot) {
                this.props.refRoot(this.root);
            }

            if (this.props.refView) {
                this.props.refView(this.view);
            }

            if (this.props.refXBar) {
                this.props.refXBar(this.xBar);
            }

            if (this.props.refYBar) {
                this.props.refYBar(this.yBar);
            }

            if (this.props.refXThumb) {
                this.props.refXThumb(this.xThumb);
            }

            if (this.props.refYThumb) {
                this.props.refYThumb(this.yThumb);
            }

            if (this.props.refAll) {
                this.props.refAll({
                    root: this.root,
                    view: this.view,
                    xBar: this.xBar,
                    yBar: this.yBar,
                    xThumb: this.xThumb,
                    yThumb: this.yThumb
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.rafUpdate(null);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.detectScrollingInterval);
            clearInterval(this.flashInterval);
            this.componentMounted = false;
            this.removeListeners();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var _props$classes = this.props.classes,
                root = _props$classes.root,
                container = _props$classes.container,
                xBar = _props$classes.xBar,
                yBar = _props$classes.yBar,
                viewContainer = _props$classes.viewContainer,
                xThumb = _props$classes.xThumb,
                yThumb = _props$classes.yThumb;

            // CSS Classes

            var _rootCss = (0, _classnames2.default)(root, this.props.elementClasses.root || null);
            var _viewCss = (0, _classnames2.default)(viewContainer, this.props.elementClasses.view || null);
            var _yThumbCss = (0, _classnames2.default)(yThumb, this.props.elementClasses.yThumb || null);
            var _xThumbCss = (0, _classnames2.default)(xThumb, this.props.elementClasses.xThumb || null);
            var _yBarCss = (0, _classnames2.default)(yBar, this.props.elementClasses.yBar || null, {
                autoHiding: this.fDelay > 0
            });
            var _xBarCss = (0, _classnames2.default)(xBar, this.props.elementClasses.xBar || null, {
                autoHiding: this.fDelay > 0
            });

            //Styles
            var viewStyle = _extends({
                marginRight: -window.sb2GlobalData.scrollbarWidth || 0,
                marginBottom: -window.sb2GlobalData.scrollbarWidth || 0
            }, !this.props.showX && { overflowX: 'hidden' }, !this.props.showY && { overflowY: 'hidden' });

            var xBarStyle = _extends({}, !this.props.showX && { display: 'none' });
            var yBarStyle = _extends({}, !this.props.showY && { display: 'none' });

            return _react2.default.createElement(
                'div',
                { className: _rootCss, ref: function ref(e) {
                        _this8.root = e;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: _viewCss, style: viewStyle, ref: function ref(e) {
                            _this8.view = e;
                        } },
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    { className: _yBarCss, ref: function ref(e) {
                            _this8.yBar = e;
                        }, style: yBarStyle },
                    _react2.default.createElement('div', { className: _yThumbCss, ref: function ref(e) {
                            _this8.yThumb = e;
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    { className: _xBarCss, ref: function ref(e) {
                            _this8.xBar = e;
                        }, style: xBarStyle },
                    _react2.default.createElement('div', { className: _xThumbCss, ref: function ref(e) {
                            _this8.xThumb = e;
                        } })
                )
            );
        }
    }]);

    return Scrollbar;
}(_react2.default.Component);

Scrollbar.defaultProps = {
    flashTime: 500,
    elementClasses: {},
    autoHide: true,
    showX: true,
    showY: true,
    thumbMinSize: 30,

    initialFlashDelay: 0
};
Scrollbar.propTypes = {

    /** Events */
    onScrollStart: _propTypes2.default.func,
    onScrollEnd: _propTypes2.default.func,
    onScroll: _propTypes2.default.func,
    onScrollFrame: _propTypes2.default.func,
    onTopReached: _propTypes2.default.func,
    onBottomReached: _propTypes2.default.func,
    onLeftReached: _propTypes2.default.func,
    onRightReached: _propTypes2.default.func,

    /** Styling */
    initialFlashTime: _propTypes2.default.number,
    initialFlashDelay: _propTypes2.default.number,
    thumbMinSize: _propTypes2.default.number,

    autoHide: _propTypes2.default.bool,
    flashTime: _propTypes2.default.number,
    showX: _propTypes2.default.bool,
    showY: _propTypes2.default.bool,

    /** elementClasses */
    elementClasses: _propTypes2.default.object,

    /** element reference */
    refRoot: _propTypes2.default.func,
    refView: _propTypes2.default.func,
    refXBar: _propTypes2.default.func,
    refYBar: _propTypes2.default.func,
    refXThumb: _propTypes2.default.func,
    refYThumb: _propTypes2.default.func,
    refAll: _propTypes2.default.func
};
exports.default = (0, _withStyles2.default)(_localStyles.scrollbarsStyle)(Scrollbar);