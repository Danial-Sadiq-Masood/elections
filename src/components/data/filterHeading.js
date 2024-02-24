import { useEffect, useState } from "react";
import styled from "styled-components";

const HeadingArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: -0.025rem;
    font-weight: 700;
    margin: 1.3rem 0px 0.5rem 0px;

    h2 {
        margin: 0px;
        font-size: 1.1rem;
    }

    @media only screen and (max-height: 700px) {
        margin: 1rem 0px 0.25rem 0px;
    }
`;

export default function FilterHeadingArea ({heading, stateVar, resetFunc, disableReset, resetOnly}) {
    return (
        <HeadingArea>
            <h2>{heading}</h2>
            {!disableReset && <FilterCancel {...{stateVar, resetFunc, resetOnly}}/>}
        </HeadingArea>
    );
}

const CancelFilter = styled.p`
    background-color: #E0E0E0;
    padding: 4px 8px; 
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: normal;
`;

function FilterCancel({stateVar, resetFunc, resetOnly}) {

    const [string, setString] = useState('');

    useEffect(() => {
        if (typeof(stateVar) === 'object' && !resetOnly) {
            setString(`X ${stateVar.length}`)
        }
        else {
            setString('Reset');
        }
    }, [stateVar])

    return (
        <CancelFilter onClick={() => resetFunc()}>{string}</CancelFilter>
    )
}