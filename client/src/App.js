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
        console.log('Server error.'); // was alert, but not for production
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
      <div key={index} className="blog-post_display well"> 
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };


  render() {

    console.log('State: ', this.state)
    //JSX
    return(
      <div className="app">
        <header  class="jumbotron text-center row">
      <div class="col-sm-12 title">
        <h1>Welcome to the M.Proven.Portfolio</h1><h2>created by: Mike Provenzano</h2>
      
        <p>I built this website to practice and show my works, I initially used this <a href="https://youtube.com/playlist?list=PLurIMwd6GdCj_VlnKVceR66Sxfcb37VU8" target="_blank" rel="noreferrer">video series</a> to develop it, 
          but I will be adding and replacing code from it to further develop the database and other assets of the site. 
          It is my intent that by building this portfolio, not just of my works, but potentially a few games, 
          that I will not just grow as a programmer and web developer, but also offer tools in learning English as a foreign language.</p>
      </div><div class="col-sm-6 esl">
        <h2>Mike the ESL teacher:</h2>
      
        <p>If you are here, then you are most likely one of my students. I will be making tools for you to develop your ability in English. One such tool I made is a 15-week course on the 3,000 most commonly used words in English. Click this <a href="./engIn15Wks/index.html" target="_self" >LINK</a> to access it.</p>
      </div><div class="col-sm-6 code">
        <h2>Mike the Developer/Hobbyist:</h2>

        <p>Below is the form used to make this project, but this <a href="#" target="_self" >LINK</a> will take you to an index of other projects I have been making,
          be sure to also check out the ESL apps I've made for my students. Also, the code for this web-portfolio can be found on my <a href="https://github.com/m-proven-portfolio/home-page" rel="noreferrer" target="_blank">GitHub <i class="fab fa-github"></i></a>. Thank you for your interest and I look forward to collaborating with you or your company.</p>
      </div></header>
        <form id="Blog-Posts" action="#" method="POST" target="_self" onSubmit={this.submit}>
          <div class="form-group">
          <div className="form-input">
            <label id="title-label">Title: </label><br/>
            <input type="text" class="form-control" 
            id="title" 
            name="title" 
            value={this.state.title} 
            onChange={this.handleChange} 
            placeholder="Type your main idea here." 
            required/><br/>
          </div>
          <div className="form-input">            
            <label id="body-label">What do you have to say?</label><br/>
            <textarea  class="form-control" 
            id="body" 
            name="body" 
            rows="9" 
            cols="32" 
            value={this.state.body} 
            onChange={this.handleChange} 
            placeholder="Type your supporting thoughts here.">

            </textarea>
          </div>  

          <button class="form-control btn-info" id="submit" type="submit">Post your thoughts.</button>

        </div></form>

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
