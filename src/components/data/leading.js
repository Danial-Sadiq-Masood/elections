import styled from "styled-components";

const Container = styled.div`
    position: relative;
    width: 5.5vw;
    padding-top: 5.5vw;
    border: 2px solid ${props => props.$color};
    margin: 0px 12px;
    border-radius: 10px;

    &::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        width: ${props => `${props.$size}px`};
        height: ${props => `${props.$size}px`};
        top: ${props => `-${props.$size/2}px`};
        right: ${props => `-${props.$size/2}px`};
        background: ${props => props.$color};
        opacity: 0.75;
        transition: 0.5s;
    }

    @media only screen and (max-width: 1200px) {
        width: 6.5vw;
        padding-top: 6.5vw;
    }

    @media only screen and (max-width: 950px) {
        width: 7.5vw;
        padding-top: 7.5vw;
    }

    @media only screen and (max-width: 750px) {
        width: 8.5vw;
        padding-top: 8.5vw;
    }

    @media only screen and (max-width: 650px) {
        width: 10vw;
        padding-top: 10vw;
    }

    @media only screen and (max-width: 550px) {
        width: 12.5vw;
        padding-top: 12.5vw;
    }

    @media only screen and (max-width: 400px) {
        width: 15vw;
        padding-top: 15vw;
    }

    @media only screen and (min-width: 2160px) {
        width: 4.5vw;
        padding-top: 4.5vw;
    }

    @media only screen and (min-width: 2500px) {
        width: 4vw;
        padding-top: 4vw;
    }
`;

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        font-size: 0.85rem;
    }

    h2 {
        font-size: 1.75rem;
        margin: 0.2rem 0px;
    }

    span {
        font-family: 'DM Serif Text';
        font-style: italic;
        font-size: 0.8rem;
        margin-top: -0.25rem;
    }

    @media only screen and (max-width: 450px) {
        p {
            font-size: 1rem;
        }
        span {
            display: none;
        }
    }
`;

export default function Leading ({ party = 'I-PTI', seats = 116, color = '#212121', size=20 }) {
    return (
        <Container $color={color} $size={size} >
            <Content>
                <p>{party}</p>
                <h2>{seats}</h2>
                <span>Seats</span>
            </Content>
        </Container>
    )
};