import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/modal.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',movies: '',isOpen:false,currentMovie:"",movieNum:0};

    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal = (e) => {
    var modal = document.getElementsByClassName("modal")
    var closed = false
    var test = this;
    this.setState({movieNum:e.currentTarget.getAttribute('id')})
    this.setState({currentMovie: ""})
    this.setState({
      isOpen: !this.state.isOpen
    });
    if(!this.state.isOpen){
      fetch('https://api.themoviedb.org/3/movie/' + this.state.movies[e.currentTarget.id].id + '?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US')
      .then(response => {
        response.json()
          .then((data) => {
              this.setState({currentMovie: data})
          })
      })
      // this.setState({currentMovie:this.state.movies[e.currentTarget.id]})
      window.onclick = function(event) {
        if(event.target.getAttribute("class")=="backdrop"){
        test.setState({isOpen:!test.state.isOpen})
      }
    }
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
    var currentImage = "http://www.reelviews.net/resources/img/default_poster.jpg"
    var imdbLink = "https://www.imdb.com/title/" +this.state.currentMovie.imdb_id
    var runtime = "Unavailable"
    var overview = "Unavailable"
    var releaseDate = "Unavailable"
    if(this.state.currentMovie.runtime){
      runtime = this.state.currentMovie.runtime + " minutes"
    }
    if(this.state.currentMovie.poster_path){
      var currentImage = "https://image.tmdb.org/t/p/w500"+this.state.currentMovie.poster_path;
    }

    if(this.state.currentMovie.overview){
      var overview = this.state.currentMovie.overview;
    }

    if(this.state.currentMovie.release_date){
      var releaseDate = this.state.currentMovie.release_date;
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
            <h1 id="title">{this.state.currentMovie.title}</h1>
            <a href={imdbLink} target="_blank">
            <img src={currentImage} class="modalPoster"/>
            </a>
            <br/><br/>
          <div className="format">
            <p><b>Release Date:</b> {releaseDate}</p>

            <p><b>Runtime: </b>{runtime}</p>

            <p><b>Overview: </b>{overview}</p>
          </div>
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
