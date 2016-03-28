var TodoForm = React.createClass({
  getInitialState: function () {
    return ({title: "", body: ""});
  },
  updateTitle: function (event) {
    this.setState({title: event.target.value});
  },
  updateBody: function (event) {
    this.setState({body: event.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var todo = {
      "todos[title]":this.state.title,
      "todos[body]":this.state.body,
      "todos[done]":false
    }
    TodoStore.addChangedHandler(this.props.todosChanged);
    TodoStore.create(todo);
    this.setState({title: "", body: ""});
  },
  render: function () {
    return(
      <div>
        <h2>Create a new Todo</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.updateTitle}
          />
          <textarea
            value={this.state.body}
            onChange={this.updateBody}
          />
          <input type="submit" value="post"/>
        </form>
      </div>
    );
  }
})
