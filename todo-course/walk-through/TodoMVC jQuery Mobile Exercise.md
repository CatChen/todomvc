# TodoMVC jQuery Mobile Exercise

## Overview

In this exercise, we are going to upgrade our Todo App and make it compatible with mobile devices. a Todo App with [jQuery](http://jquery.com/) and [HTML5 Local Storage](http://dev.w3.org/html5/webstorage/). The app we are going to build should look the same as [TodoMVC](http://addyosmani.github.com/todomvc/), as shown below.

![mockup](https://img.skitch.com/20111202-ucuwwmqmxckwnyine2amsq246.jpg)

The whole exercise is going to walk you through steps from creating static page with HTML to styling it with CS, from adding interaction with jQuery to storing data with Local Storage. If you get into a problem and can't figure out how to get a specific step done, feel free to read the [reference code](https://github.com/CatChen/todomvc/tree/courses/todo-course) on Github.

## Part 1: HTML Markup

Before building an interactive web app, we need to build a static web page that looks exactly the same as the mockup. The very first step we need to take is analyze the content on the mockup and write meaningful markup represents it.

### Step 1: Layout

As we can see, the mockup can be vertically divided into 4 sections: the header, the text field for creating new todo, the list of todos, and the footer with status and a button. Thus we can divide the web page into 4 sections.

    <div id="todoApp">
       <h1>Todos</h1>
       <form>
           <!-- text input here -->
       </form>
       <ul class="items">
           <!-- list items here -->
       </ul>
       <footer>
           <!-- status and clear button here -->
       </footer>
    </div>

We use `h1` for the top level heading. A `form` is needed to wrap the text field. We use `ul` (unordered list) to hold todo items because the todo list is essentially a list and it's unordered. Finally we use a `footer` as the container for the status and a button. If you preview the page in a browser, you will see nothing except the header.

### Step 2: Details

We are going to fill the layout with content from the mockup. Because the header needs nothing more, we start with the text field within the `form`. Adding a `input type="text"` should be enough.

    <input type="text" />

In order to construct items within a list, we need to put `li` (list item) within the `ul`. In every `li`, we use one `input type="checkbox"` to represent the checkbox on the left and one `span` to wrap the title of the item.

    <ul class="items">
        <li class="item">
            <input type="checkbox" />
            <span>Build Sammy.js application</span>
        </li>
        <li class="item">
            <input type="checkbox" />
            <span>Test SproutCore Todo app</span>
        </li>
        <li class="item completed">
            <input type="checkbox" checked="checked" />
            <span>Testing</span>
        </li>
        <li class="item">
            <input type="checkbox" />
            <span>Review best-practices</span>
        </li>
    </ul>

The footer contains the status and a button. We can simply use `div` and `span` to construct the status and use `a` for a button.

    <div class="count"><span class="number">3</span> left</div>
    <a clear="clear button">Clear completed</a>

After filling the layout with content, the markup is finished. Without any styling, it should look like this in a browser.

![markup](https://img.skitch.com/20111202-nrq8teaup64uhgdqre72bf8jwc.jpg)

This is what we call naked HTML page. There is no styling and the browser renders everything with its default style. In the next part, we are going to turn this into neat page looks exactly like the mockup.

## Part 2: Styling with CSS

As long as the page is written in meaningful markup, styling the page should be easy. In order to make sure that styling rules are manageable, we create a CSS file instead of writing rules within the markup. Then we need to reference the CSS file from the page. Insert this line into the `head` section of HTML.

    <link rel="stylesheet" href="stylesheets/app.css" />

### Step 1: Setup the Page

Before styling the the app,  we need to reset the page's default style.

    html, body {
        margin: 0;
        padding: 0;
    }

We also need to set a few basic rules that applies to the app everywhere.

    body {
        font-family: "Helvetica Neue", helvetica, arial, sans-serif;
        font-size: 14px;
        line-height: 1.4em;
        background: #eeeeee;
        color: #333333;
    }

After setting up the page, it should have the correct background color and font family.

![page set up](https://img.skitch.com/20111203-nj4eb38bi4y15b29k4m8kuysdi.jpg)

### Step 2: Frame the App

As seen in the mockup, the app is framed by a rounded corner box with shadow and positioned in the center of the page horizontally. We need to add a set of rules to the `#todoApp` in order to achieve the same result.

    #todoApp {
        width: 480px;
        padding: 20px;
        margin: 0 auto 40px;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
        border-radius: 0 0 5px 5px;
    }

We set left and right `margin` to `auto` and browser will put the app in the horizon center of the page. Then we use CSS3 properties `box-shadow` and `border-radius` to make the frame look clear. We also use `padding` to leave white space between the frame and the content.

![framed app](https://img.skitch.com/20111203-b3jeph5ny79h93puid35fefe37.jpg)

### Step 3: Title and Form

We need to put the title in the center and make it look larger and bolder. This can be done with a few lines of CSS.

    #todoApp h1 {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        padding: 0 0 10px 0;
    }

We also need to set the text field with correct dimensions and font. Also a little shadow within the border.

    #todoApp input[type="text"] {
        width: 466px;
        font-size: 24px;
        font-family: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        padding: 6px;
        border: 1px solid #999999;
        box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    }

![styled title and input](https://img.skitch.com/20111204-bktq9rc54r5hyh45qp2be5b4n9.jpg)

### Step 4: List and Items

Browser has some default styling rules for unordered list and we need to reset that just like we reset the page.

    #todoApp .items {
        margin: 10px 0;
        padding: 0;
        list-style: none;
    }

Then we need to set the right dimensions and font-size for the items. We also need to set `text-decoration` to `line-through` for completed items.

    #todoApp .item {
        padding: 15px 20px 15px 0;
        font-size: 24px;
        border-bottom: 1px solid #cccccc;
    }
    
    #todoApp .item.completed span {
        color: #777777;
        text-decoration: line-through;
    }

