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
    return _todos;
  },
  fetch: function(){
    $.ajax({
      url: window.location.origin + "/api/todos",
      method: "GET",
      dataType: "JSON",
      success: function(data){
        data.forEach(function (todo) {
          _todos[todo.id] = todo;
        });
        TodoStore.changed();
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
  },
  toggleDone: function(id){
    if(_todos[id]){
      var newDoneState = !_todos[id]["done"];
      var toggleParams = {"todos[done]":newDoneState};
      $.ajax({
        url: window.location.origin + "/api/todos/" + id,
        method: "PATCH",
        dataType: "json",
        data: toggleParams,
        success: function (data) {
          _todos[data.id]["done"] = data["done"];
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
