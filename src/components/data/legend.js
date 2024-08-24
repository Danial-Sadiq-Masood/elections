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
        top: unset;
        transform: translateY(0px);
        position : unset;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
`;

const Column = styled.div`
display : flex;
flex-direction : column;
padding-right : 10px;

@media only screen and (max-width: 500px) {
    flex-direction : row;
    width : 100%;
    justify-content: space-evenly;
}
`;

const legParties = Object.entries(partyColors)
    .filter(d => allWinningParties.includes(d[0]))
    .map((d) => ({
        party: d[0],
        color: d[1]
    }))

legParties.push({
    party: 'TLP',
    color: partyColors['TLP']
})

window.legParties = legParties;

export default function Legend({ leaders, scaleColors }) {

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
                <PartyLegend scaleColors={scaleColors} />
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

        width : 30px;
    }

    @media only screen and (min-width: 1000px) and (max-height: 570px) {
        &:before {
            height: 5px;
        }

        padding: 5px 0px;
    }
`;

const ChoroplethLegend = styled.div`
    font-size: 0.9rem;
    text-align: center;
    position: relative;
    padding: 8px 0px;

    p {
        font-size: 0.75rem;
    }

    @media only screen and (max-width: 500px) {
        &:before {
            height: 7px;
        }

        padding: 2px 0px;

        width : 30px;
    }

    @media only screen and (min-width: 1000px) and (max-height: 570px) {
        &:before {
            height: 5px;
        }

        padding: 5px 0px;
    }
`;

function PartyLegend({ color, party, scaleColors }) {
    const classString = `h-[150px] w-[15px] rounded-[10px] max-[600px]:h-[50px]`
    const styleObj = { "background": `linear-gradient(to top, ${scaleColors[0]} 0%,${scaleColors[1]} 100%)` }
    console.log(classString);
    return (
        <ChoroplethLegend>
            <div className="flex gap-3 p-2">
                <div className={classString} style={styleObj}>
                </div>
                <div className="flex flex-col justify-between py-2">
                    <p>100 %</p>
                    <p>0 %</p>
                </div>
            </div>
        </ChoroplethLegend>
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

