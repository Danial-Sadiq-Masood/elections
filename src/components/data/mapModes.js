import { useEffect, useRef, useState } from 'react';
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

export default function MapModes ({ currentYear, state, stateFunction, mapState, setVotesKey, votesKey, actor }) {
    const container = useRef();
    const [mapMode, setMapMode] = useState('Winning Party')

    useEffect(() => {
        gsap.to(container.current, {opacity: 1, transform: 'translateY(0px)', duration: 0.4, delay: 0.75})
    }, [])

    const dataSource = [{title : "Official Data", key : 'declaredVotes'}, {title : "form45.com Data", key : 'actualVotes'}];
    const modes = ["Winning Party","Voter Turnout", "Vote Margin"/*,"Winner Difference", "Loser Difference"*/];

    return (
        <Container ref={container}>
            <div className='modes'>
                <h3>Data Source</h3>
                {dataSource && dataSource.length > 0 && dataSource.map((source) => {
                    return <DataSourceRadio actor={actor} radioVotesKey={source.key} votesKey={votesKey} setVotesKey={setVotesKey} key={source.title} {...{currentYear, stateFunction, mapState}} active={state} text={source.title}/>
                })}
            </div>
            {<div className='modes'>
                <h3>Map Modes</h3>
                {modes && modes.length > 0 && modes.map((mode) => {
                    return <CustomRadio processClick={processModeClick} votesKey={votesKey} key={mode} {...{setMapMode}} active={mapMode} text={mode}/>
                })}
            </div>}
        </Container>
    )
}


const RadioContainer = styled.button.attrs((props) => {
        let classList = props.active ? 'active' : '';
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
    text-align: left;

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

function CustomRadio({ text, active, stateFunction, mapState, setMapMode,votesKey, processClick}) {

    const container = useRef();

    useEffect(() => {
        if (text === active) {
            if(window.gridActor){
                if(active === 'Winning Party'){
                   window.gridActor.send({
                    type : 'showWinningParty'
                   }) 
                }else if(active === 'Voter Turnout'){
                    window.gridActor.send({
                     type : 'showVoterTurnout'
                    }) 
                 }else if(active === 'Vote Margin'){
                    window.gridActor.send({
                     type : 'showVoteMargin'
                    }) 
                 }
            }
        }
        
    }, [active]);

    const isActive = text === active;

    return (
        <RadioContainer $txt={text} active={text === active}
        onClick={() => processModeClick(text,mapState,setMapMode,votesKey,isActive)} ref={container}>
            <p>{text}</p>
        </RadioContainer>
    )
}

function DataSourceRadio({ text, active, stateFunction, mapState, currentYear, setVotesKey, processClick,votesKey, radioVotesKey, actor}) {

    const container = useRef();

    useEffect(() => {
        if(votesKey === radioVotesKey){
            if(window.gridActor){
                window.gridActor.send({
                    type : 'changeVotesKey',
                    votesKey : votesKey
                })
            }
            actor.send({
                type : 'changeVotesKey',
                votesKey : votesKey
            })
        }
        /*if(votesKey == 'actualVotes'){
            actor.send({type : 'showPtiData'})
        }else if(votesKey == 'declaredVotes'){
            actor.send({type : 'showOfficialData'})
        }*/
    }, [votesKey]);

    const isActive = votesKey === radioVotesKey;

    return (
        <RadioContainer $txt={text} active={isActive}
        $disabled={disableTurnout.includes(currentYear)} onClick={() => processDataSourceClick(text,mapState,stateFunction,setVotesKey,votesKey,active,radioVotesKey,isActive)} ref={container}>
            <p>{text}</p>
        </RadioContainer>
    )
}

function processModeClick(txt,mapState,setMapMode,votesKey,isActive){

    if(isActive){
        return;
    }
    
    /*if (txt === "Voter Turnout" && mapState.mode !== 'turnout') {
        mapState.updateMode("turnout",400,votesKey);
    }
    else if (txt === "Vote Margin" && mapState.mode !== 'margin') {
        mapState.updateMode("margin",400,votesKey);
    }
    else if (txt === "Winning Party" && mapState.mode !== "Winning Party") {
        mapState.updateMode("Party",400,votesKey);
    }else if (txt === "Winner Difference") {
        mapState.updateMode("Declared Winner Difference");
        console.log('updated data');
    }else if (txt === "Loser Difference") {
        mapState.updateMode("Declared Loser Difference");
        console.log('updated data');
    }

    ReactGA.event({
        category: "Map Mode",
        action: "click",
        label: txt
    });*/

    setMapMode(txt);
}

function processDataSourceClick(txt,mapState,stateFunction,setVotesKey,votesKey,state,radioVotesKey,isActive,actor){

    if(isActive){
        return;
    }

    //acto.updateMode(mapState.mode,400,radioVotesKey);
    
    if (txt === "Official Data" ) {
        setVotesKey('declaredVotes')
    }
    else if (txt === "form45.com Data") {
        setVotesKey('actualVotes')
    }
    
    ReactGA.event({
        category: "Map Mode",
        action: "click",
        label: txt
    });
}