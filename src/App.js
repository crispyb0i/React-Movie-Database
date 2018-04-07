import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/modal.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',movies: '',isOpen:false,currentMovie:''};

    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal = (e) => {
    console.log(e.currentTarget.id)
    this.setState({
      isOpen: !this.state.isOpen
    });
    if(!this.state.isOpen){
      this.setState({currentMovie:this.state.movies[e.currentTarget.id]})
    }
  }

  getMovies(movieTitle) {
    if(movieTitle!==""){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US&query=`+movieTitle)
      .then(response => {
        response.json()
          .then((data) => {
            let movies = data["results"]
              this.setState({movies: movies})
          })
      })
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    this.getMovies(this.state.value)
    var movies = [];
    var currentImage=""
    if(this.state.currentMovie!==null && this.state.currentMovie.poster_path!==null){
      var currentImage = "https://image.tmdb.org/t/p/w500"+this.state.currentMovie.poster_path;
    }else if(this.state.currentMovie!==null && this.state.currentMovie.poster_path===null){
      var currentImage = "http://www.reelviews.net/resources/img/default_poster.jpg"
    }
    if(this.state.movies!==undefined){
      for(var i=0;i<this.state.movies.length;i++){
        var image = "https://image.tmdb.org/t/p/w500"+this.state.movies[i].poster_path;
        if(this.state.movies[i].poster_path==null){
        movies.push(
          <div class="movieDisplay" id={i} onClick={this.toggleModal}>
          <img class="moviePoster" src="http://www.reelviews.net/resources/img/default_poster.jpg"/>

          <p class="movieTitle">{this.state.movies[i].title}</p>

          </div>
        )}else{
          movies.push(
          <div class="movieDisplay" id={i} onClick={this.toggleModal}>
          <img class="moviePoster" src={image}/>
          <div class="movieTitleDiv">
          <p class="movieTitle">{this.state.movies[i].title}</p>
          </div>
          </div>
        )}
      }
    }

    return (
      <div>
        <form>
          <label>
            <input type="text" placeholder="enter movie title" onChange={this.handleChange} />
          </label>
        </form>
        <h1>{movies}</h1>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
            <h1>{this.state.currentMovie.title}</h1>
            <img src={currentImage} class="modalPoster"/>
            <br/><br/>
            <b>Release Date:</b>
            <p>{this.state.currentMovie.release_date}</p>

            <b>Overview:</b>
            <p>{this.state.currentMovie.overview}</p>
        </Modal>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <p class="signature">Made by: David Shin</p>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">The Online Movie Database!</h1>
      </header>
      <Search/>
      </div>
    );
  }
}

export default App;
