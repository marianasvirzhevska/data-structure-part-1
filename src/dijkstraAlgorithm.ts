function Dijkstra(G, w, s) {
  initSingleSource(G, s);
  S = [];
  Q = G.V; // build queue with priorities according to d values of vertices

  while (Q) {
    let u = Q.extractMin();
    S.push(u);

    for (let vertex in G.Adj[u]) {
      relax(u, v, w);
    }
  }
}

function initSingleSource(G, s) {
  for (let vertex of G) {
    v.d = Number.MAX_SAFE_INTEGER;
    v.p = null;
  }

  s.d = 0;
} 

function relax(u, v, w) {
  if (v.d > u.d + w(u, v)) {
    v.d = u.d + w(u, v);
    v.p = u;
  }
}
