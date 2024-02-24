import styled from "styled-components";
import FilterHeadingArea from "../filterHeading";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { ElectionsContext } from "../../../contexts";
import { useContext } from "react";
import { yearStates } from "../../../utilities";

const Container = styled.div`
    margin-bottom: 1rem;
    h2 {
        margin-top: -0.6rem;
    }
`;

export default function YearInput () {

    const ctx = useContext(ElectionsContext);

    const options = Object.keys(yearStates);

    return (
        <Container>
            <Autocomplete
                disableClearable
                options={options.sort((a, b) => b.localeCompare(a))}
                ListboxProps={{ style: { maxHeight:  175, overflow: 'auto' } }}
                sx={{ width: 110 }}
                onChange={(event, newValue) => {
                    ctx.setCurrentYear(newValue);
                }}
                value={ctx.currentYear}
                renderInput={(params) => <TextField variant="standard" {...params} label="" />}
            />
        </Container>
    )
}