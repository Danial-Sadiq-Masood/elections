import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import YearInput from './inputs/year_dropdown';
import { disableTurnout } from '../../utilities';
import ReactGA from "react-ga4";

const Container = styled.div`
    position: fixed;
    right: 2.5rem;
    top: 40%;
    transform: translateY(-20px);
    display: flex;
    flex-direction: column;
    opacity: 0;

    .modes {
        display: flex;
        flex-direction: column; 
    }

    h3 {
        font-size: 1.1rem;
    }

    @media only screen and (max-width: 1000px) {
        position: relative;
        flex-direction: row;
        align-items: center;
        right: unset;
        top: unset;
        margin-top: 10px;

        h3 {
            margin: 0px 10px;

            @media only screen and (max-width: 350px) {
                display: none;
            }
        }

        .modes {
            display: flex;
            flex-direction: row; 
            align-items: center;
        }

        @media only screen and (max-width: 630px) {
            flex-direction: column;
        }
    }

    @media only screen and (max-width: 1025px) and (min-height: 975px) {
        position: relative;
        flex-direction: row;
        align-items: center;
        right: unset;
        top: unset;
        margin-top: 10px;

        .modes {
            display: flex;
            flex-direction: row; 
            align-items: center;
        }
        h3 {
            margin: 0px 10px;
        }
    }
`

export default function MapModes ({ currentYear, state, stateFunction, mapState, setVotesKey }) {
    const container = useRef();

    useEffect(() => {
        gsap.to(container.current, {opacity: 1, transform: 'translateY(0px)', duration: 0.4, delay: 0.75})
    }, [])

    const modes = ["Voter Turnout", "Vote Margin","Form 47 Data", "PTI Data", "Winner Difference", 
        "Loser Difference"];
    return (
        <Container ref={container}>
            <div className='modes'>
                <h3>Map Modes</h3>
                {modes && modes.length > 0 && modes.map((mode) => {
                    return <CustomRadio setVotesKey={setVotesKey} key={mode} {...{currentYear, stateFunction, mapState}} active={state} text={mode}/>
                })}
            </div>
        </Container>
    )
}


const RadioContainer = styled.button.attrs((props) => {
        let classList = props.active ? 'active' : '';
        console.log(props);
        return {
            className: `${classList}`
        }
    })`
    position: relative;
    padding-left: 18px;
    margin: 5px 0px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    background-color: #fff;

    opacity: ${props => props.$disabled && props.$txt === 'Voter Turnout' ? 0.3 : 1};
    filter: ${props => props.$disabled && props.$txt === 'Voter Turnout' ? `grayscale(100)` : `grayscale(0)`};
    pointer-events: ${props => props.$disabled && props.$txt === 'Voter Turnout' ? 'none' : 'auto'};

    &:before {
        box-sizing: border-box;
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 2px solid var(--deepblue);
        position: absolute;
        left: 0px;
        top: -1px;
    }

    &.active {
        &:before {
            transition: all 0.45s ease;
            background-color: var(--deepblue);
            border: 3px solid var(--deepblue);
        }
    }

    p {
        padding-left: 6px;
        font-size: 0.9rem;
    }

    &:hover {
        &:before {
            border: 3px solid var(--deepblue);
        }
    }

    @media only screen and (max-width: 450px) {
        &:before {
            box-sizing: border-box;
            content: '';
            width: 14px;
            height: 14px;
        }
    }

    @media only screen and (max-width: 400px) {
        p {
            padding-left: 0px;
            font-size: 1.15rem;
        }
    }



`;

function CustomRadio({ text, active, stateFunction, mapState, currentYear, setVotesKey}) {

    const container = useRef();

    console.log(text,active);

    /*useEffect(() => {
        if (text === active) {
            container.current.classList.add('active');
        }
        else {
            container.current.classList.remove('active');
        }
    }, [active, text]);*/

    const processClick = async (txt) => {
        if (txt === "Voter Turnout" && mapState.mode !== 'turnout') {
            mapState.updateMode("turnout");
            setVotesKey('declaredVotes');
        }
        else if (txt === "Vote Margin" && mapState.mode !== 'margin') {
            mapState.updateMode("margin");
            setVotesKey('declaredVotes');
        }
        else if (txt === "Winning Party" && mapState.mode !== "party") {
            await mapState.updateMode("party");
        }
        else if (txt === "Form 47 Data" ) {
            //mapState.updateMode("party");
            //setVotesKey('declaredVotes')
            mapState.updateData('declaredVotes', 'form47');
            setVotesKey('declaredVotes');
            console.log('updated data');
        }
        else if (txt === "PTI Data") {
            //mapState.updateMode("party");
            //setVotesKey('actualVotes')
            mapState.updateData('actualVotes','pti data');
            setVotesKey('actualVotes');
            console.log('updated data');
        }else if (txt === "Winner Difference") {
            //mapState.updateMode("party");
            mapState.updateMode("Declared Winner Difference");
            console.log('updated data');
            setVotesKey('declaredVotes');
        }else if (txt === "Loser Difference") {
            //mapState.updateMode("party");
            mapState.updateMode("Declared Loser Difference");
            setVotesKey('declaredVotes');
            console.log('updated data');
        }

        ReactGA.event({
            category: "Map Mode",
            action: "click",
            label: txt
        });

        stateFunction(txt);
    }

    return (
        <RadioContainer $txt={text} active={text === active}
        $disabled={disableTurnout.includes(currentYear)} onClick={() => processClick(text)} ref={container}>
            <p>{text}</p>
        </RadioContainer>
    )
}