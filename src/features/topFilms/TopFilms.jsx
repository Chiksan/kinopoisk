import React from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const TopFilms = () => {
  const isLoading = useSelector((state) => state.topFilms.isLoading);
  const films = useSelector((state) => state.topFilms.films);
  const navigate = useNavigate();

  const filmsBySearch = useSelector((state) => state.topFilms.filmsBySearch);
  console.log("filmsBySearch: ", filmsBySearch);

  const handleNavigate = (film) => {
    navigate(`/film/${film.filmId}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="container">
      {filmsBySearch.length === 0
        ? films.map((item) => (
            <Link to={`/film/${item.filmId}`} key={item.filmId}>
              <div onClick={() => handleNavigate(item)} className="card">
                <h4>{item.nameRu}</h4>
                <img className="image" src={item.posterUrl} alt={item.nameRu} />
              </div>
            </Link>
          ))
        : filmsBySearch.map((item) => (
            <Link to={`/film/${item.filmId}`} key={item.filmId}>
              <div onClick={() => handleNavigate(item)} className="card">
                <h4>{item.nameRu}</h4>
                <img className="image" src={item.posterUrl} alt={item.nameRu} />

                <ul>
                  {item.genres.map((value) => (
                    <li key={value.genre}>{value.genre}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
    </div>
  );
};

TopFilms.propTypes = {};

export default TopFilms;
