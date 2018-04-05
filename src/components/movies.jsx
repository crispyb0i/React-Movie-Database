import React, { Component}  from 'react';
import Search from './search.jsx';

class FetchMovies extends Component {
  constructor(){
    super();
    this.state = {
      movies:[],
    };

  }

  // getInitialState: function(){
  //   fetch('https://api.themoviedb.org/3/discover/movie?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
  //     .then((response) => {
  //       response.json()
  //       .then((data => {
  //         let movies = data["results"].map((movie => {
  //           return(
  //             <div key={movie.poster_path}>
  //               <h3>{movie.title}</h3>
  //               <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path}/>
  //               <p>{movie.vote_average}</p>
  //             </div>
  //           )
  //         }))
  //       }))
  //     })
  // }
  componentDidMount() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US&query=`+var)
    .then(response => {
      response.json()
        .then((data) => {

          let movies = data["results"].map((movie) => {
            console.log(movie)
            return(
              <div key={movie.poster_path}>
                <h3>{movie.title}</h3>
                <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path}/>
                <p>{movie.vote_average}</p>
              </div>
            )
          })
          // let ratings = data["results"].map((rating) => {
          //   return()
          // })
            this.setState({movies: movies})
        })

    })
  }


  render() {
    return(
      <div>
        {this.state.movies}
      </div>
    )
  }
}

export default FetchMovies

//https://image.tmdb.org/t/p/w500/m6aodY7SrvlTRiUFkxClaNAIQT.jpg

//https://api.themoviedb.org/3/search/movie?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US&query=avengers

//https://api.themoviedb.org/3/discover/movie?api_key=5a30cbf91506d4fd84f16d4119821fb3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
