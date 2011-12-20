(function() {
    var Store = window.Store = function() {};
    
    Store.load = function() {
        var object = JSON.parse(localStorage.getItem('todos'));
        return object;
    };
    
    Store.save = function(object) {
        var json = JSON.stringify(object);
        localStorage.setItem('todos', json);
    };
})();
