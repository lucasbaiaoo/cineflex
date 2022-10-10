import styled from "styled-components";

export default function Header(){
    return(
        <HeaderStyle>
            <h1>CINEFLEX</h1>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
width: 100vw;
height: 67px;
background-color: #C3CFD9;
display: flex;
align-items: center;
justify-content: center;
position:fixed;
top:0px;
left:0px;
h1{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    line-height: 39.84px;
    color: #E8833A;
}
`