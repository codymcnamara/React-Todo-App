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
          todo={this.props.todoItem}
          todosChanged={this.props.todosChanged}
        />
        {detailView}
      </div>
    );
  }
})

var TodoDetailView = React.createClass({
  handleDestroy: function () {
    TodoStore.addChangedHandler(this.props.todosChanged);
    TodoStore.delete(this.props.todo.id);
  },
  render: function () {
    return (
      <div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
})

var DoneButton = React.createClass({
  handleDone: function () {
    TodoStore.addChangedHandler(this.props.todosChanged);
    TodoStore.toggleDone(this.props.todo.id);
  },
  render: function () {
    var buttonText = this.props.todo.done ? "Undo" : "Done";

    return(<button onClick={this.handleDone}>{buttonText}</button>)
  }
})
