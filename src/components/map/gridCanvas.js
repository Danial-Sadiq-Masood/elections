import { select, min, max } from "d3";
import { attrs, styles, contrast, partyScale } from "../../utilities";

import { PTI_Data } from "./translatedGrids/ptiData";
import { data } from "./translatedGrids/form45data";

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

    gridRects
      .transition()
      .duration(500)
      .delay((d) => d.id * 1)
      .attr("transform", "scale(1 1)");

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
    { textFunc = (d) => d.region.slice(0, 2) } = {},
    attrsObj = {},
    stylesObj = {}
  ) {
    const { gridGrps } = this;
    const gridLabels = gridGrps
      .append("text")
      .text(textFunc)
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .call(attrs, attrsObj)
      .call(styles, stylesObj);

    this.gridLabels = gridLabels;
    return this;
  }

  updateData(key,mode){

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
    return this.updateMode(mode,400,key);
  }

  updateMode(mode, durMs = 400, key='votes') {
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

    if(mode === 'turnout'){
      return this.animateModeTransition(
        {
          "fill-opacity":  0.1,
          fill: "#bbb",
        },
        {
          height : (d) =>
                  cellWidth *
                  d.voterTurnout / 100,
          transform: (d) =>
            `translate(0 ${
                  cellWidth -
                  cellWidth *
                    (d.voterTurnout / 100)
            })`,
          fill: "#bbb"
        }, 
        {
          fill: (d) => "black"
        }
      )
    }else if(mode === 'margin'){
      return this.animateModeTransition(
        {
          "fill-opacity":  0.1,
          fill: "#bbb",
        },
        {
          height : (d) =>{
            return cellWidth * Math.abs((d.result[0][key] - d.result[1][key])/(d.result[0][key] + d.result[1][key]));
          },
          transform: (d) =>
            `translate(0 ${
                  cellWidth -
                  cellWidth *
                    Math.abs((d.result[0][key] - d.result[1][key])/(d.result[0][key] + d.result[1][key]))
            })`,
          fill: (d) => getWinColor(d,key)
        }, 
        {
          fill: (d) => "black"
        }
      )
    }else if(mode === 'Declared Winner Difference'){
      return this.animateModeTransition(
        {
          "fill-opacity":  0.1,
          fill: "#bbb",
        },
        {
          height : (d) =>{
            return cellWidth * getWinner(d).voteDifference;
          },
          transform: (d) =>
            `translate(0 ${
                  cellWidth -
                  cellWidth *
                    (getWinner(d).voteDifference)
            })`,
          fill: getWinColor
        }, 
        {
          fill: (d) => "black"
        }
      )
    }else if(mode === 'Declared Loser Difference'){
      return this.animateModeTransition(
        {
          "fill-opacity":  0.1,
          fill: "#bbb",
        },
        {
          height : (d) =>{
            return cellWidth * getLoser(d).voteDifference;
          },
          transform: (d) =>
            `translate(0 ${
                  cellWidth -
                  cellWidth *
                    (getLoser(d).voteDifference)
            })`,
          fill: (d) => getWinColor(d,'actualVotes')
        }, 
        {
          fill: (d) => "black"
        }
      )
    }else{
      console.log(mode);
      return this.animateModeTransition(
        {
          "fill-opacity":  1,
          fill: (d) => getWinColor(d,key),
        },
        {
          height : 0,
          transform: (d) =>
            `translate(0 ${cellWidth})`,
          fill: (d) => getWinColor(d,key)
        }, 
        {
          fill: (d) => contrast(getWinColor(d,key), "#000000") > 6
            ? "black"
            : "#ddd"
        }
      )
    }

    return this;
  }

  animateModeTransition(gridRectAttrs,propRectsAttrs,gridLabelAttrs,durMs=400) {
    const { gridRects, propRects, gridLabels, cellWidth } = this;
    //this.mode = mode;

    return Promise.all([
      new Promise((res,rej)=>{
        gridRects
        .transition()
        .duration(durMs)
        .call(attrs,gridRectAttrs)
        .end(res);
      }),
      new Promise((res,rej)=>{
        propRects
        .transition()
        .duration(durMs)
        .call(attrs,propRectsAttrs)
        .end(res);
      }),
      new Promise((res,rej)=>{
        gridLabels
        .transition()
        .duration(durMs)
        .call(attrs,gridLabelAttrs)
        .end(res);
      })
    ])

    return this;
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

function filterConstit(entry, filterObj) {
  const { winnerArr, runnerUpArr, turnoutArr, marginArr, provinceArr } =
    filterObj;
  const winnerObj = getWinner(entry)
  const winner = winnerObj ? winnerObj.party : undefined;
  const runnerUpObj = entry.result[1];
  const runnerUp = runnerUpObj ? runnerUpObj.party : undefined;

  const winnerLog = winnerArr.length === 0 ? true : winnerArr.includes(winner);
  const runnerUpLog =
    runnerUpArr.length === 0 ? true : runnerUpArr.includes(runnerUp);

  const turnoutLog =
    turnoutArr[0] === 0 && turnoutArr[1] === 100
      ? true
      : entry.voterTurnout === `N/A`
      ? false
      : turnoutArr === undefined
      ? true
      : entry.voterTurnout >= turnoutArr[0] &&
        entry.voterTurnout <= turnoutArr[1];

  const provinceLog =
    provinceArr.length === 0 ? true : provinceArr.includes(entry.province);

  const marginLog =
    marginArr[0] === 0 && marginArr[1] === 100
      ? true
      : entry.voteMargin === `N/A`
      ? false
      : marginArr === undefined
      ? true
      : entry.voteMargin >= marginArr[0] && entry.voteMargin <= marginArr[1];

  return winnerLog && runnerUpLog && turnoutLog && marginLog && provinceLog;
}

export { GridCanvas };
