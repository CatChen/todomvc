$(document).ready(function() {
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
    });

    /* on changing item's completion */
    $('.items').on('change', 'input[type=checkbox]', function(e) {
        var item = $(this).closest('.item');
        item.toggleClass('completed', $(this).checked);
        
        $('.number').text($('.item:not(.completed)').length);
    });

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
