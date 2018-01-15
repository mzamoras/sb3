# React SB3

## Usage:

Install Using:

```
// With NPM
npm add react-sb3

// With Yarn
yarn add react-sb3
```


## Component PropTypes

### Styling Properties

| Property | Description | Kind | Default |
| --- | --- | --- | --- |
| autoHide | Enables the autoHiding function for the scrollbars | bool | False  |
| showX | Enables the Horizontal scrollbar | bool | true |
| showY | Enables the Vertical scrollbar | bool | true |
| flashTime | Indicates the time ( in microseconds ) the scrollbars will be visible after a scroll movement, before auto hiding. **Needs autohide enabled** | number | 500 |
| InitialFlashTime | The time ( in microseconds ) the scrollbars will be visible after mount, to indicate the existence of scrollbars | number | 0 |
| initialFlashDelay | Indicates the time ( in microseconds ) before the autoFlash starts | number | 0 |
| thumbMinSize | The minimum size ( in pixels ) of both thumbs | number | 30 |
| elementClasses | The css classes to be passed to internal elements **See element Classes for details** | object | {} |

### Events

| EventName | Description |
| --- | --- |
| onScrollStart | When scrolling process starts |
| onScrollEnd | When scrolling process ends |
| onScroll | When scrolling |
| onScrollFrame | When scrolling inside animation frame process |
| onTopReached | When top position is reached, won't trigger initially |
| onLeftReached | When left position is reached, won't trigger initially |
| onBottomReached | When bottom position is reached |
| onRightReached | When right position is reached |

### References

| PropName | Element |
| --- | --- |
| refRoot | Returns the root element |
| refView | Returns the root element |
| refXBar | Returns the horizontal bar element |
| refYBar | Returns the vertical bar element |
| refXThumb | Returns the horizontal thumb element |
| refYThumb | Returns the vertical thumb element |
| refAll | Returns an object with all the elements; |

#### Using the references:
```js
    
    import React from 'react';
    import Scrollbars3 from 'react-sb3';
    
    class component extends React.Component
        
        constructor(props){
            super(props);
            this.scrollbarRoot = null;
        }
        
        render(){
            return (
                <Scrollbars3 refRoot={ el => { this.scrollbarRoot = el }}>
                    {/* All content here */}
                </Scrollbars3>
            );
        }
        
    };
    
    export default component;
    
```


## Internal Elements of the Component

### Root
Its the component wrapper.

### View
Its the scrolling view

### xBar
Its the horizontal scrollbar

### yBar
Its the vertical scrollbar

### xThumb
Its the horizontal thumb

### yThumb
Its the vertical thumb 

## Styling Internal Elements

Example:
2 Files, 1 Component, 1 Less Style Sheet

**componentFile.jsx**

```js
    import React from 'react';
    import Scrollbars3 from 'react-sb3';
    import './someFile.less';
    
    const component = ( ) => {
        
        const elementClasses = {
            root  : "myRootClass",
            view  : "myViewClass",
            xBar  : "myXBarClass",
            yBar  : "myYBarClass",
            xThumb: "myXThumbClass",
            xThumb: "myYThumbClass",
        }
        
        return (
            <Scrollbars3 elementClasses={elementClasses}>
                {/* All content here */}
            </Scrollbars3>
        );
        
    };
    
    export default component;
    
```

**someFile.less**

```less
    
    .myRootClass{
        border: 1px solid red;
    }
    
    .myViewClass{
        border: 1px solid red;
    }
    
    .myXBarClass{
        //red horizontal bar
        backgroundColor: red;
        
        &.autoShowing:{
            opacity: 1
        },
        &.autoHiding:{
            opacity:0
        }
    }
    
    .myYBarClass{
        //blue horizontal bar
        backgroundColor: blue;
        
        &.autoShowing:{
            opacity: 1
        },
        &.autoHiding:{
            opacity:0
        }
    }
    
    .myXThumbClass{
        //green x thumb
        backgroundColor: green;
    }
    
    .myYThumbClass{
        //purple x thumb
        backgroundColor: purple;
    }
```
