import styled from "styled-components";
import { useState, useContext, useRef } from "react";
import { ElectionsContext } from "../../contexts";
import FilterButton from "./inputs/filter_button";
import FilterPane from "./filters";
import Legend from './legend';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    z-index : 1;

    @media only screen and (max-width: 600px) {
        position : fixed;
        bottom : 0;
        display: flex;
        flex-direction: row;
        width: 100vw;
    }
`;

export default function FiltersandLegend({ leaders }) {

    const [filtersOpen, setFiltersOpen] = useState(false);
    
    const animating = useRef(false);

    const ctx = useContext(ElectionsContext);

    return (
        <Container>
            <FilterPane {...{setFiltersOpen, filtersOpen, ctx, animating}}/>
            <FilterButton {...{setFiltersOpen, filtersOpen, animating}}/>
            <Legend {...{leaders}} scaleColors={ctx.scaleColors}/>
        </Container>
    );
}