import {
  forceSimulation,
  forceManyBody,
  forceX,
  forceY,
  forceCollide,
} from "d3";
import { projection } from "./projections";

const simulation = forceSimulation()
  .force("charge", forceManyBody().strength(0.5))
  .force(
    "x",
    forceX().x((d) => projection(d.location)[0])
  )
  .force(
    "y",
    forceY().y((d) => projection(d.location)[1])
  )
  .force(
    "collision",
    forceCollide().radius((d) => 20)
  );

function runSimulation(data) {
  simulation.nodes(data);
  while (simulation.alpha() > 0.01) {
    simulation.tick();
  }
}

export default runSimulation;
