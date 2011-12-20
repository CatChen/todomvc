$(document).ready(function() {
    $.mobile.ajaxEnabled = false;
    
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
    $('.items').listview('refresh');
    $("input[type='text']").textinput();
    
    /* on creating a new item */
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
        
        var todo = {
            title: title,
            completed: false
        };
        item.data('todo', todo);
        todos.push(todo)
        Store.save(todos);
        
        $('.items').listview('refresh');
        $("input[type='text']").textinput();
    });

    /* on changing item's completion */
    $('.items').on('change', 'input[type=checkbox]', function(e) {
        var item = $(this).closest('.item');
        item.toggleClass('completed', $(this).is(':checked'));
        
        $('.number').text($('.item:not(.completed)').length);
        
        item.data('todo').completed = $(this).is(':checked');
        Store.save(todos);
    });

    /* on touching item's completion checkbox */
    $('.items').on('touchend', 'input[type=checkbox]', function(e) {
        e.stopPropagation();
    });
    
    /* on switching to edit mode */
    $('.items').on('dblclick', '.view', function(e) {
        var item = $(this).closest('.item');
        item.addClass('editing');
        item.find('.edit input').focus();
    });

    /* on switching to edit mode */
    $('.items').on('touchend', '.item', function(e) {
        var item = $(this).closest('.item');
        item.addClass('editing');
        item.find('.edit input').focus();
    });

    /* on leaving edit mode by pressing enter key */
    $('.items').on('keypress', 'input[type=text]', function(e) {
        if (e.keyCode === 13) {
            /* when it's enter key */
			$(this).blur();
		}
    });

    /* on leaving edit mode by clicking elsewhere */
    $('.items').on('blur', 'input[type=text]', function(e) {
        var item = $(this).closest('.item');
        var title = $(this).val();
        item.removeClass('editing');
        item.find('.view').attr('title', title);
        item.find('.view span').text(title);
        
        item.data('todo').title = title;
        Store.save(todos);
    });

    /* on deleting an item */
    $('.items').on('click', '.delete', function(e) {
        var item = $(this).closest('.item');
        item.remove();
        
        $('.number').text($('.item:not(.completed)').length);
        
        todos.length = 0;
        $('.item').each(function(index, item) {
            todos.push($(item).data('todo'));
        });
        Store.save(todos);
        
        $('.items').listview('refresh');
    });

    /* on touching item's delete button */
    $('.items').on('touchend', '.delete', function(e) {
        e.stopPropagation();
    });
    
    /* on clearing completed items */
    $('.clear').on('click', function(e) {
        $('.item.completed').remove();
        
        todos.length = 0;
        $('.item').each(function(index, item) {
            todos.push($(item).data('todo'));
        });
        Store.save(todos);
        
        $('.items').listview('refresh');
    });    
});
