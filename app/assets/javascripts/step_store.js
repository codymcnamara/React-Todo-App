StepStore = {
  all: function (todo_id) {
    return _steps[todo_id];
  },
  fetch: function(todo_id) {
    $.ajax({
      url: window.location.origin + "/api/todos/" + todo_id.toString() + "/steps",
      method: "get",
      dataType: "json",
      success: function(data) {
        if (data.length > 0){
          _steps[data[0]["todo_id"]] = {};
          data.forEach(function (step) {
            _steps[step.todo_id][step.id] = step;
          });
        }
        TodoStore.changed();
      },
      error: function (data) {
        console.log(data);
      }
    })
  },
  create: function (step) {
    $.ajax({
      url: window.location.origin + "/api/steps",
      method: "post",
      dataType: "json",
      data: step,
      success: function (newStep) {
        if(!_steps[newStep.todo_id]){
          _steps[newStep.todo_id] = {};
        }
        _steps[newStep.todo_id][newStep.id] = newStep;
        TodoStore.changed();
      },
      error: function (data) {
        console.log(data);
      }
    })
  },
  destroy: function (step) {
    if(_steps[step.todo_id][step.id]){
      $.ajax({
        url: window.location.origin + "/api/steps/" + step.id,
        method: "DELETE",
        dataType: "json",
        success: function (ids) {
          delete _steps[ids.todo_id][ids.step_id];
          TodoStore.changed();
        },
        error: function (data) {
          console.log(data);
        }
      })
    }
  },
  toggleDone: function(step){
    if(_steps[step.todo_id][step.id]){
      var newDoneState = !_steps[step.todo_id][step.id]["done"];
      var toggleParams = {"steps[done]":newDoneState};
      $.ajax({
        url: window.location.origin + "/api/steps/" + step.id,
        method: "PATCH",
        dataType: "json",
        data: toggleParams,
        success: function (data) {
          _steps[data.todo_id][data.id]["done"] = data["done"];
          TodoStore.changed();
        },
        error: function (data) {
          console.log(data);
        }
      })
    }
  }

}

_steps = {};
