import styled from "styled-components";
import { MdFilterList, MdClose } from "react-icons/md";
import { useEffect } from "react";
import gsap from "gsap";

const Container = styled.button`
    width: 50px;
    border-radius: 0px 10px 0px 0px;
    height: 60px;
    background-color: var(--deepblue);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.5rem;    
    cursor: pointer;
    border: none;
    z-index: 4;

    position: fixed;
    bottom: 0px;

    #filter, #close {
        position: absolute;
    }

    #filter {
        top: 8px;
    }

    #close {
        top: 8px;
        opacity: 0;
    }

    p {
        font-size: 0.75rem;
        margin-top: 1.5rem;
        font-weight: 600;
    }

    @media only screen and (max-width: 600px) {
        font-size: 1.8rem;
        p {
            font-size: 1rem;
        }
        position : unset;
        height : unset;
    }

    @media only screen and (min-width: 1000px) and (max-height: 570px) {
        width: 50px;
        height: 50px;
    }

`

export default function FilterButton({filtersOpen,  setFiltersOpen }) {

    useEffect(() => {
        if (filtersOpen) {
            gsap.to(document.getElementById("close"), {opacity: 1});
            gsap.to(document.getElementById("filter"), {opacity: 0});
        }
        else {
            gsap.to(document.getElementById("filter"), {opacity: 1});
            gsap.to(document.getElementById("close"), {opacity: 0});
        }
    }, [filtersOpen]);

    return (
        <Container onClick={() => setFiltersOpen(!filtersOpen)}>
            <MdFilterList id="filter"/>
            <MdClose id="close"/>
            <p>Filters</p>
        </Container>
    )
};