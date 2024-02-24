import styled from "styled-components";

const Container = styled.p`
    font-family: "Chromate", serif;
    font-size: 1.3rem;
    padding: 1.5rem 2.75rem;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 2rem;
        left: 0px;
        top: 50%;
        height: 2px;
        background: var(--textColor);
    }

    &::after {
        content: '';
        position: absolute;
        width: 2rem;
        right: 0px;
        top: 50%;
        height: 2px;
        background: var(--textColor);
    }

    @media only screen and (max-width: 1025px) {
        font-size: 1.6rem;
    }

    @media only screen and (max-width: 500px) {
        font-size: 1.5rem;
    }

    @media only screen and (max-width: 300px) {
        font-size: 1.8rem;
    }
`


export default function Atlas ({}) {
    return (
        <Container>Interactive Atlas</Container>
    )
}