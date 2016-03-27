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
  },
  create: function(todo){
    $.ajax({
      url: window.location.origin + "/api/todos",
      method: "POST",
      dataType: "JSON",
      data: todo,
      success: function (data) {
        _todos[data.id] = data;
        TodoStore.changed();
      },
      error: function (data) {
        console.log(data);
      }
    })
  },
  delete: function (id) {
    var that = this;
    if(_todos[id]){
      $.ajax({
        url: window.location.origin + "/api/todos/" + id,
        method: "DELETE",
        dataType: "text",
        success: function (id_string) {
          delete _todos[parseInt(id_string)];
          TodoStore.changed();
        },
        error: function (data) {
          console.log(data);
        }
      })
    }
  }
};

_callbacks = [];

_todos = {};
