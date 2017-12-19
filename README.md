# React SB3

## Component PropTypes

### Styling Properties

| Property | Description | Kind | Default |
| --- | --- | --- | --- |
| autoHide | Enables the autoHiding function for the scrollbars | Bool | False  |
| showX | Enables the Horizontal scrollbar | Bool | true |
| showY | Enables the Vertical scrollbar | Bool | true |
| flashTime | Indicates the time ( in microseconds ) the scrollbars will be visible after a scroll movement, before auto hiding. **Needs autohide enabled** | Number | 500 |
| InitialFlashTime | The time ( in microseconds ) the scrollbars will be visible after mount, to indicate the existence of scrollbars | Number | 0 |
| initialFlashDelay | Indicates the time ( in microseconds ) before the autoFlash starts | Number | 0 |
| thumbMinSize | The minimum size ( in pixels ) of both thumbs | Number | 30 |
| elementClasses | The css classes to be passed to internal elements **See element Classes for details** | Object | {} |

### Events

| EventName | Description |
| --- | --- |
| onScrollStart | When scrolling process starts |
| onScrollEnd | When scrolling process ends |
| onScroll | When scrolling |
| onScrollFrame | When scrolling inside animation frame process |
| onTopReached | When top position is reached, won't trigger initially |
| OnLeftReached | When left position is reached, won't trigger initially |
| OnBottomReached | When bottom position is reached |
| OnRightReached | When right position is reached |

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

___

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