![styled list and items](https://img.skitch.com/20111205-1qawhwakats9kxyub9g3t8xe26.jpg)

### Step 5: Footer

The last section we need to touch is footer. It has rounded corner and we can handle this with CSS3 property `border-radius`. The real problem is the app has a `padding` of `20px` so the footer is shrunk. We can fix this by applying negative `margin` to the footer.

    #todoApp footer {
        margin: 20px -20px -20px -20px;
        overflow: hidden;
        color: #555555;
        background: #f4fce8;
        border-top: 1px solid #ededed;
        padding: 0 20px;
        line-height: 36px;
        border-radius: 0 0 5px 5px;
    }

Then we need to place the state and button in the right position. The `float` property can just do that. In order make the button act like a button when user moves mouse cursor on it, we set the `cursor` property to `pointer`.

    #todoApp footer .button {
        float: right;
        line-height: 20px;
        text-decoration: none;
        background: rgba(0, 0, 0, 0.1);
        color: #555555;
        font-size: 11px;
        margin-top: 8px;
        margin-bottom:8px;
        padding: 0 10px 1px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0; 
        cursor: pointer;
    }
    
    #todoApp .count {
        float: left;
    }
    
    #todoApp .count .number {
        font-weight: bold;
    }

Now our styled app looks the same as the mockup!

![styled footer](https://img.skitch.com/20111205-rrtqd5iu8d5trhqq3dps8gewke.jpg)

After building a static page, we can now move on to adding interaction.

## Part 3: Preparing for the Interaction

Before getting into JavaScript, we still need to do a few things to prepare the page for interaction. The page has everything needed to be shown as a static page, but lacks of elements that needed to used in interaction. We need to add these elements to the markup and also give them styles.

By the way, we can also add small interaction without JavaScript. Here is an example: by replacing the original `input type="text"` with this new line, the text field will show a place holder when it's empty.

    <input type="text" placeholder="What needs to be done?" />

### Step 1: Markup for Edit Mode

The first thing we notice is that the static page lacks of edit mode for existing items. We do this by wrapping the item content with one `div` and add anothe sibling `div` to contain text field for edit mode.

For the first item, it was like this.

    <li class="item">
        <input type="checkbox" />
        <span>Build Sammy.js application</span>
    </li>

We need to replace it with this.

    <li class="item">
        <div class="view" title="Double click to edit...">
            <input type="checkbox" />
            <span>Build Sammy.js application</span>
            <a class="delete button">delete</a>
        </div>
        <div class="edit">
            <input type="text" value="Build Sammy.js application" />
        </div>
    </li>

Please notice that we also added the markup for the delete button.

We need to make the same change to all the other items. After that, we can preview it in the browser.

![added edit mode](https://img.skitch.com/20111205-1q6b5t53ftmhmyhxy4gem1jh3a.jpg)

We already know what comes after the markup. Now we can move back to the CSS file.

### Step 2: Styling Edit Mode

Styling the edit mode is easy. We don't need to touch the text field because we've defined text field style at the beginning when we styling the app. We only need to enable switch between view mode and edit mode. This is achieved by using a `class` to control the `display` property and switch its value back and forth between `block` and `none`.

    #todoApp .item .edit {
        display: none;
    }
    
    #todoApp .item.editing .view {
        display: none;
    }
    
    #todoApp .item.editing .edit {
        display: block;
    }

