import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(e){
    this.setState({todo: e.target.value});
  }

  handleSubmit(e){ 
    e.preventDefault();
    if(!this.state.todo)
      return;

    const new_item = {
      todo: this.state.todo,
      id: Date.now()
    }

    this.setState(prevState => ({
      items : prevState.items.concat(new_item),
      todo: ''
    }))
  }

  handleRemove(id){
    //console.log(id);
    const remainder = this.state.items.filter((todo) => {
      if(todo.id !== id) return todo;
    });

    this.setState({items: remainder});
  }

  render() {
    let input;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo App ({this.state.items.length})</h1>
        </header>
        <div className="App-intro">
          <TodoList 
            items={this.state.items}
            remove={this.handleRemove}
            />
          <div>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                className="App-text"
                onChange={this.handleChange}
                value={this.state.todo}
                onKeyPress={(e) => {(e.key==='Enter')? this.handleSubmit:null}}
                placeholder="Type your todo here..."
              />
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}

class TodoList extends Component{
  render(){
    return (
      <div>
        <ul>
          {this.props.items.map(item => (
            <li onClick={()=>{this.props.remove(item.id)}}>{item.todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
