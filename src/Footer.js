import styled from "styled-components";

export default function Footer({ posterURL, title, children }) {
  return (
    <FooterStyle>
      <img src={posterURL} alt="" data-identifier="movie-img-preview" />
      <FooterTextStyle>
        <p data-identifier="movie-and-session-infos-preview">{title}</p>
        {children}
      </FooterTextStyle>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  width: 100vw;
  height: 117px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  position: fixed;
  bottom: 0px;
  left: 0px;
  img {
    width: 48px;
    height: 72px;
    border: solid 10px white;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 26px;
    line-height: 30.47px;
    margin-left: 12px;
    color: #293845;
  }
`;

const FooterTextStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
