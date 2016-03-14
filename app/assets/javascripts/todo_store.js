// console.log("running todo_story.js");
TodoStore = {
  changed: function(){
    while( _callbacks.length > 0 ){
      _callbacks.shift()();
    }
  },
  // removeChangedHandler: function () {
  // },
  addChangedHandler: function (newCallback) {
    _callbacks.push(newCallback);
  },
  all: function(){
    console.log(_todos);
  },
  fetch: function(){
    $.ajax({
      url: window.location.origin + "/api/todos",
      method: "GET",
      dataType: "JSON",
      success: function(data){
        console.log("success!");
        console.log(data);
        data.forEach(function (todo) {
          _todos[todo.id] = todo;
        })
      },
      error: function (data) {
        console.log(data);
      }
    })
  }
};

_callbacks = [];

_todos = {};
