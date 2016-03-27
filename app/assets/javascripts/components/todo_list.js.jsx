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
  handleDestroy: function () {
    TodoStore.addChangedHandler(this.props.todosChanged);
    TodoStore.delete(this.props.todoItem.id);
  },
  render:function () {
    return (
      <div className="todo">
        <div className="todo_title">{this.props.todoItem.title} </div>
        <div>{this.props.todoItem.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
})
