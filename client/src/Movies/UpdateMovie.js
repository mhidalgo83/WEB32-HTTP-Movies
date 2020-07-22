import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  console.log(props.movieList);

  const { title, director, metascore, stars } = movie;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChanges = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        const newMovies = props.movieList.map((m) => {
          if (m.id === res.data.id) {
            return (m = res.data);
          }
          return m;
        });
        props.setMovieList(newMovies);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          name="director"
          value={director}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          name="metascore"
          value={metascore}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          name="stars"
          value={stars}
          onChange={handleChanges}
        ></input>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
