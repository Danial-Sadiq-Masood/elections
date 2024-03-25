import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Dictionary, partyColors, otherColor, allWinningParties } from "../../utilities";

const Container = styled.div`
    padding: 10px 0px;
    background-color: #f3f3f3;
    border-radius: 0px 10px 10px 0px;
    position: fixed;
    z-index: 2;
    left: 0px;
    top: 50vh;
    transform: translateY(-50%);
    z-index: 2;
    display : flex;
    flex-direction : row;

    @media only screen and (max-width: 500px) {
        bottom: 65px;
        top: unset;
        transform: translateY(0px);
    }
`;

const Column = styled.div`
display : flex;
flex-direction : column;
width: 50px;
padding-right : 10px;
`;

const legParties = Object.entries(partyColors)
    .filter(d => allWinningParties.includes(d[0]))
    .map((d) => ({
        party: d[0],
        color: d[1]
    }))

window.legParties = legParties;

export default function Legend({ leaders }) {

    window.leaders = leaders;

    const [parties, setParies] = useState([]);

    useEffect(() => {
        if (leaders) {
            setParies([...new Map(leaders.map(item => [item['color'], item])).values()]);
        }
    }, [leaders])

    return (
        <Container>
            <Column>
                {legParties.slice(0, 8).map((party, index) => {
                    return <PartyLegend key={`${index}party`} color={partyColors[party.party] || otherColor} party={party.color === '#64B5F6' ? 'Other' : party.party} />
                })}
            </Column>
            <Column>
                {legParties.slice(8, 16).map((party, index) => {
                    return <PartyLegend key={`${index}party`} color={partyColors[party.party] || otherColor} party={party.color === '#64B5F6' ? 'Other' : party.party} />
                })}
            </Column>
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

function PartyLegend({ color, party }) {
    return (
        <Party title={color === '#dddddd' ? '' : Dictionary[party]} $color={party === 'undefined' ? '#ddd' : color}><p>{party === 'undefined' ? `IND` : party}</p></Party>
    )
}

const MargContainer = styled.div`
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
            <MarginLegend />
            <p>100%</p>
            <span>Margin/ Turnout</span>
        </MargContainer>
    )
}

