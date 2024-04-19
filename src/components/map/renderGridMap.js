import styled from "styled-components";
import styles from './css/map.module.css';
import { useEffect, useRef, useContext, useState } from "react";
import { GridCanvas, gridMapMachine } from "./gridCanvas";
import { createActor } from "xstate";
import { partyScale } from "../../utilities";
import gsap, { Power2 } from "gsap";
import { calcTooltipPosition } from "../../utilities";
import { ElectionsContext } from "../../contexts";
import { yearStates } from "../../utilities";
import { select } from "d3";
import AlertDialog from "../data/ResultPopup";


export default function RenderGridMap() {

    const mapContainer = useRef();

    const { mapIn, votesKey, triggerRedraw, setTooltipData, setShowTooltip, mobileTranslate, currentYear, setCurrentActor } = useContext(ElectionsContext);

    const [open, setOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({ seatData: {} });

    const handleClickOpen = (data) => {
        setPopUpData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

            const gridActor = createActor(gridMapMachine,{
                input : {
                    gridCanvas : elecGridCanvas,
                    setTooltipData,
                    calcTooltipPosition,
                    setShowTooltip,
                    votesKey,
                    handleClickOpen,
                    handleClose
                }
            })

            setCurrentActor(gridActor)
            gridActor.start();
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
        <MapContainer $increaseHeight={currentYear === '1970'} ref={mapContainer}>
            <AlertDialog
                {...{
                    open,
                    handleClickOpen,
                    handleClose,
                    popUpData,
                    votesKey
                }}
            />
        </MapContainer>
    )
};

const MapContainer = styled.div`
    position: relative;
    opacity: 1;
    transform: translateY(30px);
    align-self: center;

    @media only screen and (max-width: 500px) {
        width: 100vw;
    }
`;


