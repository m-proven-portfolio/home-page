import React from 'react';
import axios from 'axios';

import './App.css';

// import logo from './logo.svg';


class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data })
        console.log('Data has been received.');        
      })
      .catch(() => {
        alert('Server error.');
      });
  };


  handleChange = ({target}) => {
    const { name, value} = target;
        // old code changed due to above ^ target was event
    // const target = event.target;
    // const name = target.name;
    // const value = target.value;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const payLoad = {
      title: this.state.title,
      body: this.state.body
    };


    axios({
      url: '/api/save',
      method: 'POST',
      data: payLoad
    })
      .then(() => {
        console.log('Data has been sent.');
        this.resetUserInputs();
        this.getBlogPost();
        
      })
      .catch(() => {
        console.log('Server error.');

      });

  };


  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });

  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post_display"> 
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };


  render() {

    console.log('State: ', this.state)
    //JSX
    return(
      <div className="App">
        <h2>Welcome to the M.Proven.Portfolio<br />created by: Mike Provenzano</h2>

        <p>I built this website to practice and show my works, I initially used this <a href="https://youtube.com/playlist?list=PLurIMwd6GdCj_VlnKVceR66Sxfcb37VU8" target="_blank" >video serries</a> to develop it, 
          but I will be adding and replacing code form it to further develop the data base and other assets of the site.</p>

        <h2>Mike the ESL teacher:</h2>

        <p>If you are here, then you are most likely one of my students, the tools I have made for you can be found in this <a href="#" target="_self" >LINK</a>.</p>

        <h2>Mike the Developer/Hobbyist:</h2>

        <p>Below is the form used to make this project, but this <a href="#" target="_self" >LINK</a> will take you to an index of other projects I have been making,
          be sure to also check out the ESL apps I've made for my students. Thank you for your interest and I look forward to collaborating with you or your company.</p>

        <form id="Blog-Posts" action="#" method="POST" target="_self" onSubmit={this.submit}>
          <div className="form-input">
            <label for="title" id="title-label">Title: </label><br/>
            <input type="text" 
            id="title" 
            name="title" 
            value={this.state.title} 
            onChange={this.handleChange} 
            placeholder="Type your main idea here." 
            required/><br/>
          </div>
          <div className="form-input">            
            <label for="body" id="body-label">What do you have to say?</label><br/>
            <textarea 
            id="body" 
            name="body" 
            rows="9" 
            cols="32" 
            value={this.state.body} 
            onChange={this.handleChange} 
            placeholder="Type your supporting thoughts here.">

            </textarea>
          </div>  

          <button id="submit" type="submit">Post your thoughts.</button>

        </form>

        <div className="blog-posts">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>

    );
  }
}

// function App() {
//   return (
//     <div className="App"> html BETWEEN 2 DIV TAGS
//     </div>
//   );
// }
export default App;
