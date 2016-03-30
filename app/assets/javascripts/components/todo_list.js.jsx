var TodoList = React.createClass({
  getInitialState: function () {
    return ({allTodos: TodoStore.all()})
  },
  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },
  componentWillUnmount: function () {
    // ?
  },
  todosChanged: function () {
    this.setState ({allTodos: TodoStore.all()});
  },
  render: function () {
    var that = this;
    var titles = Object.keys(this.state.allTodos).map(function (key) {
      var todo = that.state.allTodos[key];
      return <TodoListItem key={key} todoItem={todo} todosChanged={that.todosChanged}/>
    })

    return(
      <div>
        {titles}
        <TodoForm todosChanged={this.todosChanged}/>
      </div>
    );
  }
});

var TodoListItem = React.createClass({
  getInitialState:function () {
    return ({displayDetail: false});
  },
  toggleDetailDisplay: function () {
    this.setState({displayDetail: !this.state.displayDetail});
  },
  render:function () {
    if (this.state.displayDetail) {
      var detailView = <TodoDetailView
        todo={this.props.todoItem}
        todosChanged={this.props.todosChanged}
        displayDetail={this.state.displayDetail}
      />
    } else {
      var detailView = <div></div>
    }

    return (
      <div className="todo">
        <div className="todo_title" onClick={this.toggleDetailDisplay}>
          {this.props.todoItem.title}
        </div>
        <DoneButton
          item={this.props.todoItem}
          collectionChanged={this.props.todosChanged}
        />
        {detailView}
      </div>
    );
  }
})

var TodoDetailView = React.createClass({
  getInitialState: function () {
    if (StepStore.all(this.props.todo.id)){
      var intialStateSteps = StepStore.all(this.props.todo.id);
    }else{
      var intialStateSteps ={};
    }
    return ({allSteps: intialStateSteps})
  },
  handleDestroy: function () {
    TodoStore.addChangedHandler(this.props.todosChanged);
    TodoStore.delete(this.props.todo.id);
  },
  componentDidMount: function () {
    TodoStore.addChangedHandler(this.stepsChanged);
    StepStore.fetch(this.props.todo.id);
  },
  stepsChanged: function () {
    if(StepStore.all(this.props.todo.id)){
      this.setState ({allSteps: StepStore.all(this.props.todo.id)})
    }
  },
  render: function () {
    var that = this;
    var stepComponents = Object.keys(this.state.allSteps).map(function (id) {
      var step = that.state.allSteps[id];
      return <Step step={step} stepsChanged={that.stepsChanged} key={step.id}/>
    });

    return (
      <div>
        <div>{this.props.todo.body}</div>
        <h4>Steps:</h4>
        <ol>
          {stepComponents}
        </ol>
        <StepForm
          todoid={this.props.todo.id}
          stepsChanged={this.stepsChanged}
        />
        <button onClick={this.handleDestroy}>Delete Todo</button>
      </div>
    );
  }
})

var DoneButton = React.createClass({
  handleDone: function () {
    TodoStore.addChangedHandler(this.props.collectionChanged);
    if(this.props.item.todo_id){
      StepStore.toggleDone(this.props.item);
    } else {
      TodoStore.toggleDone(this.props.item.id);
    }
  },
  render: function () {
    var buttonText = this.props.item.done ? "Undo" : "Done";

    return(<button onClick={this.handleDone}>{buttonText}</button>)
  }
})

var Step = React.createClass({
  render: function () {
    return(
      <li >
        {this.props.step.body}
        <DoneButton
          item={this.props.step}
          collectionChanged={this.props.stepsChanged}
        />
      </li>
    );
  }
})


var StepForm = React.createClass({
  getInitialState: function () {
    return({body: ""})
  },
  updateBody: function (e) {
    this.setState({body: e.target.value})
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var stepParams = {
      "steps[done]": false,
      "steps[body]": this.state.body,
      "steps[todo_id]": this.props.todoid
    }
    TodoStore.addChangedHandler(this.props.stepsChanged);
    StepStore.create(stepParams);
    this.setState({body: ""});
  },
  render: function () {

    return(
      <div>
        <div>Create a new Step: </div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.body}
            placeholder="type step here"
            onChange={this.updateBody}
          />
          <input type="submit" value="Create Step"/>
        </form>
      </div>
    );

  }
})
