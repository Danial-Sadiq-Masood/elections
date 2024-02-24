import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: var(--navPadding);
    box-sizing: border-box;
    align-items: center;
    position: absolute;
    bottom: 0px;
    font-size: 0.75rem;

    @media only screen and (max-width: 1025px) {
        font-size: 1rem;
    }

    @media only screen and (max-width: 500px) {
        font-size: 1.2rem;
    }

    @media only screen and (max-width: 300px) {
        font-size: 1rem;
    }
`;

const Designed = styled.p`
    font-family: "PlayFair Display", serif;
    font-weight: 500;
    font-style: italic;
`;

const CopyRight = styled.p`
    font-weight: 600;
`;



export default function BottomPane() {
    return (
        <Container>
            <Designed>Designed & Developed by Plotree Info Design</Designed>
            <CopyRight>© {new Date().getFullYear()}</CopyRight>
        </Container>
    )
}