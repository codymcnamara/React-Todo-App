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

      return <TodoListItem todoItem={todo} />
    })

    return(
      <div>
        {titles}
      </div>
    );
  }
});

var TodoListItem = React.createClass({
  render:function () {
    return (
      <div>
        <div>{this.props.todoItem.title}</div>
        <div>{this.props.todoItem.body}</div>
      </div>
    );
  }
})
