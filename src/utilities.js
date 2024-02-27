import { scaleOrdinal } from "d3";

import elections1970 from './components/map/translatedGrids/elections1970.json';
import elections1977 from './components/map/translatedGrids/elections1977.json';
import elections1985 from './components/map/translatedGrids/elections1985.json';
import elections1988 from './components/map/translatedGrids/elections1988.json';
import elections1990 from './components/map/translatedGrids/elections1990.json';
import elections1993 from './components/map/translatedGrids/elections1993.json';
import elections1997 from './components/map/translatedGrids/elections1997.json';
import elections2002 from './components/map/translatedGrids/elections2002.json';
import elections2008 from './components/map/translatedGrids/elections2008.json';
import elections2013 from './components/map/translatedGrids/elections2013.json';
import elections2018 from './components/map/translatedGrids/elections2018.json';
import elections2024 from './components/map/translatedGrids/elections2024.json';
import elections2024ECP from './components/map/translatedGrids/elections2024ecp.json';

window.ecp_data = elections2024ECP;

elections2024ECP.forEach(d => {
  d.result.forEach((e)=>{
    e.voteDifference = Math.abs((e.declaredVotes - e.actualVotes))/e.declaredVotes;
  })
})

elections2024ECP.forEach(d => {
  /*if(d.province === 'KP'){
    d.xGrid -= 0.8
    d.yGrid -= 0.8
  }
  if(d.province === 'Sindh'){
    d.xGrid += 0.2
    d.yGrid += 0.2
  }*/
})

export function getWinner(d,key='votes'){
  return d.reduce((acc,e)=>e[key] > acc[key] ? e : acc)
}

export function getLoser(d,key='votes'){
  return d.reduce((acc,e)=>e[key] < acc[key] ? e : acc)
}

