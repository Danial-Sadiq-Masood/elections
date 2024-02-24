import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dictionary } from "../../utilities";

const Container = styled.div`
    position: fixed;
    z-index: 2;
    left: 0px;
    width: 50px;
    top: 50vh;
    transform: translateY(-50%);
    z-index: 2;
    background-color: rgba(255,255, 255, 0.95);
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 500px) {
        bottom: 65px;
        top: unset;
        transform: translateY(0px);
    }
`;

export default function Legend({ leaders }) {

    const [parties, setParies] = useState([]);

    useEffect(() => {
        if (leaders) {
            setParies([...new Map(leaders.map(item => [item['color'], item])).values()]);
        } 
    }, [leaders])

    return (
        <Container>
            {parties.length > 0 && parties.map((party, index) => {
                return <PartyLegend key={`${index}party`} color={party.color} party={party.color === '#dddddd' ? 'Other' : party.party}/>
            })}

            <VoteMargin/>
        </Container>
    );
};

const Party = styled.div`
    font-size: 0.9rem;
    text-align: center;
    position: relative;

    padding: 8px 0px;

    &:before {
        content: '';
        position: absolute;
        width: 70%;
        height: 8px;
        left: 15%;
        background-color: ${props => props.$color};
        border-radius: 25px;
    }

    p {
        margin-top: 11px;
        font-size: 0.75rem;
    }

    @media only screen and (max-width: 500px) {
        &:before {
            height: 7px;
        }

        padding: 2px 0px;
    }

    @media only screen and (min-width: 1000px) and (max-height: 570px) {
        &:before {
            height: 5px;
        }

        padding: 5px 0px;
    }
`;

function PartyLegend({color, party}) {
    return (
        <Party title={color === '#dddddd' ? '' : Dictionary[party]} $color={party === 'undefined' ? '#ddd' : color}><p>{party === 'undefined' ? `Ind` : party}</p></Party>
    )
}

const MargContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    text-align: center;

    p {
        font-size: 0.75rem;
    }

    span {
        font-size: 0.75rem;
        margin-top: 5px;
        font-family: 'DM Serif Text', serif;
    }

    @media only screen and (max-width: 500px) {
        margin-top: 5px;
    }
`

const MarginLegend = styled.div`
    width: 30px;
    padding-top: 30px;
    border: 1px solid #e0e0e0;
    margin: 5px 0px;
    position: relative;

    &:before {
        position: absolute;
        content: '';
        bottom: 0px;
        left: 0px;
        height: 50%;
        width: 100%;
        background-color: #e0e0e0;
    }


`;

function VoteMargin() {
    return (
        <MargContainer>
            <p>0%</p>
            <MarginLegend/>
            <p>100%</p>
            <span>Margin/ Turnout</span>
        </MargContainer>
    )
}

