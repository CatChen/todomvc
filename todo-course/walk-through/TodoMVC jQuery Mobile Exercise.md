# TodoMVC jQuery Mobile Exercise

## Overview

In this exercise, we are going to upgrade our Todo App and make it compatible with mobile devices. We are going to use [jQuery Mobile](http://jquerymobile.com/) and [CSS3 Media Query](http://www.w3.org/TR/css3-mediaqueries/) in order to make this enhancement.

![mockup](https://img.skitch.com/20111220-f1p4x2h49q2e6swnr51ramf3yf.jpg)

The whole exercise is going to walk you through steps from adding viewport meta tag to handling touch events. If you get into a problem and can't figure out how to get a specific step done, feel free to read the [reference code](https://github.com/CatChen/todomvc/tree/courses/todo-course) on Github.

## Part 6: Get Ready for Mobile

_Please see TodoMVC jQuery Exercise for Part 1 to Part 5._

In this part, we are going to make the app look and feel like a native app on mobile device.

### Step 1: Mobile Viewport

The first thing we need to do is to make the app shown on mobile screen as 1:1, which means scale equals to 1. This can be handled by a `meta` tag with `name="viewport"`. Add the following line to the `head` tag.

    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1" />

After added this line, we can see the app won't be zoomed out by default. Even if you try to pinch by fingers, it won't zoom in or out.

![viewport set](https://img.skitch.com/20111221-txp83ykj5353g3xmunmja96ghf.jpg)

### Step 2: Choose Stylesheets by Media Query

We need to give a new look to the mobile version but we don't want to affect the original desktop version. We can link to different stylesheets in different scenarios by using Media Query. Replace the original `link` tag with the new ones.

    <link rel="stylesheet" media="only screen and (min-width: 481px)" href="stylesheets/app.css" />
    <link rel="stylesheet" media="only screen and (max-width: 480px)" href="stylesheets/mobile.css" />

In this case, when the app is shown on a screen wider than 480px it's treated as desktop version. Otherwise, it's treated as mobile version.

Most of the rules in the original stylesheet won't be necessary in the mobile version. We create mobile.css with only a few rules from the original stylesheet.

    #todoApp .item {
        position: relative;
    }
    
    #todoApp .item.completed span {
        color: #777777;
        text-decoration: line-through;
    }
    
    #todoApp .item .edit {
        display: none;
    }
    
    #todoApp .item.editing .view {
        display: none;
    }
    
    #todoApp .item.editing .edit {
        display: block;
    }
    
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
    
    #todoApp footer .button {
        float: right;
    }
    
    #todoApp .count {
        float: left;
    }
    
    #todoApp .count .number {
        font-weight: bold;
    }

Because jQuery Mobile comes with stylesheet, we can leave most of the styling job to it.

![mobile styled](https://img.skitch.com/20111221-j43h1bcuui89carxwmxdy18dpc.jpg)

### Step 3: Using jQuery Mobile

In order to use jQuery Mobile, we need to add its JavaScript and stylesheet files to our app and give them correct references.

    <link rel="stylesheet" media="only screen and (max-width: 480px)" href="stylesheets/jquery.mobile-1.0.css" />
    <script type="text/javascript" src="javascripts/jquery.mobile-1.0.js"></script>

Then we can let jQuery Mobile handle the style of the page. We don't use `class` in this case. Instead, we use `data-*` attributes. Add correct `data-*` attributes so the `body` content looks like the following snippet.

    <div id="todoApp" data-role="page">
        <div data-role="header">
            <h1>Todos</h1>
        </div>
        <div data-role="content">
            <form>
                <input type="text" placeholder="What needs to be done?" />
            </form>
            <ul class="items" data-role="listview" data-inset="true">
            </ul>
        </div>
        <footer data-role="footer" data-position="fixed">
            <div class="count"><span class="number">0</span> left</div>
            <a class="clear button" data-role="button">Clear completed</a>
        </footer>
    </div>

The whole app looks better now, but we still need to add some adjustment to the mobile stylesheet.

    #todoApp .item .button {
        top: 1px;
    }
    
    #todoApp footer .button {
        margin-right: 15px;
    }
    
    #todoApp .count {
        margin-left: 15px;
        line-height: 32px;
    }

