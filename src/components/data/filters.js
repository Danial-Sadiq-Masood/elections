import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MdClose } from "react-icons/md";

//Component Imports
import FilterHeadingArea from "./filterHeading";
import CheckBoxList from "./checkBoxGrid";

//Data Imports
import { yearStates } from "../../utilities";

//MUI imports
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';

import { device } from "../../utilities";
import { disableTurnout } from '../../utilities';

const seatNames = yearStates[2024].data.map(d => d.seat)

export default function FilterPane({ filtersOpen, setFiltersOpen, ctx }) {

    const container = useRef();

    const [partyState, setPartyState] = useState('Winning Party');

    useEffect(() => {
        if (filtersOpen) {
            container.current.style.visibility = 'visible';
            gsap.to(container.current, { opacity: 1, transform: 'translateY(0px)', duration: 0.4 });
        }
        else {
            gsap.to(container.current, { opacity: 0, transform: 'translateY(30px)', duration: 0.2, onComplete: () => { container.current.style.visibility = 'hidden' } });
        }
    }, [filtersOpen]);

    const updateSlider = (
        event,
        newValue,
        activeThumb,
    ) => {
        const { setVoteMargin } = ctx;

        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setVoteMargin([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setVoteMargin([clamped - minDistance, clamped]);
            }
        } else {
            setVoteMargin(newValue);
        }
    };

    const updateTurnout = (
        event,
        newValue,
        activeThumb,
    ) => {
        const { setVoterTurnout } = ctx;

        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setVoterTurnout([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setVoterTurnout([clamped - minDistance, clamped]);
            }
        } else {
            setVoterTurnout(newValue);
        }
    };

    return (
        <FiltersContainer ref={container}>
            <IconContainer>
                <MdClose onClick={() => setFiltersOpen(false)} style={{ cursor: 'pointer' }} />
            </IconContainer>

            <FilterHeadingArea
                heading='Seats'
                stateVar={ctx.naSeatsFilter}
                resetFunc={() => ctx.setNaSeatsFilter([])}
            />

            <Autocomplete
                multiple
                options={seatNames}
                filterSelectedOptions
                onChange={(e, value, reason) => {
                    console.log(e);
                    //alert(reason +  value);
                    ctx.setNaSeatsFilter([...value]);
                }}
                value={ctx.naSeatsFilter}
                renderInput={(params) => (
                    <TextField
                        variant="standard"
                        {...params}
                        placeholder="Select Seat"
                    />
                )}
            />

            <DisableTurnout $disabled={disableTurnout.includes(ctx.currentYear)}>
                <FilterHeadingArea
                    heading='Political Groups'
                    stateVar={
                        partyState === 'Winning Party' ? ctx.partyFilters : ctx.runnerUpFilters
                    }
                    resetFunc={
                        partyState === 'Winning Party' ? () => ctx.setPartyFilters([]) : () => ctx.setRunnerUpFilters([])
                    }
                />
                <DropDownMargin>
                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={['Winning Party', 'Runner Up']}
                        onChange={(e) => {
                            setPartyState(e.target.innerText);
                        }}
                        value={partyState}
                        renderInput={(params) => <TextField variant="standard" {...params} label="" />}
                    />
                </DropDownMargin>

                <CheckBoxList list={partyState === 'Winning Party' ? yearStates[2024].parties : yearStates[2024].runnerups}
                    stateVar={partyState === 'Winning Party' ? ctx.partyFilters : ctx.runnerUpFilters}
                    stateFunction={partyState === 'Winning Party' ? ctx.setPartyFilters : ctx.setRunnerUpFilters}
                />
            </DisableTurnout>

            <FilterHeadingArea
                heading='Regions'
                stateVar={ctx.regionFilters}
                resetFunc={() => ctx.setRegionFilters([])}
            />
            <CheckBoxList list={yearStates[2024].regions} stateVar={ctx.regionFilters} stateFunction={ctx.setRegionFilters} />
            <FilterHeadingArea
                heading='Seat Status'
                stateVar={ctx.disputedSeatsFilter}
                resetFunc={() => ctx.setDisputedSeatsFilter([])}
            />
            <CheckBoxList list={['Disputed']} stateVar={ctx.disputedSeatsFilter} stateFunction={ctx.setDisputedSeatsFilter} />

            {/*<FilterHeadingArea 
                heading='Vote Margin'
                stateVar={ctx.voteMargin} 
                resetFunc={() => ctx.setVoteMargin([0,100])}
                resetOnly
            />
            <CustomSlider
                size="small"
                tag="Vote Margin"
                getAriaLabel={() => 'Vote Margin'}
                value={ctx.voteMargin}
                onChange={updateSlider}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                marks={marks}
            />

            <DisableTurnout $disabled={false}>
                <FilterHeadingArea 
                    heading='Voter Turnout'
                    stateVar={ctx.voterTurnout} 
                    resetFunc={() => ctx.setVoterTurnout([0,100])}
                    resetOnly
                />
                <CustomSlider
                    size="small"
                    tag="Voter Turnout"
                    getAriaLabel={() => 'Voter Turnout'}
                    value={ctx.voterTurnout}
                    onChange={updateTurnout}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    marks={marks}
                />
                    </DisableTurnout>*/}
        </FiltersContainer>
    );
};

const DisableTurnout = styled.div`
    transition: 0.3s ease;
    opacity: ${props => props.$disabled ? 0.3 : 1};
    filter: ${props => props.$disabled ? `grayscale(100)` : `grayscale(0)`};
    pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
`

const FiltersContainer = styled.div`
    opacity: 0;
    border-radius: 10px 10px 0px 0px;
    transform: translateY(30px);
    position: fixed;
    bottom: 0px;
    height: 80vh;
    left: 0px;
    box-sizing: border-box;
    width: 100%;
    background-color: #FBF8F8;
    padding: var(--navPadding);
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;


    @media ${device.tablet} {
        width: auto;
        height: auto;
        left: 50px;
        padding: 20px;
    }

    @media ${device.laptopM} {
        width: 30vw;
        padding: 25px;
    }

    @media ${device.laptopL} {
        width: 27.5vw;
        padding: 30px;
    }

    @media only screen and (max-height: 700px) {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    @media only screen and (min-width: 2160px) {
        width: 20.5vw;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px;
    background-color: #e0e0e0;
    visibility: hidden;
    border-radius: 0px 10px 0px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;

    @media only screen and (max-height: 700px) {
        font-size: 1.4rem;
    }

    @media ${device.tablet} {
        visibility: visible;
    }
`;

const DropDownMargin = styled.div`
    margin-bottom: 1rem;
`

const CustomSlider = styled(Slider)({
    width: '96% !important',
    marginLeft: '2%',
    '& .MuiSlider-rail': {
        backgroundColor: 'red',
    },
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#bdbdbd',
    },
    '& .MuiSlider-thumb': {
        width: 14,
        height: 14,
        backgroundColor: 'var(--deepblue)',
        border: '2px solid var(--deepblue)',
    },
    '& .MuiSlider-valueLabel': {
        background: 'var(--deepblue)'
    },
});

function valuetext(value) {
    return `${value}%`;
}

const minDistance = 1;


const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 100,
        label: '100%',
    },
];



