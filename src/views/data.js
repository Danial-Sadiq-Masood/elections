import styled from "styled-components";
import Navbar from "../components/navbar";
import LandingHeading from "../components/landing/heading";
import styles from "./styles/data.module.css";
import Leading from "../components/data/leading";
import FiltersandLegend from "../components/data/filtersAndLegend";
import { ElectionsContext } from "../contexts";
import RenderMap from "../components/map/renderMap";
import MapModes from "../components/data/mapModes";
import DataSource from "../components/data/dataSource";
import { yearStates } from "../utilities";
import Disclaimer from "../components/map/disclaimer";
import { sum, scaleSqrt, max } from "d3";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Tooltip from "../components/map/tooltip";
import ReactGA from "react-ga4";
import * as dbFuncs from "firebase/database";
import { AppContext } from "../contexts";
import { useContext } from "react";
import { turnoutAndVotes } from "../components/map/turnout/turnoutAndVotes";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { disableTurnout, getElectionSummary, getElectionSummaryTopBar } from "../utilities";

import { PTI_Data } from "../components/map/translatedGrids/ptiData";

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

export default function Data() {
  const [currentYear, setCurrentYear] = useState("2024");
  const [partyFilters, setPartyFilters] = useState([]);
  const [runnerUpFilters, setRunnerUpFilters] = useState([]);
  const [regionFilters, setRegionFilters] = useState([]);
  const [voteMargin, setVoteMargin] = useState([0, 100]);
  const [voterTurnout, setVoterTurnout] = useState([0, 100]);
  const [gridGrps, setGridGrps] = useState(null);
  const [mapMode, setMapMode] = useState("Winning Party");
  const [votesKey, setVotesKey] = useState("declaredVotes");

  const [firebaseData, setFbData] = useState(null);

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

  function transformData(dataServer) {
    let data24 = yearStates["2024"].data;
    data24.forEach((constit, index) => {
      constit.result = dataServer[index].result;
      constit.result.forEach((candidate) => {
        const intVotes = parseInt(candidate.votes);
        candidate.votes = Number.isNaN(intVotes) ? 0 : intVotes;
      });

      constit.result = constit.result
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 2);

      constit.result.forEach((entry) => {
        if (entry.party === "Ind.") {
          entry.party = "Ind*";
        } else if (entry.party === "JUIF") {
          entry.party = "JUI-F";
        } else if (entry.party === "JIP") {
          entry.party = "JI";
        } else if (entry.party === "MQM-P") {
          entry.party = "MQM";
        }
      });

      constit.result = constit.result
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 2);

      if (turnoutAndVotes[index].seat === constit.seat) {
        constit.totalVotes = turnoutAndVotes[index].totalVotes;
        constit.voterTurnout = turnoutAndVotes[index].voterTurnout;
      } else {
        console.error("seats do not match!");
      }

      constit.voteMargin =
        constit.totalVotes === undefined ? "N/A" : stdMargin(constit);
    });

    //yearStates["2024"].data = PTI_Data;
    window.ecp_data = data24;
    data24 = PTI_Data;

    setFbData(data24);
  }

  //console.log(firebaseData);

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
    if (gridGrps) {
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
    }
  }, [partyFilters, runnerUpFilters, regionFilters, voteMargin, voterTurnout]);

  useEffect(() => {
    resetModeAndFilters();
    ReactGA.event({
      category: "Change Year",
      action: "click",
      value: parseInt(currentYear),
    });
  }, [currentYear]);

  function moveMap(direction) {
    if (direction === "left" && mobileTranslate !== 60) {
      setMobileTranslate(mobileTranslate + 60);
    } else if (direction === "right" && mobileTranslate !== -60) {
      setMobileTranslate(mobileTranslate - 60);
    }
  }

  function resetModeAndFilters() {
    setMapMode("Winning Party");
    setPartyFilters([]);
    setRegionFilters([]);
    setVoteMargin([0, 100]);
    setVoterTurnout([0, 100]);
  }

  return (
    <>
      <Container>
        <ElectionsContext.Provider
          value={{
            votesKey,
            currentYear,
            setCurrentYear,
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
            mapMode,
            setMapMode,
            mapIn,
            setGridGrps,
            setTooltipData,
            setShowTooltip,
            mobileTranslate,
            setMobileTranslate,
            firebaseData,
            triggerRedraw,
            setTriggerRedraw,
          }}
        >
          <Navbar></Navbar>
          <Content>
            <TopBar
              {...{ bringMapIn, currentYear, firebaseData }}
              leaders={
                getElectionSummaryTopBar(yearStates[currentYear].data,votesKey)
              }
            />
            <MapModes
              state={mapMode}
              currentYear={currentYear}
              stateFunction={setMapMode}
              mapState={gridGrps}
              setVotesKey={setVotesKey}
              votesKey={votesKey}
            />
          </Content>
          <RenderMap />
          <FiltersandLegend
            leaders={getElectionSummary(yearStates[currentYear].data,0,votesKey)}
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
  currentYear,
  bringMapIn,
  firebaseData,
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
          heading={`Elections ${currentYear}`}
          charDelay={0.01}
        />
      </HideonMobile>
      <Leaders>
        {leaders.slice(0, 3).map((leader, index) => {
          return (
            <div key={`leader${index}`}>
              <Leading
                party={leader.party === "undefined" ? `Ind` : leader.party}
                seats={leader.seats}
                color={leader.party === "undefined" ? "#ddd" : leader.color}
                size={getCircleSize(leaders, index)}
              ></Leading>
            </div>
          );
        })}
      </Leaders>
    </TopContainer>
  );
}
