import styled from "styled-components";
import Navbar from "../components/navbar";
import LandingHeading from "../components/landing/heading";
import styles from "./styles/data.module.css";
import Leading from "../components/data/leading";
import FiltersandLegend from "../components/data/filtersAndLegend";
import { ElectionsContext } from "../contexts";
import RenderChoropleth from "../components/map/renderChoropleth";
import RenderGridMap from "../components/map/renderGridMap";
import RenderParliamentChart from "../components/map/renderParliamentChart";
import MapModes from "../components/data/mapModes";
import DataSource from "../components/data/dataSource";
import { yearStates } from "../utilities";
import Disclaimer from "../components/map/disclaimer";
import { sum, scaleSqrt, max } from "d3";
import { actor } from "../components/map/choropethMachine"
import *  as zoom from "svg-pan-zoom"
import { partyVotes } from "../utilities";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Tooltip from "../components/map/tooltip";
import ReactGA from "react-ga4";
import { AppContext } from "../contexts";
import { useContext } from "react";
import { turnoutAndVotes } from "../components/map/turnout/turnoutAndVotes";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { disableTurnout, getElectionSummary, getElectionSummaryTopBar } from "../utilities";

import { PTI_Data } from "../components/map/translatedGrids/ptiData";

window.zoom = zoom;

const Container = styled.div`
  position: relative;
  padding: 80px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: var(--navPadding);
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function DataView({ mapType }) {
  const [partyFilters, setPartyFilters] = useState([]);
  const [runnerUpFilters, setRunnerUpFilters] = useState([]);
  const [regionFilters, setRegionFilters] = useState([]);
  const [voteMargin, setVoteMargin] = useState([0, 100]);
  const [voterTurnout, setVoterTurnout] = useState([0, 100]);
  const [votesKey, setVotesKey] = useState("declaredVotes");
  const [disputedSeatsFilter, setDisputedSeatsFilter] = useState([]);

  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipData, setTooltipData] = useState(null);

  const [mapIn, bringMapIn] = useState(false);

  const [mobileTranslate, setMobileTranslate] = useState(0);

  const [triggerRedraw, setTriggerRedraw] = useState(false);

  const appContext = useContext(AppContext);

  const { app } = appContext;

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Elections Data" });
  }, []);

  useEffect(() => {
    if (app) {
      /*const database = dbFuncs.getDatabase(app);

      window.dbFuncs = dbFuncs;
      window.db = database;*/

      /*const dbRef = dbFuncs.ref(dbFuncs.getDatabase());

      const resRef = dbFuncs.ref(database, "results/");
      dbFuncs.onValue(resRef, (snapshot) => {
        if (snapshot.exists()) {
          resetModeAndFilters();
          transformData(snapshot.val());
          setTriggerRedraw(true);
        } else {
          console.log("No data available");
        }
      });*/
    }

  }, [app]);

  function round2Dec(num, digits) {
    const factor = 10 ** digits;
    return Math.round(num * factor) / factor;
  }

  function relativeMargin(result) {
    const sum = result[0].votes + result[1].votes;
    if (sum === 0) {
      return 0;
    }
    const diff = result[0].votes - result[1].votes;
    const margin = round2Dec((diff / sum) * 100, 1);
    return margin;
  }

  function stdMargin(constit) {
    const result = constit.result;
    const diff = result[0].votes - result[1].votes;
    const margin = round2Dec((diff / constit.totalVotes) * 100, 1);

    return margin;
  }

  useEffect(() => {
    /*if (gridGrps) {
      gridGrps.applyFilter({
        winnerArr: partyFilters,
        runnerUpArr: runnerUpFilters,
        turnoutArr: disableTurnout.includes(currentYear)
          ? undefined
          : voterTurnout,
        marginArr: voteMargin,
        provinceArr: regionFilters,
      });

      ReactGA.event({
        category: "Apply Filter",
        action: "click",
        label: "Bulk Filter Update",
      });
    }*/
    const nofiltersApplied =
      [partyFilters, runnerUpFilters, regionFilters, disputedSeatsFilter]
        .filter((d) => d.length > 0)
    console.log(nofiltersApplied);
    if (nofiltersApplied.length === 0) {
      actor.send({
        type: 'removeFilters'
      })
      console.log('removing filters');
      if (window.gridActor) {
        window.gridActor.send({
          type: 'removeFilters'
        })
      }
      if (window.parliamentActor) {
        window.parliamentActor.send({
          type: 'removeFilters'
        })
      }
    } else {
      const filtersObj = {
        winnerArr: partyFilters,
        runnerUpArr: runnerUpFilters,
        provincesArr: regionFilters,
        votesKey: votesKey,
        disputedSeats : disputedSeatsFilter
      };

      actor.send({
        type: 'applyFilters',
        filters: filtersObj
      });
      
      if (window.gridActor) {
        window.gridActor.send({
          type: 'applyFilters',
          filters: filtersObj
        })
      }
      if (window.parliamentActor) {
        window.parliamentActor.send({
          type: 'applyFilters',
          filters: filtersObj
        })
      }
    }

  }, [partyFilters, runnerUpFilters, regionFilters, voteMargin, voterTurnout, disputedSeatsFilter]);

  function moveMap(direction) {
    if (direction === "left" && mobileTranslate !== 60) {
      setMobileTranslate(mobileTranslate + 60);
    } else if (direction === "right" && mobileTranslate !== -60) {
      setMobileTranslate(mobileTranslate - 60);
    }
  }

  /*function resetModeAndFilters() {
    setMapMode("Winning Party");
    setPartyFilters([]);
    setRegionFilters([]);
    setVoteMargin([0, 100]);
    setVoterTurnout([0, 100]);
  }*/

  let mapJSX;

  if(mapType === "choropleth"){
    mapJSX = <RenderChoropleth />
  }else if(mapType === "gridMap"){
    mapJSX = <RenderGridMap />
  }else{
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
            actor,
            mapType,
            disputedSeatsFilter,
            setDisputedSeatsFilter
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
              actor={actor}
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

          <Content>
            <Disclaimer />
          </Content>

          <Arrow $left={true} onClick={() => moveMap("left")}>
            <IoIosArrowBack />
          </Arrow>
          <Arrow $right={true} onClick={() => moveMap("right")}>
            <IoIosArrowForward />
          </Arrow>
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