After added this piece of code, only items with a `class` named `editing` will show edit mode. To demonstrate this, we add `class="editing"` to the last item.

![styled edit mode](https://img.skitch.com/20111205-8ud6raxejyd1emgydyec16jsa5.jpg)

There is one thing that doesn't look right in the page - the delete button. It should look like a rounded button with a cross in it.

### Step 3: Styling Delete Button

In order to place the delete button to the right of the item, we need to use `position: absolute`. That means we need to add `position: relative` to a proper ancestor of the delete button element. We can use the item element in this case. Add this line to the existed `#todoApp .item` rules.

    position: relative;

Now we can give the button correct position, dimensions, and color.

    #todoApp .item .button {
        text-indent: -9999px;
        position: absolute;
        right: 10px;
        top: 16px;
        width: 20px;
        height: 20px;
        background-color: #cccccc;
        border-radius: 10px 10px 10px 10px;
        cursor: pointer;
    }

How about the cross sign in it? We could use a picture, but we could also just use CSS. By using CSS3 `transform` property, we can draw 2 lines with 2 elements and rotate them to form a cross. By using pseudo-element `::before` and `::after`, we don't even need to add 2 extra elements to the markup.

    #todoApp .item .button::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        left: 5px;
        top: 9px;
        background-color: #ffffff;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
    }
    
    #todoApp .item .button::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        left: 5px;
        top: 9px;
        background-color: #ffffff;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
    }

Refresh the page in the browser and we will see delete buttons look like image quality.

![styled delete button](https://img.skitch.com/20111205-bjc1yegxrhwq52cc8cn8mh8ei2.jpg)

### Step 4: Styling Button States

To make the buttons act more like buttons, we can give them a little interaction without using any JavaScript. Just CSS.

First, the delete button shouldn't be there all the time. It should be shown only when the mouse cursor is hovering over it. We add this line to `#todoApp .item .button` in order to hide it.

    display: none;
 
Then we use the `:hover` pseudo-class to show it.
 
    #todoApp .item:hover .button {
        display: block;
    }
 
Second, we can add a little visual change to a button when it's hovered or clicked by the mouse. Adding `:hover` and `:active` pseudo-class to all the buttons is all we need.

    #todoApp .item .button:hover {
        background-color: #333333;
    }
    
    #todoApp .item .button:active {
        right: 9px;
        top: 17px;
    }
    
    #todoApp footer .button:hover {
        background: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
    }
    
    #todoApp footer .button:active {
        position: relative;
        top: 1px;
    }

The preview doesn't change a lot. What matters is when we move the mouse cursor in the page.

