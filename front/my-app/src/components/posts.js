import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import makeRequest from '../server'
import Posts from './literally_posts'

class App extends Component {

  state = {
    title: '',
    content: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('text', this.state.text);
    let url = 'http://localhost:8000/api/posts/';
    makeRequest('post', 'api/posts/', form_data, {
      'content-type': 'multipart/form-data'
    })
  };

  render() {
    return (
      <React.Fragment>
        <div className="posts">
          <form onSubmit={this.handleSubmit}>
            <p>
              <input type="text" placeholder='Text' id='text' value={this.state.text} onChange={this.handleChange} required/>
            </p>
            <p>
              <input type="file"
                    id="image"
                    accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
            </p>
            <input type="submit"/>
          </form>
          <Posts/>
        </div>
        
        </React.Fragment>
    );
  }
}

export default App;