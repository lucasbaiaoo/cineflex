import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((answer) => {
      setMovies(answer.data);
    });

    promise.catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  return (
    <HomePageStyle>
      <h1>Selecione o Filme</h1>
      <Movies>
        {movies.map((movie) => (
          <MoviePoster data-identifier="movie-outdoor">
            <Link to={`/sessoes/${movie.id}`}>
              <img src={movie.posterURL} alt="" />
            </Link>
          </MoviePoster>
        ))}
      </Movies>
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 28.13px;
    color: #293845;
    margin-top: 40px;
  }
`;

const Movies = styled.div`
  width: 376px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MoviePoster = styled.div`
  width: 145px;
  height: 208px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  img {
    width: 129px;
    height: 193px;
    &:hover {
      cursor: pointer;
    }
  }
`;
