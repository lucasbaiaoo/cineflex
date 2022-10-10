import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function ChairsPage() {
  const [seats, setSeats] = useState([]);
  const { sessionId } = useParams();
  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [chosenSeats, setChosenSeats] = useState([]);
  const [chosenSeatsNames, setChosenSeatsNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`
    );

    promise.then((answer) => {
      answer.data.seats.map((seat) => (seat.isClicked = false));
      setSeats(answer.data);
    });

    promise.catch((error) => {
      console.log(error.response.data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const promise1 = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      {
        ids: chosenSeats,
        name: name,
        cpf: CPF,
      }
    );

    promise1.then(() =>
      navigate("/sucesso", {
        state: {
          movieTitle: seats.movie.title,
          sessionDay: seats.day.weekday,
          sessionDate: seats.day.date,
          chosenSeatsNames,
          name,
          CPF,
        },
      })
    );
  }

  function addClick(seat) {
    seat.isClicked = true;
    setSeats({ ...seats });
    chosenSeats.push(seat.id);
    chosenSeatsNames.push(seat.name);
    setChosenSeats([...chosenSeats]);
    setChosenSeatsNames([...chosenSeatsNames]);
  }

  function removeClick(seat) {
    seat.isClicked = false;
    setSeats({ ...seats });
    setChosenSeats(chosenSeats.filter((chosenSeat) => chosenSeat !== seat.id));
    setChosenSeatsNames(
      chosenSeatsNames.filter((chosenSeat) => chosenSeat !== seat.name)
    );
  }

  function Click(seat) {
    if (seat.isAvailable === false) {
      alert("Esse assento não esta disponível");
    } else {
      if (seat.isClicked === false) {
        addClick(seat);
      } else {
        removeClick(seat);
      }
    }
  }

  return (
    <SeatsPageStyle>
      <h1>Selecione o(s) assento(s)</h1>
      <Seats>
        {seats.length === 0
          ? ""
          : seats.seats.map((seat) => (
              <Seat
                onClick={() => Click(seat)}
                backgroundcolor={
                  seat.isAvailable && !seat.isClicked
                    ? "#C3CFD9"
                    : !seat.isAvailable
                    ? "#FBE192"
                    : "#1AAE9E"
                }
                data-identifier="seat"
              >
                {seat.name}
              </Seat>
            ))}
      </Seats>
      <TypeOfSeats>
        <TypeOfSeat>
          <Seat
            backgroundcolor="#1AAE9E"
            data-identifier="seat-selected-subtitle"
          ></Seat>
          <p>Selecionado</p>
        </TypeOfSeat>
        <TypeOfSeat>
          <Seat
            backgroundcolor="#C3CFD9"
            data-identifier="seat-available-subtitle"
          ></Seat>
          <p>Disponível</p>
        </TypeOfSeat>
        <TypeOfSeat>
          <Seat
            backgroundcolor="#FBE192"
            data-identifier="seat-unavailable-subtitle"
          ></Seat>
          <p>Indisponível</p>
        </TypeOfSeat>
      </TypeOfSeats>
      <Form>
        <form onSubmit={handleSubmit}>
          <p>Nome do Comprador</p>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-identifier="buyer-name-input"
          />
          <p>CPF do Comprador</p>
          <input
            type="text"
            placeholder="Digite seu CPF..."
            value={CPF}
            onChange={(e) => setCPF(e.target.value)}
            data-identifier="buyer-cpf-input"
          />
          <button data-identifier="reservation-btn">Reservar Assento(s)</button>
        </form>
      </Form>
      {seats.length === 0 ? (
        ""
      ) : (
        <Footer posterURL={seats.movie.posterURL} title={seats.movie.title}>
          <p>
            {seats.day.weekday} - {seats.day.date}
          </p>
        </Footer>
      )}
    </SeatsPageStyle>
  );
}

const SeatsPageStyle = styled.div`
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

const Seats = styled.div`
  width: 376px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Seat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;
  margin-left: 3.5px;
  margin-right: 3.5px;
  margin-bottom: 18px;
  width: 26px;
  height: 26px;
  border-radius: 12px;
  background-color: ${(props) => props.backgroundcolor};
  border: solid 1px #808f9d;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 12.89px;
  &:hover {
    cursor: pointer;
  }
`;

const TypeOfSeats = styled.div`
  width: 376px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypeOfSeat = styled.div`
  width: 376px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 15.23px;
    color: #293845;
  }
`;

const Form = styled.div`
  width: 376px;
  margin-top: 41px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 21.09px;
    color: #293845;
  }
  input {
    width: 327px;
    height: 51px;
    margin-bottom: 7px;
    border-radius: 3px;
    border: solid #d4d4d4 1px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 21.09px;
    color: #293845;
    &::placeholder {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 21.09px;
      color: #afafaf;
      font-style: italic;
    }
  }
  button {
    width: 225px;
    height: 42px;
    margin-top: 57px;
    margin-left: 78px;
    border-radius: 3px;
    background-color: #e8833a;
    font-family: "Roboto", sans-serif;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
`;
