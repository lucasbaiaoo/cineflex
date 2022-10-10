import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const data = location.state;

  console.log(data);

  return (
    <SuccessPageStyle>
      <SucessTitle>
        <h1>Pedido feito com sucesso!</h1>
      </SucessTitle>
      <SucessInfo data-identifier="movie-session-infos-reserve-finished">
        <h1>Filme e Sessão</h1>
        <p>{data.movieTitle}</p>
        <p>
          {data.sessionDay} {data.sessionDate}
        </p>
      </SucessInfo>
      <SucessInfo data-identifier="seat-infos-reserve-finished">
        <h1>Ingressos</h1>
        {data.chosenSeatsNames.map((chosenSeatName) => (
          <p>Assento {chosenSeatName}</p>
        ))}
      </SucessInfo>
      <SucessInfo data-identifier="buyer-infos-reserve-finished">
        <h1>Comprador</h1>
        <p>Nome: {data.name}</p>
        <p>CPF: {data.CPF}</p>
      </SucessInfo>
      <Link to="/">
        <button data-identifier="back-to-home-btn">Voltar para Home</button>
      </Link>
    </SuccessPageStyle>
  );
}

const SuccessPageStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 67px;
  margin-bottom: 157px;
  button {
    width: 225px;
    height: 42px;
    margin-top: 92px;
    border-radius: 3px;
    background-color: #e8833a;
    font-family: "Roboto", sans-serif;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SucessTitle = styled.div`
  width: 150px;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 28.13px;
    color: #247a6b;
    margin-top: 40px;
    text-align: center;
  }
`;

const SucessInfo = styled.div`
  width: 376px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #293845;
  }
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    color: #293845;
    margin-top: 5px;
  }
`;
