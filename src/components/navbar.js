import styled from "styled-components";
import plotreeLogo from '../resources/logo.svg';
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";

const Container = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: var(--navPadding);
    z-index: 1000;
    font-size: 1.75rem;
    transition: transform 0.2s cubic-bezier(0.45, 0, 0.55, 1);

    svg {
        cursor: pointer;
        transition: transform 0.15s cubic-bezier(0.45, 0, 0.55, 1);
        &:hover {
            transform: scale(1.1);
        }
    }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
            font-size: 0.725rem;
            margin-right: 1rem;
            a {
                color: #212121;
                font-weight: 700;
            }
        }
    }

    @media only screen and (max-width: 1025px) {
        font-size: 2rem;
    }


    @media only screen and (max-width: 500px) {
        font-size: 2.25rem;
    }

    @media only screen and (max-width: 300px) {
        font-size: 2.5rem;
    }

    @media only screen and (max-width: 500px) {
        div {
            p {
                font-size: 0.8rem;
            }
        }
    }

    @media only screen and (max-width: 450px) {
        div {
            p {
                font-size: 1.1rem;
            }
        }
    }

    @media only screen and (max-width: 400px) {
        div {
            p {
                font-size: 1.2rem;
            }
        }
    }
`;

const Logo = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt
}))`
    width: 32px;
    cursor: pointer;

    @media only screen and (max-width: 500px) {
        width: 30px;
    }

    @media only screen and (max-width: 300px) {
        width: 25px;
    }
    @media only screen and (min-width: 1000px) and (max-height: 570px) {
        width: 25px;
   }
`;



export default function Navbar({ logo = plotreeLogo }) {

    const navigate = useNavigate();

    return (
        <Container>
            <Logo onClick={() => navigate('/')} src={logo} alt="Plotree Info Design"/>
            <div>
                <p><a href="https://www.buymeacoffee.com/plotree" target="_blank" rel="noreferrer">Support Us</a> build similar projects</p>
                <MdEmail/>
            </div>
        </Container>
    )
}