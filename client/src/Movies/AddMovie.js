import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddMovie = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const { title, director, metascore, stars } = movie;
  const { push } = useHistory();
  const handleChanges = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
    if (e.target.name === "stars") {
      setMovie({ ...movie, stars: e.target.value.split(",") });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        props.setMovieList(res.data);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(movie);
  return (
    <form onSubmit={handleSubmit}>
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
      <button>Submit</button>
    </form>
  );
};

export default AddMovie;
