import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.button`
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #56068C;
    border-radius: 150px;
    padding: 8px 15px;
    background-color: #FBF8F8;
    transition: 0.2s ease;

    &.active {
        background-color: #56068C;
        color: white;
    }

    @media only screen and (max-height: 700px) {
        padding: 6px 10px;
    }   
`;

const Name = styled.p`
    font-size: 0.8rem;
`;

export default function CustomCheck({ value = 'abcd', callBackFunc, filterList }) {

    const cont = useRef();
    const plus = useRef();

    useEffect(() => {
        if (filterList.length > 0 && filterList.includes(value)) {
            cont.current.classList.add('active');
            plus.current.classList.add('active'); 
        }
        else {
            cont.current.classList.remove('active');
            plus.current.classList.remove('active'); 
        }
    }, [filterList])

    function processClick() {
        if(filterList.includes(value)) {
            const filters = [...filterList];
            const index = filters.indexOf(value);
            filters.splice(index, 1);
            callBackFunc(filters);
        }
        else {
            const filters = [...filterList]; 
            filters.push(value);
            callBackFunc(filters);
        }
    }

    return (
        <Container ref={cont} onClick={() => processClick()}>
            <PlusSign innerRef={plus}/>
            <Name>{value}</Name>
        </Container>
    )
}

const Plus = styled.div`
    position: relative;
    width: 16px;
    height: 16px;

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        left: 6px;
        width: 4px;
        height: 100%;
        background-color: var(--deepblue);
        transition: all 0.3s ease;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0px;
        bottom: 6px;
        width: 100%;
        height: 4px;
        background-color: var(--deepblue);
        transition: all 0.5s ease;
    }

    &.active {
        &::before {
            transform: rotate(45deg);
            background-color: var(--white);
        }
        &::after {
            transform: rotate(45deg);
            background-color: var(--white);
        }
    }

`;

function PlusSign({ innerRef}) {
    return (
        <Plus ref={innerRef}/>
    )
};