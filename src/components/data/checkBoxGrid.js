import styled from "styled-components";
import { useContext } from "react";
import { ElectionsContext } from "../../contexts";
import CustomCheck from "./inputs/custom_check";

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 12px;
    @media only screen and (max-height: 700px) {
        grid-gap: 6px;
    }
`;

export default function CheckBoxList({ list = ['PTI', 'PMLN', 'PPP', 'TLP', 'ANP', 'IPP', 'BBP'], stateVar, stateFunction }) {

    const ctx = useContext(ElectionsContext);

    return (
        <Grid>
            {list.length > 0 && list.map((item, index) => {
                return <CustomCheck key={'item' + item + index} value={item} filterList={stateVar} callBackFunc={stateFunction}/>
            })}
        </Grid>
    )
};