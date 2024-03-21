import { select, min, max } from "d3";
import { attrs, styles, contrast, partyScale } from "../../utilities";

import { PTI_Data } from "./translatedGrids/ptiData";
import { data } from "./translatedGrids/form45data";

import { createMachine, createActor, fromPromise, assign } from 'xstate';
import gsap, { Power2 } from "gsap";

window.PTI_Data = PTI_Data;
window.PTI_Data_fixed = data;

//window.select = select;

function getWinner(d, key = 'votes') {
  return d.result.reduce((acc, e) => e[key] > acc[key] ? e : acc)
}

function getLoser(d, key = 'votes') {
  return d.result.reduce((acc, e) => e[key] < acc[key] ? e : acc)
}

const getWinColor = (d, key = 'votes') => {
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
  if (d.result[0] &&
    d.result[0][key] === 0 &&
    d.result[1] &&
    d.result[1][key] === 0) {
    return "#eeeeee"
  }
  let winner = d.result.reduce((acc, e) => e[key] > acc[key] ? e : acc)
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

// Class for GridCanvas
// Template for generating instances
class GridCanvas {
  constructor({
    parentRef,
    containerClassName = "grid-container",
    viewBoxWidth,
    viewBoxHeight,
    gridData,
    cellSize,
    cellMargin,
  }) {
    const root = select(parentRef);
    const container = root.append("div").attr("class", containerClassName);

    const svg = container
      .append("svg")
      .style("width", "100%")
      .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

    const cellWidth = cellSize - cellMargin;
    const mode = "Winning Party";

    Object.assign(this, {
      root,
      svg,
      gridData,
      cellSize,
      cellWidth,
      viewBoxWidth,
      viewBoxHeight,
      mode,
    });
  }

  addFeature(propName, callback) {
    // this can be generalized to vizCanvas (something like addDataProp - features are essentially data);
    this.gridData.forEach((grid) => (grid[propName] = callback(grid)));
  }

  remove() {
    // this can also be generalized to Viz canvas
    this.root.selectAll("*").remove();
    this.svg = null; // what about other additions (map parts?)
  }

  appendGridGrps(
    { groupId = "grid-grps" } = {},
    attrsObj = {},
    stylesObj = {}
  ) {
    const { svg, gridData, cellSize, viewBoxWidth } = this;

    const maxXY = minMaxGrid(gridData);
    const maxX = maxXY.x[1];
    const maxY = maxXY.y[1];
    const grpWidth = (maxX + 1) * 40;
    const grpHeight = (maxY + 1) * 40;
    const transX = (viewBoxWidth - grpWidth) / 2;
    const transY = 40;

    const gridG = svg
      .append("g")
      .attr("transform", `translate(${transX}, ${transY})`);

    if (groupId) {
      gridG.attr("id", groupId);
    }

    const gridGrps = gridG
      .selectAll("g.grid-grp")
      .data(gridData)
      .enter()
      .append("g")
      .attr("class", "grid-grp")
      .attr("opacity", 1)
      .attr(
        "transform",
        (d, i) => `translate(${d.xGrid * cellSize} ${d.yGrid * cellSize})`
      )
      .call(attrs, attrsObj)
      .call(styles, stylesObj);

    this.gridGrps = gridGrps;
    return this;
  }

  appendGridRects(attrsObj = {}, stylesObj = {}) {
    const { gridGrps, cellWidth } = this;

    const gridRects = gridGrps
      .append("rect")
      .attr("class", "grid-rect")
      .attr("rx", 0)
      .attr("ry", 0)
      .attr("width", cellWidth)
      .attr("height", cellWidth)
      .attr("fill-opacity", 1)
      .attr("opacity", 1)
      .attr("transform", "scale(0 0)")
      .call(attrs, attrsObj)
      .call(styles, stylesObj);

    this.gridRects = gridRects;
    return this;
  }

  appendPropRects(attrsObj = {}, stylesObj = {}) {
    const { gridGrps, cellWidth } = this;
    const propRects = gridGrps
      .append("rect")
      .attr("class", "prop-rect")
      .attr("rx", 0)
      .attr("ry", 0)
      .attr("width", cellWidth)
      .attr("height", 0)
      .attr("transform", (d) => `translate(0 ${cellWidth})`)
      .call(attrs, attrsObj)
      .call(styles, stylesObj);

    this.propRects = propRects;
    return this;
  }

  appendGridLabels(
    attrsObj = {},
    stylesObj = {}
  ) {
    const { gridGrps } = this;
    const gridLabels = gridGrps
      .append("text")
      .text((d) => d.seat.split('-')[1].trim())
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .call(attrs, attrsObj)
      .call(styles, stylesObj);

    this.gridLabels = gridLabels;
    return this;
  }

  updateData(key, mode) {

    /*this.animateModeTransition(
      { 
        'fill': (d) => getWinColor(d,key),
        'fill-opacity' : 1
      },
      {
        height : 0,
        transform: (d) =>
          `translate(0 ${this.cellWidth})`,
        fill: getWinColor
      }
      ,
      {
        fill: (d) => contrast(getWinColor(d,key), "#000000") > 6
              ? "black"
              : "#ddd"
      }
    )*/
    return this.updateMode(mode, 400, key);
  }

  updateMode(mode, durMs = 400, key = 'votes') {
    /*const { gridRects, propRects, gridLabels, cellWidth } = this;
    this.mode = mode;

    gridRects
      .transition()
      .duration(durMs)
      .call(attrs, {
        "fill-opacity": mode === "party" ? 1 : 0.1,
        fill: mode === "turnout" ? "#bbb" : getWinColor,
      });

    propRects
      .transition()
      .duration(durMs)
      .call(attrs, {
        height:
          mode === "party"
            ? 0
            : (d) =>
                cellWidth *
                (mode === "margin" ? d.voteMargin / 100 : d.voterTurnout / 100),
        transform: (d) =>
          `translate(0 ${
            mode === "party"
              ? cellWidth
              : cellWidth -
                cellWidth *
                  (mode === "margin"
                    ? d.voteMargin / 100
                    : d.voterTurnout / 100)
          })`,
        fill: mode === "turnout" ? "#bbb" : getWinColor,
      });

    gridLabels
      .transition()
      .duration(durMs)
      .call(attrs, {
        fill: (d) =>
          mode === "party"
            ? contrast(getWinColor(d), "#000000") > 6
              ? "black"
              : "#ddd"
            : "black",
      });*/

    const prevMode = this.mode;

    this.mode = mode;

    console.log(mode);

    const { gridRects, propRects, gridLabels, cellWidth } = this

    if (mode === 'turnout') {
      return this.animateModeTransition(
        {
          "fill-opacity": 0.1,
          fill: "#bbb",
        },
        {
          height: (d) =>
            cellWidth *
            d.voterTurnout / 100,
          transform: (d) =>
            `translate(0 ${cellWidth -
            cellWidth *
            (d.voterTurnout / 100)
            })`,
          fill: "#bbb"
        },
        {
          fill: (d) => "black"
        }
      )
    } else if (mode === 'margin') {
      return this.animateModeTransition(
        {
          "fill-opacity": 0.1,
          fill: "#bbb",
        },
        {
          height: (d) => {
            return cellWidth * Math.abs((d.result[0][key] - d.result[1][key]) / (d.result[0][key] + d.result[1][key]));
          },
          transform: (d) =>
            `translate(0 ${cellWidth -
            cellWidth *
            Math.abs((d.result[0][key] - d.result[1][key]) / (d.result[0][key] + d.result[1][key]))
            })`,
          fill: (d) => getWinColor(d, key)
        },
        {
          fill: (d) => "black"
        }
      )
    } else if (mode === 'Declared Winner Difference') {
      return this.animateModeTransition(
        {
          "fill-opacity": 0.1,
          fill: "#bbb",
        },
        {
          height: (d) => {
            return cellWidth * getWinner(d).voteDifference;
          },
          transform: (d) =>
            `translate(0 ${cellWidth -
            cellWidth *
            (getWinner(d).voteDifference)
            })`,
          fill: (d) => getWinColor(d, 'declaredVotes')
        },
        {
          fill: (d) => "black"
        }
      )
    } else if (mode === 'Declared Loser Difference') {
      return this.animateModeTransition(
        {
          "fill-opacity": 0.1,
          fill: "#bbb",
        },
        {
          height: (d) => {
            return cellWidth * getLoser(d).voteDifference;
          },
          transform: (d) =>
            `translate(0 ${cellWidth -
            cellWidth *
            (getLoser(d).voteDifference)
            })`,
          fill: (d) => getWinColor(d, 'actualVotes')
        },
        {
          fill: (d) => "black"
        }
      )
    } else {
      console.log(mode);
      return this.animateModeTransition(
        {
          "fill-opacity": 1,
          fill: (d) => getWinColor(d, key),
        },
        {
          height: 0,
          transform: (d) =>
            `translate(0 ${cellWidth})`,
          fill: (d) => getWinColor(d, key)
        },
        {
          fill: (d) => contrast(getWinColor(d, key), "#000000") > 6
            ? "black"
            : "#ddd"
        }
      )
    }

    return this;
  }

  animateModeTransition(gridRectAttrs, propRectsAttrs, gridLabelAttrs, durMs = 400) {
    const { gridRects, propRects, gridLabels, cellWidth } = this;
    //this.mode = mode;

    return Promise.all([
      new Promise((res, rej) => {
        gridRects
          .transition()
          .duration(durMs)
          .call(attrs, gridRectAttrs)
          .on('end', res);
      }),
      new Promise((res, rej) => {
        propRects
          .transition()
          .duration(durMs)
          .call(attrs, propRectsAttrs)
          .on('end', res);
      }),
      new Promise((res, rej) => {
        gridLabels
          .transition()
          .duration(durMs)
          .call(attrs, gridLabelAttrs)
          .on('end', res);
      })
    ])
  }

  event(selectionId, eventType, callbackGen) {
    const canvasObj = this;
    canvasObj[selectionId].on(eventType, callbackGen(canvasObj));
    return this;
  }

  applyFilter(filterObj) {
    const { gridGrps } = this;

    gridGrps
      .transition()
      .duration(250)
      .attr("opacity", (d) => (filterConstit(d, filterObj) ? 1 : 0.2))
      .style("pointer-events", (d) =>
        filterConstit(d, filterObj) ? "auto" : "none"
      );
  }
}

function minMaxGrid(electionData) {
  const xGridArr = electionData.map((d) => d.xGrid);
  const yGridArr = electionData.map((d) => d.yGrid);

  return {
    x: [min(xGridArr), max(xGridArr)],
    y: [min(yGridArr), max(yGridArr)],
  };
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

export { GridCanvas };

const initAnimation = async ({
  gridCanvas,
  calcTooltipPosition,
  setTooltipData,
  setShowTooltip,
  votesKey
}) => {
  //gsap.to(mapContainer.current, {opacity: 1, transform: 'translateY(0px)', duration: 0.3});
  gridCanvas
    .appendGridGrps({}, { id: (d) => `const-${d.id}` })
    .appendGridRects({
      fill: (d) => getWinColor(d, votesKey),
    })
    .appendPropRects({
      fill: (d) => getWinColor(d, votesKey),
    })
    .appendGridLabels(
      {
        fill: (d) => (contrast(getWinColor(d, votesKey), "#000000") > 6 ? "black" : "#ddd"),
        dx: 19.5,
        dy: 25,
        "font-family": "sans-serif",
        opacity: 0
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
          seatData: { seat: `NA ${d.id}`, loc: d.region },
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


  return Promise.all(
    [
      new Promise(res => {
        gridCanvas.gridRects.
          transition()
          .duration(500)
          .delay((d) => d.id * 1)
          .attr("transform", "scale(1 1)")
          .on('end', res);
      }),
      new Promise(res => {
        gridCanvas.gridLabels.
          transition()
          .duration(700)
          .delay((d) => d.id * 1)
          .style("opacity", "1")
          .on('end', res);
      })
    ]
  )
}

const flipAnimation = ({ gridCanvas, votesKey }) => {
  return gridCanvas.animateModeTransition(
    {
      "fill-opacity": 1,
      fill: (d) => getWinColor(d, votesKey),
    },
    {
      height: 0,
      transform: (d) =>
        `translate(0 ${gridCanvas.cellWidth})`,
      fill: (d) => getWinColor(d, votesKey)
    },
    {
      fill: (d) => contrast(getWinColor(d, votesKey), "#000000") > 6
        ? "black"
        : "#ddd"
    }
  )
}

const voterTurnoutAnim = ({ gridCanvas, votesKey }) => {
  return gridCanvas.animateModeTransition(
    {
      "fill-opacity": 0.1,
      fill: "#bbb",
    },
    {
      height: (d) =>
        gridCanvas.cellWidth *
        d.voterTurnout / 100,
      transform: (d) =>
        `translate(0 ${gridCanvas.cellWidth -
        gridCanvas.cellWidth *
        (d.voterTurnout / 100)
        })`,
      fill: "#bbb"
    },
    {
      fill: (d) => "black"
    }
  )
};

const winningPartyAnim = ({ gridCanvas, votesKey }) => {
  const cellWidth = gridCanvas.cellWidth;

  return gridCanvas.animateModeTransition(
    {
      "fill-opacity": 1,
      fill: (d) => getWinColor(d, votesKey),
    },
    {
      height: 0,
      transform: (d) =>
        `translate(0 ${cellWidth})`,
      fill: (d) => getWinColor(d, votesKey)
    },
    {
      fill: (d) => contrast(getWinColor(d, votesKey), "#000000") > 6
        ? "black"
        : "#ddd"
    }
  )
};

const voteMarginAnim = ({gridCanvas, votesKey})=>{
  const key = votesKey;
  const cellWidth = gridCanvas.cellWidth;
  return gridCanvas.animateModeTransition(
    {
      "fill-opacity": 0.1,
      fill: "#bbb",
    },
    {
      height: (d) => {
        return cellWidth * Math.abs((d.result[0][key] - d.result[1][key]) / (d.result[0][key] + d.result[1][key]));
      },
      transform: (d) =>
        `translate(0 ${cellWidth -
        cellWidth *
        Math.abs((d.result[0][key] - d.result[1][key]) / (d.result[0][key] + d.result[1][key]))
        })`,
      fill: (d) => getWinColor(d, key)
    },
    {
      fill: (d) => "black"
    }
  )
}

const filterAnimation = ({filters, votesKey, gridCanvas}) => {
  const filterObj = filters;
  const key = votesKey;
  return new Promise(res => {
    gridCanvas
    .gridGrps
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

const removefilterAnimation = ({gridCanvas}) => {
  return new Promise(res => {
    gridCanvas
    .gridGrps
    .transition()
    .duration(250)
    .style("opacity", (d) => (1))
    .style("pointer-events", "auto")
    .on("end",res);
  })
}

const gridMapMachine = createMachine({
  id: 'gridMap',
  initial: 'animating',
  context: ({ input }) => ({
    filters: {},
    votesKey: 'declaredVotes',
    ...input
    //d3Selection : input.selection,
    //filteredSelection : input.selection
  }),
  states: {
    'animating': {
      id: 'animating',
      initial: 'firstRender',
      states: {
        'firstRender': {
          entry: () => console.log("entering firstRender"),
          invoke: {
            id: 'firstRenderAnimate',
            input: ({ context }) => context,
            src: fromPromise(({ input }) => {
              return initAnimation(input);
            }),
            onDone: {
              target: '#interactive'
            }
          }
        },
        'dataKeyChange': {
          invoke: {
            id: 'dataKeyChange',
            input: ({ context }) => context,
            src: fromPromise(({ input }) => {
              return flipAnimation(input);
            }),
            onDone: {
              target: ['#interactive.filterStatus.unfiltered', '#interactive.mapMode.hist']
            }
          }
        },
        'voterTurnout': {
          invoke: {
            id: 'voterTurnout',
            input: ({ context }) => context,
            src: fromPromise(({ input }) => {
              return voterTurnoutAnim(input);
            }),
            onDone: {
              target: ['#interactive.filterStatus.hist', '#interactive.mapMode.voterTurnout']
            }
          }
        },
        'winningParty': {
          invoke: {
            id: 'winningParty',
            input: ({ context }) => context,
            src: fromPromise(({ input }) => {
              return winningPartyAnim(input);
            }),
            onDone: {
              target: ['#interactive.filterStatus.hist', '#interactive.mapMode.winningParty']
            }
          }
        },
        'voteMargin': {
          invoke: {
            id: 'voteMargin',
            input: ({ context }) => context,
            src: fromPromise(({ input }) => {
              return voteMarginAnim(input);
            }),
            onDone: {
              target: ['#interactive.filterStatus.hist', '#interactive.mapMode.voteMargin']
            }
          }
        },
        'applyFilter' : {
          invoke : {
            id : 'applyFilter',
            input: ({ context }) => context,
            src : fromPromise(({input})=>{
              return filterAnimation(input);
            }),
            onDone : {
              target: ['#interactive.filterStatus.filtered', '#interactive.mapMode.hist']
            }
          }         
        },
        'removeFilter' : {
          invoke : {
            id : 'removeFilter',
            input: ({ context }) => context,
            src : fromPromise(({input})=>{
              return removefilterAnimation(input);
            }),
            onDone : {
              target: ['#interactive.filterStatus.unfiltered', '#interactive.mapMode.hist']
            }
          }         
        }
      }
    },
    'interactive': {
      id: 'interactive',
      type: 'parallel',
      on: {
        'showVoterTurnout': {
          target: '#animating.voterTurnout'
        },
        'showWinningParty': {
          target: '#animating.winningParty'
        },
        'showVoteMargin': {
          target: '#animating.voteMargin'
        },
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
      states: {
        filterStatus: {
          initial: 'unfiltered',
          states: {
            'filtered': {
              on: {
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
            'unfiltered': {
              on: {
                'changeVotesKey': {
                  actions: assign({
                    filters: ({ context }) => context.filters,
                    votesKey: ({ event }) => event.votesKey
                  }),
                  target: '#animating.dataKeyChange'
                }
              }
            },
            hist: {
              type: 'history'
            }
          }
        },
        mapMode: {
          initial: 'winningParty',
          states: {
            'winningParty': {

            },
            'voterTurnout': {

            },
            'voteMargin': {

            },
            hist: {
              type: 'history'
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

function getNewContext({ event, context }, newValsObj) {
  return assign({
    ...context,
    ...newValsObj
  })
};

//actor.start();

//window.actor = actor;

export { gridMapMachine };