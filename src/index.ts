
class Graph {
  private vertices: number[];
  private edges: Map<number, Map<number, number>>;

  constructor() {
    this.vertices = [];
    this.edges = new Map<number, Map<number, number>>();
  }

  addVertex(vertex: number) {
    this.vertices.push(vertex);
    this.edges.set(vertex, new Map<number, number>());
  }

  addEdge(vertex1: number, vertex2: number, weight: number) {
    this.edges.get(vertex1).set(vertex2, weight);
    this.edges.get(vertex2).set(vertex1, weight);
  }

  dijkstra(startVertex: number) {
    const distances = new Map<number, number>();
    const visited = new Set<number>();
    const previous = new Map<number, number>();

    this.vertices.forEach((vertex) => {
      distances.set(vertex, Infinity);
    });

    distances.set(startVertex, 0);

    while (visited.size < this.vertices.length) {
      let currentVertex: number;
      let shortestDistance: number = Infinity;

      this.vertices.forEach((vertex) => {
        if (!visited.has(vertex) && distances.get(vertex) < shortestDistance) {
          currentVertex = vertex;
          shortestDistance = distances.get(vertex);
        }
      });

      visited.add(currentVertex);

      const edges = this.edges.get(currentVertex);
      edges.forEach((weight, neighbor) => {
        const distance = shortestDistance + weight;
        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentVertex);
        }
      });
    }

    return { distances, previous };
  }

  findShortestPath(startVertex: number, endVertex: number) {
    const { distances, previous } = this.dijkstra(startVertex);
    const path = [];

    let currentVertex = endVertex;
    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = previous.get(currentVertex);
    }
    path.unshift(startVertex);

    return { path, distance: distances.get(endVertex) };
  }
}

const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);

graph.addEdge(1, 2, 10);
graph.addEdge(1, 3, 15);
graph.addEdge(1, 4, 20);
graph.addEdge(2, 3, 35);
graph.addEdge(2, 4, 25);
graph.addEdge(3, 4, 30);

const startVertex = 1;
const { path, distance } = graph.findShortestPath(startVertex, startVertex);

console.log('@@', path, distance);


