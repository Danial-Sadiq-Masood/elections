import * as d3 from "d3";
import { select } from "d3";
import { attrs, styles, contrast, partyScale, disputedSeats, disputedSeatsObj } from "../../utilities";

import { PTI_Data } from "./translatedGrids/ptiData";
import { data } from "./translatedGrids/form45data";

import elections2024ECP from './translatedGrids/updatedRes2024.json';

import { createMachine, createActor, fromPromise, assign } from 'xstate';

import { parliamentChart } from "d3-parliament-chart";
window.parliamentChart = parliamentChart;

window.PTI_Data = PTI_Data;
window.PTI_Data_fixed = data;

let sortedResOfficial = elections2024ECP.reduce((acc, d) => {
	let winner;
	try {
		winner = getWinner(d, 'declaredVotes')
	} catch {
		console.log(d)
	}

	acc[winner.party] ??= [];
	acc[winner.party].push(d)
	return acc;
}, {})

let sortedResForm45 = elections2024ECP.reduce((acc, d) => {
	let winner;
	try {
		winner = getWinner(d, 'actualVotes')
	} catch {
		console.log(d)
	}

	acc[winner.party] ??= [];
	acc[winner.party].push(d)
	return acc;
}, {})


//window.select = select;

function getWinner(d, key = 'votes') {
	console.log(d);
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

const disputedSeatOpacity = 0.25;

const mockAnimation =
	(timeout) => new Promise(res => {
		setTimeout(res, timeout)
	});

let pchart;

const initAnimation = ({
	calcTooltipPosition,
	setTooltipData,
	setShowTooltip,
	votesKey
}) => {

	pchart = parliamentChart()
		.width(2200)
		.data(
			Object.values(sortedResOfficial).flat()
		)
		.sections(1)
		.seatRadius(30)
		.rowHeight(90)
		.debug(false);

	window.pchart = pchart;

	let chartGroup = d3.select('#svgparliament')
		.append('g')
		.classed('parliament-chart', true)

	let seatGroups = pchart(chartGroup)
		.enter()
		.insert('g')
		.style('opacity',0);

	seatGroups.append('circle')
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('r', 30)
		.attr('fill', (d) => getWinColor(d, 'declaredVotes'))
		.on(
			"mouseover",
			function (e, d) {

				setTooltipData({
					position: calcTooltipPosition(e.pageX, e.pageY),
					seatData: { seat: `NA ${d.id}`, loc: d.region },
					data: d.result,
					turnout: d.voterTurnout,
					officialMargin: d.officialMargin,
					form45Margin: d.form45Margin
				});


				setShowTooltip(true);
			}
		)
		.on("mouseout",
			function () {
				setShowTooltip(false);
			}
		);

	seatGroups
		.append('text')
		.text((d) => d.seat.split('-')[1])
		.attr("x", (d) => d.x)
		.attr("y", (d) => d.y)
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle")
		.attr("font-size", "27px")
		.call(attrs, {
			fill: (d) => (contrast(getWinColor(d, votesKey), "#000000") > 6 ? "black" : "#ddd"),
			"font-family": "Metropolis, sans-serif"
		})
		.call(styles, {
			"user-select": "none",
			"pointer-events": "none",
			"font-weight": "700",
		});

		return new Promise(res => {
			d3.selectAll('.parliament-chart g')
				.transition()
				.duration(500)
				.transition()
				.duration(700)
				.delay((d, i) => Math.random() * i * 1)
				.style('opacity', '1')
				.on("end", res);
		})

	/*chartGroup.selectAll('.parliament-chart g')
		.each(function(d,i){
			this.__data__.sortedModeData = this.__data__.partyArr.pop();
		})*/

	return Promise.resolve();

	chartGroup.selectAll('.parliament-chart g')
		.style('opacity', 0);
	chartGroup.selectAll('.parliament-chart g').each(function (d, i) {
		this.__data__ = { ...this.__data__, ...this.__data__.sortedModeData };
	});

	chartGroup
		.selectAll('.parliament-chart g')
		.append('text')
		.text((d) => d.seat.split('-')[1])
		.attr("x", (d) => d.x)
		.attr("y", (d) => d.y)
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle")
		.attr("font-size", "27px")
		.call(attrs, {
			fill: (d) => (contrast(getWinColor(d, votesKey), "#000000") > 6 ? "black" : "#ddd"),
			"font-family": "Metropolis, sans-serif"
		})
		.call(styles, {
			"user-select": "none",
			"pointer-events": "none",
			"font-weight": "700",
		});
}

const flipAnimation = (key) => {
	console.log('flipping colors', key);
	return Promise.all([
		new Promise(res => {
			d3.selectAll('.parliament-chart circle')
				.transition()
				.duration(300)
				.delay((d, i) => Math.random() * (i / 250) * 10)
				.style('fill', (d) => getWinColor(d, key))
				//.style('stroke-width', key === "actualVotes" ? '3' : '0')
				//.style('stroke', 'black')
				.on("end", res);
		}),
		new Promise(res => {
			d3.selectAll('.parliament-chart text')
				.transition()
				.duration(300)
				.delay((d, i) => Math.random() * (i / 250) * 10)
				.style('fill', (d) => contrast(getWinColor(d, key), "#000000") > 6
					? "black"
					: "#ddd")
				.on("end", res);
		})
	]);
}

const flipAnimationSorted = (key) => {
	console.log('flipping colors', key);
	return Promise.all([
		new Promise(res => {
			const newData = key == 'actualVotes' ? sortedResForm45 : sortedResOfficial
			const flattenedData = Object.values(newData).flat();
			pchart.data(flattenedData);
			const updateSelection = pchart(d3.selectAll('.parliament-chart'))
				.each(function(d){
					Array.from(this.children).forEach((e)=>{
						e.__data__ = this.__data__;
					})
				});

				updateSelection.selectAll('text')
				.text(d => d.seat.split('-')[1])

				updateSelection
				.selectAll('circle')
				.transition()
				.duration(300)
				.delay((d, i) => Math.random() * (i / 250) * 10)
				.style('fill', (d) => getWinColor(d, key))
				//.style('stroke-width', key === "actualVotes" ? '3' : '0')
				//.style('stroke', 'black')
				.on("end", res);
		}),
		new Promise(res => {
			d3.selectAll('.parliament-chart text')
				.transition()
				.duration(300)
				.delay((d, i) => Math.random() * (i / 250) * 10)
				.style('fill', (d) => contrast(getWinColor(d, key), "#000000") > 6
					? "black"
					: "#ddd")
				.on("end", res);
		})
	]);
}

const filterAnimation = (filterObj, key) => {
	return Promise.all(
		[
			new Promise(res => {
				d3.selectAll('.parliament-chart g')
					.transition()
					.duration(250)
					.style("opacity", (d) => (filterConstit(d, filterObj, key) ? 1 : 0.2))
					.style("pointer-events", (d) =>
						filterConstit(d, filterObj, key) ? "auto" : "none",
					)
					.on("end", res);
			}),
			new Promise(res => {
				d3.selectAll('.parliament-chart circle')
					.transition()
					.duration(250)
					.style('fill', (d) => getWinColor(d, key))
					.on("end", res);
			}),
			new Promise(res => {
				d3.selectAll('.parliament-chart text')
					.transition()
					.duration(250)
					.style('fill', (d) => contrast(getWinColor(d, key), "#000000") > 6
						? "black"
						: "#ddd")
					.on("end", res);
			})
		]
	)
}

const filterAnimationSorted = (filterObj, key) => {
	return Promise.all(
		[
			new Promise(res => {
				d3.selectAll('.parliament-chart g')
					.transition()
					.duration(250)
					.style("opacity", (d) => (filterConstit(d, filterObj, key) ? 1 : 0.2))
					.style("pointer-events", (d) =>
						filterConstit(d, filterObj, key) ? "auto" : "none",
					)
					.on("end", res);
			}),
			new Promise(res => {
				d3.selectAll('.parliament-chart circle')
					.transition()
					.duration(250)
					.style('fill', (d) => getWinColor(d, key))
					.on("end", res);
			}),
			new Promise(res => {
				d3.selectAll('.parliament-chart text')
					.transition()
					.duration(250)
					.style('fill', (d) => contrast(getWinColor(d, key), "#000000") > 6
						? "black"
						: "#ddd")
					.on("end", res);
			})
		]
	)
}

const removefilterAnimation = (key) => {
	return Promise.all(
		[
			new Promise(res => {
				d3.selectAll('.parliament-chart g')
					.transition()
					.duration(250)
					.style("opacity", (d) => (1))
					.style("pointer-events", "auto")
					.on("end", res);
			})/*,
            new Promise(res => {
                d3.selectAll('path.disputed_seat')
                    .transition()
                    .duration(250)
                    .style("opacity", disputedSeatOpacity)
                    .on("end", res);
            })*/
		]
	)
}

function filterConstit(entry, filterObj, key) {
	const { winnerArr, runnerUpArr, disputedSeats, marginArr, provincesArr } =
		filterObj;

	return [
		!provincesArr.length > 0 || provincesArr.includes(entry.province),
		!winnerArr.length > 0 || winnerArr.includes(getWinner(entry, key).party),
		!runnerUpArr.length > 0 || runnerUpArr.includes(getLoser(entry, key).party),
		!disputedSeats.length > 0 || disputedSeatsObj[entry.seat]
	]
		.every(d => d);

}

const removeChart = () => {
	d3.select('#svgparliament').remove();
}

const parliamentMachine = createMachine({
	id: 'parliamentMachine',
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
						input: ({ context: { votesKey } }) => votesKey,
						src: fromPromise(({ input }) => {
							return flipAnimationSorted(input);
						}),
						onDone: {
							target: '#interactive.unfiltered'
						}
					}
				},
				'applyFilter': {
					invoke: {
						id: 'applyFilter',
						input: ({ context }) => context,
						src: fromPromise(({ input }) => {
							return filterAnimation(input.filters, input.votesKey);
						}),
						onDone: {
							target: '#interactive.filtered'
						}
					}
				},
				'applyFilterSorted': {
					invoke: {
						id: 'applyFilterSorted',
						input: ({ context }) => context,
						src: fromPromise(({ input }) => {
							return filterAnimationSorted(input.filters, input.votesKey);
						}),
						onDone: {
							target: '#interactive.filtered'
						}
					}
				},
				'removeFilter': {
					invoke: {
						id: 'removeFilter',
						input: ({ context: { filters } }) => filters,
						src: fromPromise(({ input }) => {
							return removefilterAnimation(input.votesKey);
						}),
						onDone: {
							target: '#interactive.unfiltered'
						}
					}
				}
			}
		},
		'interactive': {
			id: 'interactive',
			initial: 'unfiltered',
			on: {
				'applyFilters': {
					target: '#animating.applyFilter',
					actions: assign({
						filters: ({ event }) => event.filters,
						votesKey: ({ context }) => context.votesKey
					})
				},
				'removeFilters': {
					target: '#animating.removeFilter'
				}
			},
			states: {
				'filtered': {
					on: {
						'changeVotesKey': {
							target: '#animating.applyFilterSorted',
							actions: [
								(data) => console.log(data),
								assign({
									filters: ({ context }) => context.filters,
									votesKey: ({ event }) => event.votesKey
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
}

window.parliamentMachine = parliamentMachine;

//const parliamentActor = createActor(parliamentMachine);
//actor.start();


export { parliamentMachine };