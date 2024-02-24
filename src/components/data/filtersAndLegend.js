import styled from "styled-components";
import { useState, useContext } from "react";
import { ElectionsContext } from "../../contexts";
import FilterButton from "./inputs/filter_button";
import FilterPane from "./filters";
import Legend from './legend';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function FiltersandLegend({ leaders }) {

    const [filtersOpen, setFiltersOpen] = useState(false);

    const ctx = useContext(ElectionsContext);

    return (
        <Container>
            <FilterPane {...{setFiltersOpen, filtersOpen, ctx}}/>
            <FilterButton {...{setFiltersOpen, filtersOpen}}/>
            <Legend {...{leaders}}/>
        </Container>
    );
}