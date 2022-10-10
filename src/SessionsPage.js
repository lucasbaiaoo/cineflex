import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`
    );

    promise.then((answer) => {
      setSessions(answer.data);
    });

    promise.catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  return (
    <SessionsPageStyle>
      <h1>Selecione o Horário</h1>
      <Sessions>
        {sessions.length === 0
          ? ""
          : sessions.days.map((session) => (
              <Session>
                <p data-identifier="session-date">
                  {session.weekday} - {session.date}{" "}
                </p>
                {session.showtimes.map((showtime) => (
                  <Link to={`/assentos/${showtime.id}`}>
                    <button data-identifier="hour-minute-btn">
                      {showtime.name}
                    </button>
                  </Link>
                ))}
              </Session>
            ))}
      </Sessions>
      {sessions.length === 0 ? (
        ""
      ) : (
        <Footer posterURL={sessions.posterURL} title={sessions.title} />
      )}
    </SessionsPageStyle>
  );
}

const SessionsPageStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 67px;
  margin-bottom: 157px;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 28.13px;
    color: #293845;
    margin-top: 40px;
  }
`;

const Sessions = styled.div`
  width: 376px;
`;

const Session = styled.div`
  margin-top: 23px;
  margin-left: 24px;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23.44px;
    color: #293845;
  }
  button {
    width: 83px;
    height: 43px;
    border-radius: 3px;
    background-color: #e8833a;
    font-family: "Roboto", sans-serif;
    color: white;
    margin-top: 22px;
    margin-right: 7px;
    &:hover {
      cursor: pointer;
    }
  }
`;
