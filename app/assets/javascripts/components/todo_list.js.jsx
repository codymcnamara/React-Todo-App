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
      return <li key={todo.id}>{todo.title}</li>
    })

    return(
      <div>
        <ul>
          {titles}
        </ul>
      </div>
    );
  }
});
