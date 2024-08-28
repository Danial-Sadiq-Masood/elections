import styled from "styled-components";
import LandingHeading from "../components/landing/heading";
import styles from "./styles/data.module.css";
import Leading from "../components/data/leading";
import FiltersandLegend from "../components/data/filtersAndLegend";
import { ElectionsContext } from "../contexts";
import RenderChoropleth from "../components/map/renderChoropleth";
import RenderGridMap from "../components/map/renderGridMap";
import RenderParliamentChart from "../components/map/renderParliamentChart";
import MapModes from "../components/data/mapModes";
import { yearStates } from "../utilities";
import Disclaimer from "../components/map/disclaimer";
import { scaleSqrt, max } from "d3";
import { actor as choroplethActor }  from "../components/map/choropethMachine"
import *  as zoom from "svg-pan-zoom"
import { partyVotes } from "../utilities";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Tooltip from "../components/map/tooltip";
import ReactGA from "react-ga4";

import { getElectionSummary, getElectionSummaryTopBar } from "../utilities";

window.zoom = zoom;

const Container = styled.div`
  position: relative;
  padding: 20px 0px 20px 0px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    padding-bottom : 100px;
  }

`;

const Content = styled.div`
  box-sizing: border-box;
  padding: var(--navPadding);
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 600px) {
    padding-top : 18px;
    padding-bottom : 18px;
  }
`;

const viewActorMap = {
  "choropleth" : choroplethActor,
  "gridMap" : {send : ()=>{}},
  "parliamentChart" : {send : ()=>{}} 
}

export default function DataView({ mapType }) {

  const [votesKey, setVotesKey] = useState("declaredVotes");

  const [currentActor, setCurrentActor] = useState(viewActorMap[mapType]);

  const [partyFilters, setPartyFilters] = useState([]);
  const [runnerUpFilters, setRunnerUpFilters] = useState([]);
  const [regionFilters, setRegionFilters] = useState([]);
  const [voteMargin, setVoteMargin] = useState([0, 100]);
  const [voterTurnout, setVoterTurnout] = useState([0, 100]);
  const [disputedSeatsFilter, setDisputedSeatsFilter] = useState([]);
  const [naSeatsFilter, setNaSeatsFilter] = useState([]);

  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipData, setTooltipData] = useState(null);

  const [mapIn, bringMapIn] = useState(false);

  const [mobileTranslate, setMobileTranslate] = useState(0);

  const [triggerRedraw, setTriggerRedraw] = useState(false);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Elections Data" });
  }, []);

  useEffect(() => {
    const nofiltersApplied =
      [partyFilters, runnerUpFilters, regionFilters, disputedSeatsFilter, naSeatsFilter]
        .filter((d) => d.length > 0)
    console.log(nofiltersApplied);
    if (nofiltersApplied.length === 0) {
      currentActor.send({
        type: 'removeFilters'
      })
      console.log('removing filters');
    } else {
      const filtersObj = {
        winnerArr: partyFilters,
        runnerUpArr: runnerUpFilters,
        provincesArr: regionFilters,
        votesKey: votesKey,
        disputedSeats: disputedSeatsFilter,
        naSeatsArr: naSeatsFilter
      };

      currentActor.send({
        type: 'applyFilters',
        filters: filtersObj
      });
    }

  }, [partyFilters, runnerUpFilters, regionFilters, voteMargin, voterTurnout, disputedSeatsFilter, naSeatsFilter]);

  function moveMap(direction) {
    if (direction === "left" && mobileTranslate !== 60) {
      setMobileTranslate(mobileTranslate + 60);
    } else if (direction === "right" && mobileTranslate !== -60) {
      setMobileTranslate(mobileTranslate - 60);
    }
  }

  let mapJSX;

  if (mapType === "choropleth") {
    mapJSX = <RenderChoropleth />
  } else if (mapType === "gridMap") {
    mapJSX = <RenderGridMap />
  } else {
    mapJSX = <RenderParliamentChart />
  }
  return (
    <>
      <Container>
        <ElectionsContext.Provider
          value={{
            votesKey,
            partyFilters,
            setPartyFilters,
            runnerUpFilters,
            setRunnerUpFilters,
            regionFilters,
            setRegionFilters,
            voteMargin,
            setVoteMargin,
            voterTurnout,
            setVoterTurnout,
            mapIn,
            setTooltipData,
            setShowTooltip,
            mobileTranslate,
            setMobileTranslate,
            triggerRedraw,
            setTriggerRedraw,
            actor : currentActor,
            setCurrentActor,
            mapType,
            disputedSeatsFilter,
            setDisputedSeatsFilter,
            naSeatsFilter,
            setNaSeatsFilter
          }}
        >
          <Content>
            <TopBar
              {...{ bringMapIn, currentYear: '2024' }}
              leaders={
                getElectionSummaryTopBar(yearStates[2024].data, votesKey)
              }
              votesKey={votesKey}
            />
            <MapModes
              setVotesKey={setVotesKey}
              votesKey={votesKey}
            />
          </Content>
          {
            mapJSX
          }
          <FiltersandLegend
            leaders={getElectionSummary(yearStates[2024].data, 0, votesKey)}
          />
        </ElectionsContext.Provider>
      </Container>
      <Tooltip {...{ showTooltip, toolTipData, votesKey }} />
    </>
  );
}

const Arrow = styled.div`
  position: fixed;
  top: 44vh;
  height: 6vh;
  width: 4vh;
  font-size: 1.8rem;
  background-color: #e0e0e0;
  left: ${(props) => (props.$left ? `0px` : `auto`)};
  right: ${(props) => (props.$right ? `0px` : `auto`)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  @media only screen and (min-width: 501px) {
    display: none;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transform: translateY(-10px);
  opacity: 0;
`;

const Leaders = styled.div`
  display: flex;
  flex-direction: row;
`;

const HideonMobile = styled.div`
  display: block;

  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

function getCircleSize(leaders, index) {
  const seatArr = leaders.map((leader) => leader.seats);
  const maxSeats = max(seatArr);
  const radScale = scaleSqrt().domain([0, maxSeats]).range([0, 30]);
  return radScale(leaders[index].seats);
}

function TopBar({
  bringMapIn,
  votesKey,
  leaders = [
    { party: "I-PTI", seats: 116, color: "#9C27B0" },
    { party: "PMLN", seats: 64, color: "#66BB6A" },
    { party: "PPPP", seats: 43, color: "#757575" },
  ],
}) {
  const topbarRef = useRef();

  useEffect(() => {
    gsap.to(topbarRef.current, {
      opacity: 1,
      transform: "translateY(0px)",
      duration: 0.7,
      onComplete: () => bringMapIn(true),
    });
  }, []);

  return (
    <TopContainer ref={topbarRef}>
      <HideonMobile>
        <LandingHeading
          classname={`${styles.heading}`}
          heading={`Elections 2024`}
          charDelay={0.01}
        />
      </HideonMobile>
      <Leaders>
        {leaders.slice(0, 3).map((leader, index) => {
          return (
            <div key={`leader${index}`}>
              <Leading
                party={leader.party === "undefined" ? `IND` : leader.party}
                seats={leader.seats}
                color={leader.party === "undefined" ? "#ddd" : leader.color}
                size={getCircleSize(leaders, index)}
                votes={partyVotes[leader.party][votesKey]}
              ></Leading>
            </div>
          );
        })}
      </Leaders>
    </TopContainer>
  );
}
