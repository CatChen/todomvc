var setImmediate = function(task) {
    return setTimeout(task, 0);
};

var clearImmediate = clearTimeout;

$(document).on('pageinit', '#todoApp', function(e) {
    $.mobile.ajaxEnabled = false;
    
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

    /* on touching item's completion checkbox */
    $('.items').on('touchend', 'input[type=checkbox]', function(e) {
        e.stopPropagation();
    });
    
    /* on touching item's delete button */
    $('.items').on('touchend', '.delete', function(e) {
        e.stopPropagation();
    });
});