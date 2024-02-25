import styled from "styled-components";
import styles from './css/map.module.css';
import { useEffect, useRef, useContext } from "react";
import { GridCanvas } from "./gridCanvas";
import { contrast, partyScale } from "../../utilities";
import gsap, { Power2 } from "gsap";
import { calcTooltipPosition } from "../../utilities";
import { ElectionsContext } from "../../contexts";
import { yearStates } from "../../utilities";
import { select, selectAll, remove } from "d3";


export default function RenderMap() {

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
            viewBoxHeight: currentYear === '1970' ? 2200: 1400,
            gridData: currentYear === '2024' && firebaseData ? yearStates[currentYear].data : yearStates[currentYear].data,
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


            const gridGrps = elecGridCanvas
                .appendGridGrps({}, { id: (d) => `const-${d.id}` })
                .appendGridRects({
                    fill: getWinColor,
                })
                .appendPropRects({
                    fill: getWinColor,
                })
                .appendGridLabels(
                    {},
                    {
                        fill: (d) => (contrast(getWinColor(d), "#000000") > 6 ? "black" : "#ddd"),
                        dx: 19.5,
                        dy: 25,
                        "font-family": "sans-serif",
                    },
                    {
                        "user-select": "none",
                    }
                )
                .event(
                    "gridGrps",
                    "mouseover",
                    (canvas) => function (e, d) {
                        const { mode } = canvas;
                        const rectGrp = select(this);
                        rectGrp.raise();
                        const rect = rectGrp.select("rect.grid-rect");
                        
                        rect.attr("stroke", mode === "party" ? "#212121" : "grey")
                            .attr("rx", 1)
                            .attr("ry", 1)
                            .attr("stroke-width", mode === "party" ? 5 : 4)

                        
                        setTooltipData({
                            position: calcTooltipPosition(e.pageX, e.pageY),
                            seatData: {seat: `NA ${d.id}`, loc: d.region},
                            data: d.result,
                            turnout: d.voterTurnout,
                            margin: d.voteMargin
                        });


                        setShowTooltip(true);
                    }
                )
                .event(
                    "gridGrps",
                    "mouseout",
                    (canvas) => function () {
                        const rect = select(this).select("rect.grid-rect");
                        select("title").remove();
                        rect.attr("stroke", "none")
                            .attr("rx", 0)
                            .attr("ry", 0);
                        setShowTooltip(false);
                    }
                );
                //.updateMode("party");

            setGridGrps(gridGrps);

            setTriggerRedraw(false);

            gsap.to(mapContainer.current, {opacity: 1, transform: 'translateY(0px)', duration: 0.3});
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
    opacity: 0;
    transform: translateY(30px);
    align-self: center;

    @media only screen and (max-width: 500px) {
        min-height: ${props => props.$increaseHeight ? `183vh` :` 115vh`};
        width: 100vw;
    }
`;


