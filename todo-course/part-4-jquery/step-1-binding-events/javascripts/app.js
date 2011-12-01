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
