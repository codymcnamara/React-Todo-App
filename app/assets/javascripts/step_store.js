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
        _steps[data[0]["todo_id"]] = {};
        data.forEach(function (step) {
          _steps[step.todo_id][step.id] = step;
        });
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
  }

}

_steps = {};
