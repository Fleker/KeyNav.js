KeyNav.js
=========

A Light Keyboard Navigation Library

*Note: This library is meant to work with jQuery*

Keyboard navigation, although simple on many platforms, continues to elude web users. Although some custom code can be attempted, this library is meant to act as a simple way to get started.

By keyboard navigation, I mean being able to navigate a page using a DPAD (up, down, left, and right keys). Perhaps your app uses a tile system, or you want to add power user features. 

## API
You can have as many different keyboard navigation 'sets' as you want on a page. Your user can navigate seamlessly between items within a given 'set'. Application code is used to switch sets. That may be either from an event, or whatever else you want. When a set is switched, users navigate through a different set of items.

### HTML Markup
This system works great with any type of HTML. You just need to set a few custom attributes. 

Let's say you're creating a grid users can navigate through. Each grid is a div element with other HTML nested inside. For that top level div, we apply the following attributes:
`data-focus-set` - This is the id of the given set
`data-focus-row` - This is the row of this element
`data-focus-col` - This is the column of this element

When a given element is navigated to, the class `keyboard-focus` is enabled. You can customize the design of the navigation by applying a style:

    div .keyboard-focus {
       border: solid 1px blue;
    }

Then, users know which item is currently in focus.

This class is removed when a different item is navigated to.

### Item Trigger
The `ENTER key` can be used to select a given item. Perhaps each item in the grid leads you to a different action. When the user selects a given item, something happens. Pressing the enter key triggers a `keyboard-enetr` event for the given element. So, to do a certain action:

    $('div').on('keyboard-enter', function() {
        var r = $(this).attr('data-focus-row');
        var c = $(this).attr('data-focus-col');
        console.log("Item "+row+" x "+c+" was clicked");
    });
  
### Overflow Trigger
Let's say you have a lefthand menu. When the user gets all the way to the left, you want to open this menu. When the user tries to go beyond the bounds of a given set, a `leftCol` event is triggered with a parameter of the current row. Additionally, a `rightCol` event may be triggered on the other side.

The same applies vertically, the events `leftRow` and `rightRow` are triggered if you go beyond the respective boundary. In these cases, a column parameter is included.

### Manual Control
A lot of these things can be controlled programatically. The variable `KeyNav` is a global variable that contains these methods and methods:

#### Variables

* `focusset` - The current set
* `row` 
* `col`

#### Methods

* `changeFocus(set)` - Moves to a set with the provided name
* `moveUp(delta)` - Moves upward by a specified amount
* `moveDown(delta)` - Moves downward by a specified amounnt
* `moveLeft(delta)` - Moves left by a specified amount
* `moveRight(delta)` - Moves right by a specified amount
* `getFocus()` - Returns the currently focused set
* `getRow()` - Returns the current row
* `getCol()` - Returns the current column
* `exists(set, row, col)` - Checks whether or not the given item exists
* `getElement(set, row, col)` - Returns a given item
* `currElement()` - Returns the currently focused item