![styled button states](https://img.skitch.com/20111205-xnjt6tnfswepadxss4t6qxxwbw.jpg)

## Part 4: Interaction powered by jQuery

We finally get to the part that we need to use JavaScript. In order to make JavaScript easy for us, we use jQuery. The very first thing we need to do is reference jQuery and our own JavaScript file in the markup.

    <script type="text/javascript" src="javascripts/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="javascripts/app.js"></script>

We also need to remove all the place holder in the markup. That means deleting all items within the `ul` and also reset the number in `span class="number"` to `0`. Then we can start writing program within that `app.js`.

### Step 1: Binding Events

Every interaction has a beginning and an end. The beginning should be triggered by an event. That's why we define interaction by defining the event that triggers the interaction. Look at the page and we can make a list of all interaction we need.

* Creating an item when user pressing enter key in the text field.
* Changing an item's completion when user clicking on the check box.
* Switching to edit mode when user double clicking on an item.
* Leaving edit mode when user pressing enter key in edit mode text field or clicking any where outside of the text field.
* Deleting an item when user clicking the delete button
* Clearing completed items when user clicking the clear button

We can translate this list into jQuery event binding operations as below.

    $(document).ready(function() {
        /* on creating a new item */
        $('form').on('submit', function(e) {});
    
        /* on changing item's completion */
        $('.items').on('change', 'input[type=checkbox]', function(e) {});
    
        /* on switching to edit mode */
        $('.items').on('dblclick', '.view', function(e) {});
    
        /* on leaving edit mode by pressing enter key */
        $('.items').on('keypress', 'input[type=text]', function(e) {});
    
        /* on leaving edit mode by clicking elsewhere */
        $('.items').on('blur', 'input[type=text]', function(e) {});
    
        /* on deleting an item */
        $('.items').on('click', '.delete', function(e) {});
    
        /* on clearing completed items */
        $('.clear').on('click', function(e) {});    
    });

Because leaving edit mode has 2 triggers, we bind 2 events for it. We leave the event handlers empty by now. We will define the details of every interaction later.

We put all the event binding work inside the `ready` event, because only when the page is ready can we access all the elements in it.

### Step 2: On Creating Item

The `submit` event of the `form` will be triggered when user pressing enter in the text field. The first thing we need to do is cancel the submission or the page will be refreshed. Then get the text field in the form and retrieve the new item's title from it by calling `$(this).find('input').val()`. `this` is what the event is bound to. In this case it's the `form`. We `find` the only `input` (text field) in it, and use `val` to retrieve its value. Then we can create the markup of the new item and append it to the unordered list (`ul class="items"`). Don't forget to clear the text field and update the status.

    $('form').on('submit', function(e) {
        e.preventDefault();

        var title = $(this).find('input').val();

        if (!title) {
            /* when user hitting enter with empty input */
            return;
        }

        $(this).find('input').val('');

        var item = $('<li class="item"><div class="view"><input type="checkbox" /><span></span><a class="delete button">delete</a></div><div class="edit"><input type="text" /></div></li>');
        item.find('.view').attr('title', title);
        item.find('.view span').text(title);
        item.find('.edit input').val(title);

        $('.items').append(item);
        
        $('.number').text($('.item:not(.completed)').length);
    });

### Step 3: On Completion Changing

The `change` event on the check box (`input type="checkbox"`) will be triggered whenever user clicking on it. All we need to do is toggle the `class` attribute of the item so completed item will be rendered as crossed with a line. Again, don't forget to update the status.

    $('.items').on('change', 'input[type=checkbox]', function(e) {
        var item = $(this).closest('.item');
        item.toggleClass('completed', $(this).is(':checked'));
        
        $('.number').text($('.item:not(.completed)').length);
    });

### Step 4: On Switching Between Modes

There are 3 events we need to handle in order to make switching between modes correct. 1 for switching from view mode to edit mode and 2 for switching back. The technique we use here is similar to what we have seen.

    $('.items').on('dblclick', '.view', function(e) {
        var item = $(this).closest('.item');
        item.addClass('editing');
        item.find('.edit input').focus();
    });

In order to determine if the pressed key is enter, we need to test `keyCode` property of the event object and see if it equals to 13. If it's `true`, we call the `blur` method to trigger `blur` event.

    $('.items').on('keypress', 'input[type=text]', function(e) {
        if (e.keyCode === 13) {
            /* when it's enter key */
			$(this).blur();
		}
    });

We handle the switching from edit mode to view mode so we don't have to write this twice. What's new here is that `attr` method can change the attribute of elements.

    $('.items').on('blur', 'input[type=text]', function(e) {
        var item = $(this).closest('.item');
        var title = $(this).val();
        item.removeClass('editing');
        item.find('.view').attr('title', title);
        item.find('.view span').text(title);
    });

### Step 5: On Deleting Item

When the delete button is `click`ed, remove the item by calling a method also named `remove`. 

    $('.items').on('click', '.delete', function(e) {
        var item = $(this).closest('.item');
        item.remove();
        
        $('.number').text($('.item:not(.completed)').length);
    });

### Step 6: On Clearing Completed Items

When the clear button is `click`ed, remove all the items marked as completed by a `class` named `completed`

    $('.clear').on('click', function(e) {
        $('.item.completed').remove();
    });

After all the events are bound and implemented, the page operates as expected, except for the fact that we lose everything when we refresh the page. That's what we are going to solve in the next part of the exercise.

## Part 5: Storing Data at the Local

HTML5 Local Storage (`localStorage`) can help us with storing large chunk of data, as long as it's stored as a `String`. The todo list we want to save should be an `Object`, however we can convert it into a `String` and get it back later via `JSON` methods.

### Step 1: Designing Module Interface

Instead of accessing `localStorage` directly from the event handlers, we should build a module dedicated to storage management. This module should have simple interface so event handlers don't need to know how the data is stored. This module should also have its own file, so we create a new JavaScript file and add the reference to the page.

    <script type="text/javascript" src="javascripts/store.js"></script>

Having the file created, we can sketch the module's interface in it.

    (function() {
        var Store = window.Store = function() {};
        
        Store.load = function() {};
        
        Store.save = function(object) {};
    })();

### Step 2: Module Implementation

Since `localStorage` has already had an elegant interface, we only need to bridge `Object` storage to `String` storage by calling `JSON` methods.

    Store.load = function() {
        var object = JSON.parse(localStorage.getItem('todos'));
        return object;
    };
    
    Store.save = function(object) {
        var json = JSON.stringify(object);
        localStorage.setItem('todos', json);
    };

### Step 3: Integration with Existing Code

The step is to integrate the storage into existing event handlers. This might be the most complicated step in this exercise. If not handled carefully, we might introduce bugs into our app.

First, right after the `ready` event is triggered, we need to reconstruct the todo list the user previously saved.

    var todos = Store.load() || [];
    $.each(todos, function(index, todo) {
        var item = $('<li class="item"><div class="view"><input type="checkbox" /><span></span><a class="delete button">delete</a></div><div class="edit"><input type="text" /></div></li>');
        item.toggleClass('completed', todo.completed);
        item.find('.view').attr('title', todo.title);
        item.find('.view input').attr('checked', todo.completed);
        item.find('.view span').text(todo.title);
        item.find('.edit input').val(todo.title);
        item.data('todo', todo);

        $('.items').append(item);
        
        $('.number').text($('.item:not(.completed)').length);
    });

We try to retrieve `todos` from the `Store` by calling the `load` method. If it returns nothing, we can assume that it's the first time the app is run so the `todos` should be an empty `Array` (`[]`). If we successfully retrieve an `Array` of `todos` from the `Store`, we construct the markup and `append` them to the list (`ul`).

We should notice that the `data` method can save any `Object` to a space associated with the element. We do this because we want easy access to the `todo` `Object` from the element.

Then we need to append a few pieces of code to existing event handler to update what's in the `Store`.

In the `form`'s `submit` event, we need to create an `Object` representing the todo we are creating and push it into the `todos` `Array`.

    var todo = {
        title: title,
        completed: false
    };
    item.data('todo', todo);
    todos.push(todo)
    Store.save(todos);

In `.items`' `change` event, we need to change the `completed` property on the `todo` object as well.

    item.data('todo').completed = $(this).is(':checked');
    Store.save(todos);

In `.items`' `blur` event, we need to update the `title` property on the `todo` object as well.

    item.data('todo').title = title;
    Store.save(todos);

In the `.delete` button's `click` event within the `.items`, we need to remove the `todo` from the `todos` `Array`. Instead of finding which `todo` is the right one to be removed, which is a complecated work, we clear the `todo` `Array` by setting its `length` property to `0` and push the rest of the `todo`s back to it.

    todos.length = 0;
    $('.item').each(function(index, item) {
        todos.push($(item).data('todo'));
    });
    Store.save(todos);

In the `.clear` button's `click` event, we need to remove all the `todo`s with `completed` property equals to `true`. We use the same trick again to achieve this.

    todos.length = 0;
    $('.item').each(function(index, item) {
        todos.push($(item).data('todo'));
    });
    Store.save(todos);

By now, our storage module is linked to the event handler and refreshing the page won't make as lose anything again.

## Conclusion

When finishing this exercise, we have learned how to make one simple but useful web app with modern web technology. Starting from this point, you should feel comfortable enough to build more challenging web apps. When needed, look up reference online like [jQuery API](http://api.jquery.com/).

If you are unsure about whether you have done a specific step in a correct way, you can always read the [reference code](https://github.com/CatChen/todomvc/tree/courses/todo-course) and compare it to yours.