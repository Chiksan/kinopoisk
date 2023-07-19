import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import { getFilmDetails, getFilmFacts } from "./FilmDetailsSlice";

const FilmDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const currentFilm = useSelector((state) => state.filmDetails.currentFilm);
  console.log("currentFilm: ", currentFilm);
  const facts = useSelector((state) => state.filmDetails.facts);

  const getFilm = useCallback(async () => {
    dispatch(getFilmDetails(params.filmId));
  }, [dispatch, params]);

  useEffect(() => {
    getFilm();
  }, [getFilm]);

  const getFacts = async () => {
    const res = await dispatch(getFilmFacts(params.filmId));
    console.log("res: ", res);
  };

  if (!currentFilm) {
    return <CircularProgress />;
  }

  // Check if currentFilm.genres exists before using map
  const genres = currentFilm.genres || [];

  return (
    <div className="container-2">
      <div className="card-2">
        <div className="other">
          <h2>{currentFilm.nameRu}</h2>
          <img
            className="image"
            src={currentFilm.posterUrl}
            alt={currentFilm.nameRu}
          />
        </div>
        <div className="films-description">
          <h1>Описание</h1>
          <p>{currentFilm.description}</p>
          <div className="ul">
            <ul>
              <h1>Жанры</h1>
              {genres.map((genre) => (
                <li key={genre.genre}>{genre.genre}</li>
              ))}
            </ul>
            <ul>
              <h1>Факты</h1>
              {genres.map((facts) => (
                <li key={facts.facts}>{facts.facts}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {facts && facts.map((fact) => <h2 key={fact.id}>{fact.name}</h2>)}
    </div>
  );
};

FilmDetails.propTypes = {};

export default FilmDetails;
