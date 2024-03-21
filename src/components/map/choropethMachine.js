import * as d3 from "d3";
import { attrs, styles, contrast, partyScale } from "../../utilities";

import { PTI_Data } from "./translatedGrids/ptiData";
import { data } from "./translatedGrids/form45data";

import { createMachine , createActor, fromPromise, assign } from 'xstate';

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

const filterAnimation = (filterObj, key) => {
  return new Promise(res => {
    d3.selectAll('path[data-seat-num]')
    .transition()
    .duration(250)
    .style("opacity", (d) => (filterConstit(d, filterObj, key) ? 1 : 0.2))
    .style("pointer-events", (d) =>
      filterConstit(d, filterObj, key) ? "auto" : "none",
    )
    .style('fill', (d) => getWinColor(d, key))
    .on("end",res);
  })
}

const removefilterAnimation = () => {
  return new Promise(res => {
    d3.selectAll('path[data-seat-num]')
    .transition()
    .duration(250)
    .style("opacity", (d) => (1))
    .style("pointer-events", "auto")
    .on("end",res);
  })
}

function filterConstit(entry, filterObj, key) {
  const { winnerArr, runnerUpArr, turnoutArr, marginArr, provincesArr} =
    filterObj;

  return [
    !provincesArr.length > 0 || provincesArr.includes(entry.province),
    !winnerArr.length > 0 || winnerArr.includes(getWinner(entry,key).party),
    !runnerUpArr.length > 0 || runnerUpArr.includes(getLoser(entry,key).party)
  ]
  .every(d => d);
  
}

window.initAnimation = initAnimation;

const mapMachine = createMachine({
  id: 'map',
  initial: 'animating',
  context: ({input}) => ({
    filters: {},
    votesKey : 'declaredVotes'
    //d3Selection : input.selection,
    //filteredSelection : input.selection
  }),
  states: {
    'animating' : {
      id : 'animating',
      initial : 'firstRender',
      states : {
        'firstRender' : {
          invoke : {
            id : 'firstRenderAnimate',
            src : fromPromise(initAnimation),
            onDone : {
              target : '#interactive'
            }
          }         
        },
        'dataKeyChange' : {
          invoke : {
            id : 'dataKeyChange',
            input: ({ context: { votesKey } }) => votesKey,
            src : fromPromise(({input})=>{
              return flipAnimation(input);
            }),
            onDone : {
              target : '#interactive.unfiltered'
            }
          }         
        },
        'applyFilter' : {
          invoke : {
            id : 'applyFilter',
            input: ({ context }) => context,
            src : fromPromise(({input})=>{
              return filterAnimation(input.filters, input.votesKey);
            }),
            onDone : {
              target : '#interactive.filtered'
            }
          }         
        },
        'removeFilter' : {
          invoke : {
            id : 'removeFilter',
            input: ({ context: { filters } }) => filters,
            src : fromPromise(removefilterAnimation),
            onDone : {
              target : '#interactive.unfiltered'
            }
          }         
        }
      }
    },
    'interactive' : {
      id : 'interactive',
      initial : 'unfiltered',
      on : {
        'applyFilters' : {
          target : '#animating.applyFilter',
          actions : assign({
            filters : ({event}) => event.filters,
            votesKey : ({context}) => context.votesKey
          })
        },
        'removeFilters' : {
          target : '#animating.removeFilter'
        }
      },
      states : {
        'filtered' : {
          on : {
            'changeVotesKey' : {
              target : '#animating.applyFilter',
              actions : [
                (data) => console.log(data),
                assign({
                filters : ({context}) => context.filters,
                votesKey : ({event}) => event.votesKey
              })]
            }
          }
        },
        'unfiltered' : {
          on : {
            'changeVotesKey' : {
              actions : assign({
                filters : ({context}) => context.filters,
                votesKey : ({event}) => event.votesKey
              }),
              target : '#animating.dataKeyChange'
            }
          }
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

function getNewContext({event, context}, newValsObj){
  return assign({
    ...context,
    ...newValsObj
  })
}

window.mapMachine = mapMachine;

const actor = createActor(mapMachine);
//actor.start();

//window.actor = actor;

export { mapMachine , actor };