The app looks more like what we want now, though we can notice that the list items aren't styled as jQuery Mobile list items because they are programmatically added to the list. We will get this fix in the next step.

### Step 4: Handling Touch Events

We add mobile.js to handle mobile related behaviors, then we add the reference in the page.

    <script type="text/javascript" src="javascripts/mobile.js"></script>

We need a pair of new methods named `setImmediate` and `clearImmediate`. Because they are not implemented by most of the browsers we need to add a simplified version of the implementation in JavaScript.

    var setImmediate = function(task) {
        return setTimeout(task, 0);
    };
    
    var clearImmediate = clearTimeout;

In jQuery Mobile's metaphor, `pageinit` event is the new `domready` event so we use its handler as the wrapper for all other event handlers.

    $(document).on('pageinit', '#todoApp', function(e) {
        $.mobile.ajaxEnabled = false;
    });

Since we don't want jQuery Mobile intercept our `form` behavior, we set `$.mobile.ajaxEnabled` to `false` so we can prevent the `submit` event's default behavior in the old way.

We need to refresh the jQuery Mobile widgets after certain events.

* All items are created after `domready` event.
* New item is created after `form`'s `submit` event.
* An item is deleted after delete button's `click` event.
* Several items are deleted after clear button's `click` event.

`setImmediate` is handy in these cases. We can use it to trigger our handlers right after the original event handlers are executed. All these handlers should be put into the `pageinit` event handler's wrapper.

    /* after todo list recreated from storage */
    $(document).ready(function() {
        setImmediate(function() {
            $('.items').listview('refresh');
            $("input[type='text']").textinput();    
        });
    });
    
    /* after created a new item */
    $('form').on('submit', function(e) {
        setImmediate(function() {
            $('.items').listview('refresh');
            $("input[type='text']").textinput();    
        });
    });
    
    /* after deleted an item */
    $('.items').on('click', '.delete', function(e) {
        setImmediate(function() {
            $('.items').listview('refresh');
        });
    });
    
    /* after cleared completed items */
    $('.clear').on('click', function(e) {
        setImmediate(function() {
            $('.items').listview('refresh');
        });
    });

Because double click is not something we would do on a mobile device, we need to create a more mobile friendly interaction for switching into edit mode. We use single touch in this case and we listen to `touchend` events. When we scroll the page it also triggers `touched` event, so we only want to capture `touchend` event without a previously `touchmove` event.

    var touchMoved;
    
    $(document).on('touchstart', function(e) {
        touchMoved = false;
    });
    
    $(document).on('touchmove', function(e) {
        touchMoved = true;
    });
    
    /* on switching to edit mode */
    $('.items').on('touchend', '.item', function(e) {
        if (!touchMoved) {
            var item = $(this).closest('.item');
            item.addClass('editing');
            setImmediate(function() {
                item.find('.edit input').focus();
            });
        }
    });

When we touch the checkbox or the delete button, we also trigger the `touchend` event. That's not what we want so we need to disable it for interfering our `change` and `click` events on these elements.

    /* on touching item's completion checkbox */
    $('.items').on('touchend', 'input[type=checkbox]', function(e) {
        e.stopPropagation();
    });
    
    /* on touching item's delete button */
    $('.items').on('touchend', '.delete', function(e) {
        e.stopPropagation();
    });

One more thing. We still have one minor tweak to the stylesheet.

    #todoApp .item .button {
        top: 9px;
    }

Now the app should look exactly the same as expect and it behaves like a native touchable app.

## Conclusion

When finishing this exercise, we have learned how to migrate an existing app into a mobile app. For more complicated apps, [jQuery Mobile docs](http://jquerymobile.com/demos/1.0/) could help you a lot.

If you are unsure about whether you have done a specific step in a correct way, you can always read the [reference code](https://github.com/CatChen/todomvc/tree/courses/todo-course) and compare it to yours.