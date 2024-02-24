import styled from "styled-components";

const Container = styled.button`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    margin: 0.5rem 0px;
    background: none;
    border: none;

    div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid var(--textColor);
        background-color: var(--lightgreen);
        margin-right: 10px;
        position: relative;

        &::before {
            content: '';
            display: block;
            position: absolute;
            width: 30px;
            height: 30px;
            transform: scale(0.3);
            border-radius: 50%;
            transform-origin: center;
            background-color: var(--textColor);
            transition: transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);
        }
    }

    &:hover {
        div {
            &::before {
                transform: scale(0.75);
            }
        }
    }

    @media only screen and (max-width: 1025px) {
        font-size: 1.2rem;
    }

    @media only screen and (max-width: 500px) {
        font-size: 1.3rem;
    }

    @media only screen and (max-width: 300px) {
        font-size: 1.25rem;
    }

`

export default function Button ({ title = 'Explore Data', callback = () => console.log('Hello') }) {
    return (
        <Container onClick={callback}>
            <div></div>
            <p>{title}</p>
        </Container>
    );
}