// Function for community detection
function Modularity(dataset) {
  const objnodes = {};
  const Cl = {};
  let num_of_edges = 0;
  let num_of_nodes = 0;
  for (let i in dataset) {
    if (objnodes[dataset[i].from]) {
      if (dataset[i].num > objnodes[dataset[i].from].w) {
        objnodes[String(dataset[i].from)].n = String(dataset[i].to);
        objnodes[String(dataset[i].from)].w = Number(dataset[i].num);
      }
    } else {
      objnodes[String(dataset[i].from)] = {n: String(dataset[i].to), w: Number(dataset[i].num), Cl: Number(num_of_nodes)};
      Cl[num_of_nodes] = {};
      Cl[num_of_nodes][String(dataset[i].from)] = true;
      num_of_nodes += 1;
    }

    // To
    if (objnodes[dataset[i].to]) {
      if (dataset[i].num > objnodes[dataset[i].to].w) {
        objnodes[String(dataset[i].to)].n = String(dataset[i].from);
        objnodes[String(dataset[i].to)].w = Number(dataset[i].num);
      }
    } else {
      objnodes[String(dataset[i].to)] = {n: String(dataset[i].from), w: Number(dataset[i].num), Cl: Number(num_of_nodes)};
      Cl[num_of_nodes] = {};
      Cl[num_of_nodes][String(dataset[i].to)] = true;
      num_of_nodes += 1;
    }
    num_of_edges += 1;
  }

  const nodes_per_clusters = Math.round(num_of_nodes/6);
  const min_per_clusters = (min_per_clusters < 3) ? 3 : Math.round(num_of_nodes/300);

  for (let i in dataset) {
    const to_cl = Number(objnodes[dataset[i].to].Cl);
    const from_cl = Number(objnodes[dataset[i].from].Cl);
    if (from_cl !== to_cl) {
      const nodes_in_cl = {from: 0, to: 0, total: 0, common: 0};
      for (let snode in Cl[from_cl]) nodes_in_cl.from += 1;
      for (let snode in Cl[to_cl]) {
        if (Cl[from_cl][snode] && Cl[to_cl][snode]) nodes_in_cl.common += 1;
        nodes_in_cl.to += 1;
      }
      nodes_in_cl.total = nodes_in_cl.from+nodes_in_cl.to;
      const nodes_max = nodes_in_cl.total-nodes_in_cl.common;
      const common_nodes = nodes_in_cl.common/nodes_in_cl.total;
      const is_strong_edge = (dataset[i].to === objnodes[String(dataset[i].from)].n) || (dataset[i].from === objnodes[String(dataset[i].to)].n);
      if ((nodes_max < nodes_per_clusters) || is_strong_edge) {
        for (let snode in Cl[to_cl]) {
          objnodes[snode].Cl = Number(from_cl);
          Cl[from_cl][snode] = true;
          delete Cl[to_cl][snode];
        }
        delete Cl[to_cl];
      }
    }
  }

  for (let i in dataset) {
    const to_cl = Number(objnodes[dataset[i].to].Cl);
    const from_cl = Number(objnodes[dataset[i].from].Cl);
    if (from_cl !== to_cl) {
      let nodes_from_in_cl = 0;
      let nodes_to_in_cl = 0;
      for (let snode in Cl[from_cl]) nodes_from_in_cl += 1;
      for (let snode in Cl[to_cl]) nodes_to_in_cl += 1;
      if (nodes_from_in_cl < min_per_clusters || nodes_to_in_cl < min_per_clusters) {
        for (let snode in Cl[to_cl]) {
          objnodes[snode].Cl = Number(from_cl);
          Cl[from_cl][snode] = true;
        }
        delete Cl[to_cl];
      }
    }
  }

  dataset = null;
  for(let i in objnodes) objnodes[i] = Number(objnodes[i].Cl);

  const cluster_keys = {};
  let num_of_cluster_keys = 1;
  for(let i in objnodes) {
    if (!cluster_keys[objnodes[i]]) {
      cluster_keys[objnodes[i]] = Number(num_of_cluster_keys);
      num_of_cluster_keys += 1;
    }
    objnodes[i] = Number(cluster_keys[objnodes[i]]);
  }
  if (num_of_cluster_keys > 1) { num_of_cluster_keys -= 1; }

  const clusters_list = [];
  for (let i=1; i<=num_of_cluster_keys; i++) clusters_list.push(i);

  return {
    nodes_num: num_of_nodes,
    edges_num: num_of_edges,
    groups_num: num_of_cluster_keys,
    groups_list: clusters_list,
    groups: objnodes
  };
};

function community_color_generation(nclusters) {
  const palettes = ['#EF5350', '#EC407A', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F', '#EA80FC', '#FF5252', '#90A4AE'];
  const colors_per_cluster = {};
  let cl_counter = 0;
  while(Object.keys(colors_per_cluster).length < nclusters.length) {
    const a_color = (palettes.length) ? palettes.shift() : '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    colors_per_cluster[a_color] = cl_counter;
    cl_counter += 1;
  }
  const cluster_colors = {};
  for (let i in colors_per_cluster) {
    cluster_colors[String(nclusters[colors_per_cluster[i]])] = i;
  }
  return cluster_colors;
}

export default {
  modularity: Modularity,
  colors: community_color_generation
};
