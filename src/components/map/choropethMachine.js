import * as d3 from "d3";
import { attrs, styles, contrast, partyScale } from "../../utilities";

import { PTI_Data } from "./translatedGrids/ptiData";
import { data } from "./translatedGrids/form45data";

import { createMachine , createActor, fromPromise } from 'xstate';

window.PTI_Data = PTI_Data;
window.PTI_Data_fixed = data;

//window.select = select;

function getWinner(d,key='votes'){
  return d.result.reduce((acc,e)=>e[key] > acc[key] ? e : acc)
}

function getLoser(d,key='votes'){
  return d.result.reduce((acc,e)=>e[key] < acc[key] ? e : acc)
}

const getWinColor = (d,key='votes') =>{
  //d.result.sort((e,f) => f[key] - e[key]);
  /*return d.result.length === 0 ||
  (d.result[0] &&
    d.result[0][key] === 0 &&
    d.result[1] &&
    d.result[1][key] === 0)
    ? "#eeeeee"
    : partyScale.domain().includes(d.result[0].party)
    ? partyScale(d.result[0].party)
    : "#dddddd";*/
    if(d.result[0] &&
      d.result[0][key] === 0 &&
      d.result[1] &&
      d.result[1][key] === 0){
        return "#eeeeee"
      }
    let winner = d.result.reduce((acc,e)=>e[key] > acc[key] ? e : acc)
    return partyScale.domain().includes(winner.party)
    ? partyScale(winner.party)
    : "#dddddd";
    /*let colors = {
      'KP' : 'red',
      'Punjab' : 'yellow',
      'Sindh' : 'green',
      'Balochistan' : "blue",
      'ICT' : 'pink'
    }

    return colors[d.province]*/
  }

window.getWinColor = getWinColor;

const mockAnimation = 
  (timeout)  => new Promise(res => {
    setTimeout(res, timeout)
  });

const initAnimation = () => {
  return new Promise(res => {
    d3.select('#svgmap')
        .selectChildren()
        .transition()
        .duration(700)
        .transition()
        .duration(700)
        .delay((d,i) => Math.random() * (i/250) * 200)
        .style('opacity', 1)
        .on("end",res);
  })
}

const flipAnimation = (key) => {
  return new Promise(res => {
    d3.selectAll('path[data-seat-num]')
        .transition()
        .duration(700)
        .delay((d,i) => Math.random() * (i/250) * 200)
        .style('fill', (d) => getWinColor(d, key))
        .on("end",res);
  })
}

window.initAnimation = initAnimation;

const mapMachine = createMachine({
  id: 'map',
  initial: 'animating',
  context: {
    dataKey: "declaredVotes",
  },
  states: {
    'animating' : {
      id : 'animating',
      initial : 'firstRender',
      entry : ()=>console.log('entering animating State'),
      states : {
        'firstRender' : {
          entry : ()=>console.log('entering firstRender State'),
          invoke : {
            id : 'firstRenderAnimate',
            src : fromPromise(initAnimation),
            onDone : {
              target : '#interactive',
              actions : [()=>console.log('finished Animating')]
            }
          }         
        },
        'flipToPTI' : {
          entry : ()=>console.log('entering animating.flipToPTI State'),
          invoke : {
            id : 'flipToPTI',
            src : fromPromise(flipAnimation.bind(null,'actualVotes')),
            onDone : {
              target : '#interactive.ptiData',
              actions : [()=>console.log('finished Animating flipToPTI')]
            }
          }         
        },
        'flipToOfficial' : {
          entry : ()=>console.log('entering animating.flipToOfficial State'),
          invoke : {
            id : 'flipToOfficial',
            src : fromPromise(flipAnimation.bind(null,'declaredVotes')),
            onDone : {
              target : '#interactive.officialData',
              actions : [()=>console.log('finished Animating flipToOfficial')]
            }
          }         
        }
      }
    },
    'interactive' : {
      id : 'interactive',
      entry : ()=>console.log('entering interactive state'),
      initial : 'officialData',
      on : {
        'showPtiData' : {
          target : '#animating.flipToPTI'
        },
        'showOfficialData' : {
          target : '#animating.flipToOfficial'
        }
      },
      states : {
        'ptiData' : {
          entry : ()=>console.log('entering ptiData state')
        },
        'officialData' : {
          entry : ()=>console.log('entering officialData state')
        }
      }
    }
  },
})/*.provide({
  actions : {
    turnOn : ()=>{
      console.log('in On transition');
    }
  }
})*/


window.mapMachine = mapMachine;

const actor = createActor(mapMachine);
//actor.start();

//window.actor = actor;

export { mapMachine , actor };