const size = {
    never: '20px',
    fold: '150px',
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopM: '1200px',
    laptopL: '1440px',
    desktop: '1600px',
    desktopL: '2560px'
  }

  export const device = {
    never: `(min-width: ${size.never})`,
    fold: `(min-width: ${size.fold})`,
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    tabletH: `(min-height: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopM: `(min-width: ${size.laptopM})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktopL})`
  };

  export const applyClasses = (styles, classNames) => {
      let classList = "";
      classNames.forEach((el, i) => {
          const sep = i === 0 ? "" : " ";
          classList = classList + sep + styles[el];
      });
      return classList;
  }

export const yearStates = {
    '2024': {
      parties: ['Ind*', 'PML-N', 'PPP', 'MQM', 'Ind', 'IPP', 'JUI-F'],
      runnerups: ['Ind*', 'PML-N', 'PPP', 'MQM', 'Ind', 'IPP', 'JUI-F'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT'],
      data: elections2024ECP
    },
    '2018': {
      parties: ['PTI', 'PML-N', 'PPP', 'MMA', 'Ind', 'MQM', 'PML-Q', 'BAP', 'GDA', 'BNP', 'ANP', 'AML'],
      runnerups: ['PTI', 'PML-N', 'Ind', 'MMA', 'PPP', 'GDA', 'ANP', 'MQM', 'BNP', 'TLP', 'SUP', 'PKMAP'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections2018
    },
    '2013': {
      parties: ['PML-N', 'PPP', 'Ind', 'PTI', 'MQM', 'JUI-F', 'PML-F', 'JI', 'PKMAP', 'PML-Q', 'NPP', 'QWP-S'],
      runnerups: ['PTI', 'PPP', 'Ind', 'PML-N', 'JUI-F', 'PML-Q', 'PML-F', 'ANP', 'JI', 'MQM', 'BNAP', 'SUP'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections2013
    },
    '2008': {
      parties: ['PPP', 'PML-N', 'PML-Q', 'Ind', 'MQM', 'ANP', 'MMA', 'PML-F', 'PPP-S', 'NPP', 'BNP-A'],
      runnerups: ['PML-Q', 'PPP', 'Ind', 'PML-N', 'ANP', 'MMA', 'PML-F', 'MQM', 'PPP-S', 'JUI-S', 'PDP', 'PCM'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections2008
    },
    '2002': {
      parties: ['PML-Q', 'PPP', 'MMA', 'Ind', 'PML-N', 'NA', 'MQM', 'PML-F', 'PML-J', 'PPP-S', 'PTI', 'PAT'],
      runnerups: ['PPP', 'PML-Q', 'PML-N', 'Ind', 'MMA', 'ANP', 'NA', 'MQM', 'BNM', 'PKMAP', 'PML-J', 'TI'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections2002
    },
    '1997': {
      parties: ['PML-N', 'Ind', 'PPP', 'MQM', 'ANP', 'BNP', 'JUI-F', 'JWP', 'PPP-SB', 'NPP'],
      runnerups: ['PPP', 'Ind', 'PML-N', 'PML-J', 'JUI-F', 'PPP-SB', 'ANP', 'MQM', 'PKMAP', 'BNM', 'JUI-S', 'PAP'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1997
    },
    '1993': {
      parties: ['PPP', 'PML-N', 'Ind', 'PML-J', 'IJM', 'ANP', 'PIF', 'PKMAP', 'MDM', 'JWP', 'PKQP', 'NDA'],
      runnerups: ['PML-N', 'PPP', 'Ind', 'IJM', 'PML-J', 'ANP', 'PIF', 'SBC', 'PNP', 'BNM-H', 'PKMAP', 'BNM-M'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1993
    },
    '1990': {
      parties: ['IJI', 'PDA', 'Ind', 'MQM', 'ANP', 'JUI-F', 'JUP-N', 'JWP', 'PNP', 'PKMAP'],
      runnerups: ['PDA', 'IJI', 'Ind', 'JUI-F', 'SNF', 'PNP', 'JUP-N', 'BNM', 'ANP', 'PAT', 'PDP', 'SNA'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1990
    },
    '1988': {
      parties: ['PPP', 'IJI', 'Ind', 'JUI-F', 'PAI', 'ANP', 'BNA', 'JUI-D', 'PDP', 'NPP-K'],
      runnerups: ['IJI', 'PPP', 'Ind', 'ANP', 'PNP', '', 'PAI', 'JUI-F', 'PDP', 'PML-MQ', 'PPIS', 'PMAI'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1988
    },
    '1985': {
      parties: ['PML-N', 'PTI', 'TLP', 'PPP', 'ANP', 'IPP', 'BBP'],
      runnerups: ['PML-N', 'PTI', 'TLP', 'PPP', 'ANP', 'IPP', 'BBP'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1985
    },
    '1977': {
      parties: ['PPP', 'PNA', 'Ind', 'PML-Q'],
      runnerups: ['PNA', 'PPP', 'Ind', 'PPNAP', 'PML-Q'],
      regions: ['Punjab', 'Sindh', 'Balochistan', 'KP', 'ICT', "FATA"],
      data: elections1977
    },
    '1970': {
      parties: ['AL', 'PPP', 'Ind', 'PML-Q', 'PML-C', 'JUI', 'MJUP', 'NAP-W', 'JI', 'PDP', 'CML'],
      runnerups: ['JI', 'PML-C', 'Ind', 'PML-Q', 'JUI-NI', 'MJUP', 'PDP', 'PPP', 'NAP-W', 'JUI', 'PNL', 'CML'],
      regions: ['East Pak', 'West Pak'],
      data: elections1970,
    },
}

export const disableTurnout = ['1977', '1985', '1988', '1990', '1993', '1997', '2002'];

//MAP UTILITIES BELOW.

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

function luminance(r, g, b) {
  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export function contrast(rgb1, rgb2) {
  var lum1 = luminance(...hexToRgbArr(rgb1));
  var lum2 = luminance(...hexToRgbArr(rgb2));
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function hexToRgbArr(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

export function attrs(selection, attrsObj) {
  if (!attrsObj) return;

  const attrsList = Object.entries(attrsObj);
  attrsList.forEach(([attr, value]) => {
    selection.attr(attr, value);
  });

  return selection;
}

export function styles(selection, stylesObj) {
  if (!stylesObj) return;

  const stylesList = Object.entries(stylesObj);
  stylesList.forEach(([attr, value]) => {
    selection.style(attr, value); // error handling? how does d3 throw errors here
  });

  return selection;
};

export const partyScale = scaleOrdinal()
  .domain([
      "PML-Q",
      "PPP",
      "PNA",
      "Ind",
      "IJI",
      "PDA",
      "MQM",
      "PML-N",
      "MMA",
      "PTI",
      "AL",
      "Ind*"
  ])
  .range([
      "#4CD0E0",
      "#757575",
      "#66BB6A",
      "#FBC02C",
      "#66BB6A",
      "#757575",
      "#F48FB1",
      "#66BB6A",
      "#4DB6AC",
      "#9D27B0",
      "#D81B60",
      "#9D27B0",
  ]);

  export function calcTooltipPosition(x, y) {
    let left, right, bottom, top;
    
    if (y < window.innerHeight*0.70) {
      top = `${y + 30}px`;
      bottom = 'unset';
    }
    else {
      bottom = `${window.innerHeight - y + 20}px`;
      top = 'unset';
    } 

    left = `${x - 145}px`;

    if (x - 145 < 15) {
      left = `15px`;
    }
    else if (x+145 > window.innerWidth) {
      left = 'unset';
      right = '25px';
    }

    return {
      top, right, bottom, left
    }
  };

  export function getElectionSummary(electionData, runnerup = 0, votesKey='votes') {
    console.log('votes key', votesKey);
    const summary = {};
    electionData.forEach((result) => {



      if (result.result[runnerup]) {
        const winParty = result.result[runnerup].party;


        if (result.result.length === 1) {
          if (summary[winParty]) {
            summary[winParty]++;
          } else {
            summary[winParty] = 1;
          }
        }
        else {
          if (result.result[0][votesKey] === result.result[1][votesKey]) {
            if (summary[winParty]) {
              summary[winParty]+=0;
            } else {
              summary[winParty] = 0;
            }
          }
          else {
            if (summary[winParty]) {
              summary[winParty]++;
            } else {
              summary[winParty] = 1;
            }
          } 
        }  

      }
  
      result.result = result.result.slice(0, 2);
    });

    const partiesSorted = Object.entries(summary)
      .sort((a, b) => b[1] - a[1]);

    let returnValue = [];
    partiesSorted.forEach((entry, index) => {
      returnValue[index] = {
        party: entry[0],
        seats: entry[1],
        color: partyScale.domain().includes(entry[0]) ? partyScale(entry[0]) : "#dddddd"
      }
    });
    return returnValue;
  };

  export function getElectionSummaryTopBar(electionData, votesKey='votes') {
    let summary = electionData.reduce((acc,d)=>{
      let winner = getWinner(d.result,votesKey);
      acc[winner.party] = acc[winner.party] ? acc[winner.party] + 1 : 1 ;
      return acc;
    },{});

    const partiesSorted = Object.entries(summary)
      .sort((a, b) => b[1] - a[1]);

    return partiesSorted.map((entry, index) => {
      return {
        party: entry[0],
        seats: entry[1],
        color: partyScale.domain().includes(entry[0]) ? partyScale(entry[0]) : "#dddddd"
      }
    });
  };

  export const Dictionary = {
      Ind: "Independent",
      MMA: "Muttahida Majlis-e-Amal",
      "PPP-S": "Pakistan People's Party (Sherpao)",
      "PML-Q": "Pakistan Muslim League (Q)",
      "PML-C": "Pakistan Muslim League (Council)",
      CML: "Conventional Muslim League",
      PPP: "Pakistan People's Party",
      "PML-N": "Pakistan Muslim League (Nawaz)",
      NA: "National Alliance",
      PTI: "Pakistan Tehrik-e-Insaf",
      "PML-J": "Pakistan Muslim League (Junejo)",
      PAT: "Pakistan Awami Tehreek",
      SPP: "Shia Political Party",
      "PML-Z": "Pakistan Muslim League (Zia)",
      "PML-F": "Pakistan Muslim League (Functional)",
      MQM: "Muttahida Qaumi Movement",
      "MQM-H": "Muttahida Qaumi Movement (Haqiqi)",
      PKMAP: "Pakhtunkhwa Milli Awami Party",
      JWP: "Jamhoori Watan Party",
      BNP: "Balochistan National Party",
      "BNP-A": "Balochistan National Party (Awami)",
      ANP: "Awami National Party",
      TI: "Tehrik-e-Istiqlal",
      PDP: "Pakistan Democratic Party",
      BNM: "Balochistan National Movement",
      "BNM-M": "Balochistan National Movement (Mengal)",
      "BNM-H": "Balochistan National Movement (Hayee)",
      "PPP-SB": "Pakistan People's Party (Shaheed Bhutto)",
      NPP: "National People's Party",
      "NPP-K": "National People's Party (Khar)",
      JUI: "Jamiat Ulema-e-Islam",
      "JUI-NI": "Jamiat Ulema-e-Islam + Nizam e Islam",
      "JUI-F": "Jamiat Ulema-e-Islam (Fazl)",
      "JUI-S": "Jamiat Ulema-e-Islam (Sami)",
      "JUI-N": "Jamiat Ulema-e-Islam (Noorani)",
      MIP: "Milli Ittehad Pakistan",
      IJM: "Islamic Jamhoori Mahaz",
      MDM: "Muttahida Deeni Mahaz",
      PKQP: "Pakhtunkhwa Qaumi Party",
      PIF: "Pakistan Islamic Front",
      NDA: "National Democratic Alliance",
      IJI: "Islami Jamhoori Ittehad",
      "JUI-D": "Jamiat Ulema-e-Islam (Darkhasti)",
      PAI: "Pakistan Awami Ittehad",
      BNA: "Balochistan National Alliance",
      "PML-MQ": "Pakistan Muslim League (MQ)",
      PNP: "Pakistan National Party",
      PMAI: "Pakistan Milli Awami Ittehad",
      PDA: "People's Democratic Alliance",
      "JUP-N": "Jamiat Ulema-e-Pakistan (Noorani)",
      SNF: "Sindh National Front",
      SNA: "Sindh National Alliance",
      "AT-PG": "Awami Tehreek (Paleejo Group)",
      PNA: "Pakistan National Alliance",
      PPNAP: "Pakistan Pakhtunkhwa National Awami Party",
      NP: "National Party",
      SUP: "Sindh United Party",
      AML: "Awami Muslim League",
      PCM: "Pakistan Citizen's Movement",
      "QWP-S": "Qaumi Watan Party (Sherpao)",
      AJI: "Awami Jamhoori Ittehad",
      APML: "All Pakistan Muslim League",
      JI: "Jamat e Islami",
      BNAP: "Bahawalpur National Awami Party",
      STP: "Sindh Taraqi Passand Party",
      BAP: "Balochistan Awami Party",
      GDA: "Grand Democratic Alliance",
      TLP: "Tehreek-e-Labbaik Pakistan",
      PAR: "Pakistan Awami Raj",
      PRP: "Pakistan Rah-e-haq Party",
      "NAP-W": "National Awami Party (Wali)",
      "NAP-B": "National Awami Party (Bhashani)",
      MJUP: "Markazi Jamiat Ulema-e-Pakistan",
      AL: "Awami League",
      PNL: "Pakistan National League",
      MJAH: "Markazi Jamiat-e-Ahle-Hadees",
      JGMD: "Jatiya Gana Mukti Dal",
      IGD: "Islami Gonotontri Dal",
      IPP: "Istehkam-e-Pakistan Party",
      "Ind*": "Independent (PTI Backed)",
  };