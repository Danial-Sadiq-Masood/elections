import styled from "styled-components";
import styles from './css/map.module.css';
import { useEffect, useRef, useContext } from "react";
import { GridCanvas, gridMapMachine } from "./gridCanvas";
import { createActor } from "xstate";
import { contrast, partyScale } from "../../utilities";
import gsap, { Power2 } from "gsap";
import { calcTooltipPosition } from "../../utilities";
import { ElectionsContext } from "../../contexts";
import { yearStates } from "../../utilities";
import { select, selectAll, remove } from "d3";


export default function RenderGridMap() {

    const mapContainer = useRef();

    const { mapIn, votesKey, triggerRedraw, setTriggerRedraw, setGridGrps, setTooltipData, setShowTooltip, mobileTranslate, currentYear, firebaseData } = useContext(ElectionsContext);

    useEffect(() => {
        //Draw D3 Map here
        
        if (!triggerRedraw) {
            select(mapContainer.current).selectAll().remove('*');
        }

        const elecGridCanvas = new GridCanvas({
            parentRef: mapContainer.current,
            containerClassName: styles['mapContainer'],
            viewBoxWidth: 1280,
            viewBoxHeight: 1400,
            gridData: yearStates['2024'].data,
            cellSize: 40,
            cellMargin: 1,
        });
        console.log(elecGridCanvas);
        window.elecGridCanvas = elecGridCanvas;

        if (mapIn || triggerRedraw) {
            const getWinColor = (d) => 
                d.result.length === 0 || d.result[0] && d.result[0].votes === 0 && d.result[1] && d.result[1].votes === 0
                    ? "#eeeeee"
                    : partyScale.domain().includes(d.result[0].party)
                    ? partyScale(d.result[0].party)
                    : "#dddddd"; 

                //.updateMode("party");

            //setGridGrps(gridGrps);

            //setTriggerRedraw(false);

            const gridActor = createActor(gridMapMachine,{
                input : {
                    gridCanvas : elecGridCanvas,
                    setTooltipData,
                    calcTooltipPosition,
                    setShowTooltip,
                    votesKey
                }
            })

            window.gridActor = gridActor;
            gridActor.start();
            //gsap.to(mapContainer.current, {opacity: 1, transform: 'translateY(0px)', duration: 0.3});
        }



        return () => elecGridCanvas.remove();


    }, [mapIn, currentYear, triggerRedraw]);


    useEffect(() => {
        if (window.innerWidth < 501) {
            gsap.to(mapContainer.current, {transform: `translateX(${mobileTranslate}%)`, duration: 0.65, ease: Power2.easeInOut});
        }
        else {
            mapContainer.current.style.transform = 'translate(0px,0px)';
        }
    }, [mobileTranslate]);

    return (
        <MapContainer $increaseHeight={currentYear === '1970'} ref={mapContainer}/>
    )
};

const MapContainer = styled.div`
    position: relative;
    opacity: 1;
    transform: translateY(30px);
    align-self: center;

    @media only screen and (max-width: 500px) {
        min-height: ${props => props.$increaseHeight ? `183vh` :` 115vh`};
        width: 100vw;
    }
`;


