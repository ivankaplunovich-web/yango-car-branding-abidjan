(() => {
  const target = document.querySelector("[data-planner-map]");
  const data = window.ABIDJAN_BASEMAP;

  if (!target || !data) return;

  const scenario = {
    mapFleet: 20,
    sizeClass: "b",
    speedMultiplier: 0.98,
    clusterWeights: {
      center: 0.32,
      bridge: 0.15,
      west: 0.14,
      north: 0.14,
      south: 0.14,
      east: 0.11,
    },
  };

  const fleetDensityByCars = {
    100: 12,
    300: 20,
    500: 28,
    1000: 38,
  };

  const sizeConfig = {
    b: { className: "planner-fleet-car-b", headway: 31 },
  };

  const vehicleMarkup =
    '<img class="planner-fleet-car-sprite" src="./assets/vehicles/car-topview-uxwing-base.svg" alt="" />';
  const mapCopy = {
    en: {
      aria: "OpenStreetMap based Abidjan coverage view with representative branded fleet motion",
      attribution: "Map data © OpenStreetMap contributors · representative 300-car campaign view",
      labels: {
        "Airport road": "Airport road",
      },
    },
    fr: {
      aria: "Vue de couverture d'Abidjan basee sur OpenStreetMap avec mouvement de flotte representative",
      attribution: "Donnees carte © contributeurs OpenStreetMap · vue representative d'une campagne 300 voitures",
      labels: {
        "Airport road": "Route aeroport",
      },
    },
  };

  const routeSampleStep = 8;
  const maxTurnRate = 160;
  const vehicleHeadingOffset = 90;

  const loopRoutes = [
    {
      id: "center-1",
      clusterId: "center",
      baseSpeed: 25,
      points: [
        [365, 188],
        [397, 181],
        [444, 198],
        [455, 218],
        [456, 240],
        [450, 261],
        [425, 278],
        [420, 349],
        [433, 396],
        [420, 388],
        [395, 326],
        [355, 251],
        [352, 220],
        [365, 188],
      ],
    },
    {
      id: "center-2",
      clusterId: "center",
      baseSpeed: 24,
      points: [
        [434, 193],
        [451, 207],
        [469, 218],
        [487, 219],
        [520, 189],
        [543, 220],
        [574, 226],
        [578, 278],
        [579, 325],
        [529, 439],
        [485, 410],
        [469, 371],
        [450, 390],
        [433, 396],
        [420, 349],
        [425, 278],
        [450, 261],
        [455, 218],
        [434, 193],
      ],
    },
    {
      id: "center-3",
      clusterId: "center",
      baseSpeed: 23,
      points: [
        [395, 326],
        [399, 333],
        [420, 388],
        [433, 396],
        [476, 400],
        [507, 421],
        [530, 443],
        [545, 453],
        [491, 478],
        [476, 486],
        [444, 460],
        [436, 422],
        [434, 396],
        [434, 383],
        [420, 349],
        [395, 326],
      ],
    },
    {
      id: "bridge-1",
      clusterId: "bridge",
      baseSpeed: 22,
      points: [
        [395, 326],
        [420, 349],
        [434, 383],
        [434, 396],
        [436, 422],
        [443, 420],
        [452, 443],
        [457, 458],
        [476, 486],
        [491, 478],
        [529, 439],
        [578, 496],
        [572, 535],
        [592, 571],
        [582, 642],
        [520, 585],
        [476, 486],
        [444, 460],
        [436, 422],
        [434, 396],
        [420, 349],
        [395, 326],
      ],
    },
    {
      id: "bridge-2",
      clusterId: "bridge",
      baseSpeed: 21,
      points: [
        [420, 349],
        [434, 383],
        [434, 396],
        [436, 422],
        [452, 443],
        [457, 458],
        [476, 486],
        [571, 531],
        [592, 571],
        [637, 565],
        [667, 603],
        [757, 643],
        [729, 692],
        [685, 675],
        [628, 638],
        [582, 642],
        [520, 585],
        [476, 486],
        [444, 460],
        [436, 422],
        [434, 396],
        [420, 349],
      ],
    },
    {
      id: "west-1",
      clusterId: "west",
      baseSpeed: 20,
      points: [
        [16, 115],
        [107, 163],
        [140, 170],
        [173, 174],
        [180, 187],
        [176, 198],
        [177, 217],
        [222, 247],
        [222, 258],
        [261, 268],
        [266, 281],
        [379, 278],
        [357, 258],
        [355, 251],
        [352, 220],
        [352, 207],
        [341, 198],
        [248, 197],
        [219, 196],
        [177, 174],
        [140, 170],
        [107, 163],
        [16, 115],
      ],
    },
    {
      id: "west-2",
      clusterId: "west",
      baseSpeed: 19,
      points: [
        [24, 289],
        [69, 294],
        [166, 354],
        [177, 354],
        [208, 341],
        [214, 331],
        [222, 258],
        [261, 268],
        [266, 281],
        [300, 300],
        [250, 320],
        [208, 341],
        [177, 354],
        [166, 354],
        [69, 294],
        [24, 289],
      ],
    },
    {
      id: "north-1",
      clusterId: "north",
      baseSpeed: 21,
      points: [
        [397, 181],
        [401, 177],
        [405, 178],
        [430, 178],
        [520, 189],
        [543, 220],
        [574, 226],
        [578, 278],
        [520, 250],
        [475, 250],
        [455, 218],
        [444, 198],
        [397, 181],
      ],
    },
    {
      id: "north-2",
      clusterId: "north",
      baseSpeed: 20,
      points: [
        [616, 220],
        [638, 211],
        [671, 192],
        [713, 171],
        [741, 156],
        [787, 141],
        [845, 134],
        [871, 183],
        [903, 198],
        [920, 191],
        [855, 136],
        [787, 141],
        [714, 170],
        [671, 192],
        [650, 205],
        [637, 212],
        [616, 220],
      ],
    },
    {
      id: "south-1",
      clusterId: "south",
      baseSpeed: 21,
      points: [
        [434, 396],
        [436, 422],
        [443, 420],
        [444, 460],
        [476, 486],
        [491, 478],
        [529, 439],
        [578, 496],
        [572, 535],
        [592, 571],
        [571, 531],
        [529, 439],
        [485, 410],
        [434, 396],
      ],
    },
    {
      id: "south-2",
      clusterId: "south",
      baseSpeed: 20,
      points: [
        [476, 486],
        [491, 478],
        [529, 439],
        [578, 496],
        [572, 535],
        [592, 571],
        [637, 565],
        [667, 603],
        [757, 643],
        [729, 692],
        [685, 675],
        [650, 626],
        [628, 638],
        [582, 642],
        [520, 585],
        [477, 532],
        [476, 486],
      ],
    },
    {
      id: "east-1",
      clusterId: "east",
      baseSpeed: 20,
      points: [
        [616, 220],
        [638, 211],
        [650, 205],
        [671, 192],
        [713, 171],
        [741, 156],
        [787, 141],
        [845, 134],
        [871, 183],
        [903, 198],
        [920, 191],
        [855, 136],
        [787, 141],
        [714, 170],
        [703, 202],
        [691, 259],
        [640, 287],
        [637, 320],
        [675, 323],
        [744, 324],
        [752, 332],
        [725, 335],
        [703, 333],
        [707, 295],
        [705, 259],
        [640, 287],
        [616, 220],
      ],
    },
  ];

  let routeLibrary = [];
  let routeLookup = new Map();
  let vehicles = [];
  let animationFrame = null;
  let lastTickTime = null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function pathD(points, close = false) {
    const path = points
      .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
      .join(" ");
    return close ? `${path} Z` : path;
  }

  function distanceBetween(a, b) {
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function ensureClosed(points) {
    if (!points.length) return [];
    const first = points[0];
    const last = points[points.length - 1];
    if (first[0] === last[0] && first[1] === last[1]) return points;
    return [...points, first];
  }

  function sampleLoopRoute(route) {
    const closedPoints = ensureClosed(route.points);
    const sampledPoints = [closedPoints[0]];
    const cumulativeLengths = [0];
    let totalLength = 0;

    for (let index = 1; index < closedPoints.length; index += 1) {
      const start = closedPoints[index - 1];
      const end = closedPoints[index];
      const segmentLength = distanceBetween(start, end);

      if (segmentLength === 0) continue;

      const steps = Math.max(1, Math.ceil(segmentLength / routeSampleStep));

      for (let step = 1; step <= steps; step += 1) {
        const t = step / steps;
        const x = start[0] + (end[0] - start[0]) * t;
        const y = start[1] + (end[1] - start[1]) * t;
        const previous = sampledPoints[sampledPoints.length - 1];
        totalLength += distanceBetween(previous, [x, y]);
        sampledPoints.push([x, y]);
        cumulativeLengths.push(totalLength);
      }
    }

    return {
      ...route,
      points: closedPoints,
      sampledPoints,
      cumulativeLengths,
      totalLength,
    };
  }

  function buildLoopLibrary() {
    routeLibrary = loopRoutes.map((route) => sampleLoopRoute(route));
    routeLookup = new Map(routeLibrary.map((route) => [route.id, route]));
  }

  function routeVehiclesByCluster() {
    return routeLibrary.reduce((acc, route) => {
      if (!acc[route.clusterId]) acc[route.clusterId] = [];
      acc[route.clusterId].push(route);
      return acc;
    }, {});
  }

  function buildClusterQuotas(total, weights) {
    const entries = Object.entries(weights).map(([clusterId, weight]) => ({
      clusterId,
      exact: total * weight,
    }));
    const quotas = {};
    let assigned = 0;

    entries.forEach(({ clusterId, exact }) => {
      const base = Math.floor(exact);
      quotas[clusterId] = base;
      assigned += base;
    });

    entries
      .map(({ clusterId, exact }) => ({ clusterId, fraction: exact - Math.floor(exact) }))
      .sort((a, b) => b.fraction - a.fraction)
      .slice(0, total - assigned)
      .forEach(({ clusterId }) => {
        quotas[clusterId] += 1;
      });

    return quotas;
  }

  function allocateFleetByCluster() {
    const byCluster = routeVehiclesByCluster();
    const quotas = buildClusterQuotas(scenario.mapFleet, scenario.clusterWeights);
    const assignments = [];

    Object.entries(quotas).forEach(([clusterId, quota]) => {
      const clusterRoutes = byCluster[clusterId] || [];
      if (!clusterRoutes.length || quota <= 0) return;

      const baseCount = Math.floor(quota / clusterRoutes.length);
      const remainder = quota % clusterRoutes.length;

      clusterRoutes.forEach((route, routeIndex) => {
        const count = baseCount + (routeIndex < remainder ? 1 : 0);
        for (let slotIndex = 0; slotIndex < count; slotIndex += 1) {
          assignments.push({
            clusterId,
            routeId: route.id,
            slotIndex,
            slotCount: count,
            routeIndex,
          });
        }
      });
    });

    return assignments.slice(0, scenario.mapFleet);
  }

  function normalizeDistance(distance, totalLength) {
    if (!Number.isFinite(totalLength) || totalLength <= 0) return 0;
    const wrapped = distance % totalLength;
    return wrapped < 0 ? wrapped + totalLength : wrapped;
  }

  function getPoseAtDistance(route, distance) {
    const wrappedDistance = normalizeDistance(distance, route.totalLength);
    const lengths = route.cumulativeLengths;
    const points = route.sampledPoints;
    let segmentIndex = 1;

    while (segmentIndex < lengths.length && lengths[segmentIndex] < wrappedDistance) {
      segmentIndex += 1;
    }

    if (segmentIndex >= lengths.length) segmentIndex = lengths.length - 1;

    const previousIndex = Math.max(0, segmentIndex - 1);
    const segmentStart = points[previousIndex];
    const segmentEnd = points[segmentIndex] || points[previousIndex];
    const startLength = lengths[previousIndex];
    const endLength = lengths[segmentIndex] || route.totalLength;
    const span = Math.max(endLength - startLength, 0.0001);
    const t = clamp((wrappedDistance - startLength) / span, 0, 1);
    const x = segmentStart[0] + (segmentEnd[0] - segmentStart[0]) * t;
    const y = segmentStart[1] + (segmentEnd[1] - segmentStart[1]) * t;
    const heading =
      Math.atan2(segmentEnd[1] - segmentStart[1], segmentEnd[0] - segmentStart[0]) *
        (180 / Math.PI) +
      vehicleHeadingOffset;

    return { x, y, heading };
  }

  function lerpAngle(current, targetAngle, maxDelta) {
    let delta = ((targetAngle - current + 540) % 360) - 180;
    delta = clamp(delta, -maxDelta, maxDelta);
    return current + delta;
  }

  function createCar() {
    const node = document.createElement("span");
    node.className = `planner-fleet-car ${sizeConfig[scenario.sizeClass].className}`;
    node.innerHTML = vehicleMarkup;
    return node;
  }

  function getMapCopy(language) {
    return mapCopy[language] || mapCopy.en;
  }

  function localizeLabel(name, language) {
    const copy = getMapCopy(language);
    return copy.labels[name] || name;
  }

  function renderBaseMap() {
    const language = window.YANGO_PLANNER_LANGUAGE || "en";
    const copy = getMapCopy(language);
    const roadOrder = { street: 0, connector: 1, major: 2 };
    const roads = [...data.roads].sort((a, b) => roadOrder[a.tier] - roadOrder[b.tier]);
    const visibleRoads = roads
      .filter((road) => road.tier === "street")
      .slice(0, 640)
      .concat(roads.filter((road) => road.tier !== "street"));

    target.innerHTML = `
      <svg
        class="planner-abidjan-map"
        viewBox="0 0 ${data.meta.width} ${data.meta.height}"
        preserveAspectRatio="none"
        role="img"
        aria-label="${escapeHtml(copy.aria)}"
      >
        <rect class="planner-map-bg" width="${data.meta.width}" height="${data.meta.height}" />
        <g class="planner-water-layer">
          ${data.waterPolygons.map((water) => `<path class="planner-water-fill" d="${pathD(water.points, true)}" />`).join("")}
          ${data.waterways.map((water) => `<path class="planner-waterway" d="${pathD(water.points)}" />`).join("")}
        </g>
        <g class="planner-road-layer">
          ${visibleRoads.map((road) => `<path class="planner-road planner-road-${road.tier}" d="${pathD(road.points)}" />`).join("")}
        </g>
      </svg>
      <div class="planner-fleet-layer" data-planner-fleet-layer></div>
      ${data.labels
        .map(
          (label) => `
            <span
              class="planner-map-label ${label.type === "city" ? "planner-map-label-city" : ""}"
              data-label-name="${escapeHtml(label.name)}"
              style="left: ${(label.point[0] / data.meta.width) * 100}%; top: ${(label.point[1] / data.meta.height) * 100}%; --label-dx: ${label.dx || 0}px; --label-dy: ${label.dy || 0}px"
            >${escapeHtml(localizeLabel(label.name, language))}</span>
          `,
        )
        .join("")}
      <p class="planner-map-attribution">${escapeHtml(copy.attribution)}</p>
    `;
  }

  function setMapLanguage(language) {
    const copy = getMapCopy(language);
    target.querySelector(".planner-abidjan-map")?.setAttribute("aria-label", copy.aria);
    target.querySelectorAll("[data-label-name]").forEach((label) => {
      label.textContent = localizeLabel(label.dataset.labelName, language);
    });
    const attribution = target.querySelector(".planner-map-attribution");
    if (attribution) attribution.textContent = copy.attribution;
  }

  function renderVehiclePose(vehicle, pose) {
    vehicle.node.style.left = `${(pose.x / data.meta.width) * 100}%`;
    vehicle.node.style.top = `${(pose.y / data.meta.height) * 100}%`;
    vehicle.node.style.transform = `translate(-50%, -50%) rotate(${vehicle.heading}deg)`;
  }

  function createVehicleState(id, assignment) {
    const route = routeLookup.get(assignment.routeId);
    const node = createCar();
    const ratio = assignment.slotCount > 0 ? assignment.slotIndex / assignment.slotCount : 0;
    const clusterOffset = assignment.routeIndex * 0.055;
    const distance = normalizeDistance(route.totalLength * (ratio + clusterOffset), route.totalLength);
    const baseSpeed =
      route.baseSpeed * scenario.speedMultiplier * (0.96 + (assignment.slotIndex % 3) * 0.035);
    const pose = getPoseAtDistance(route, distance);

    return {
      id,
      node,
      routeId: route.id,
      clusterId: assignment.clusterId,
      distance,
      speed: baseSpeed,
      baseSpeed,
      targetSpeed: baseSpeed,
      heading: pose.heading,
    };
  }

  function mountFleet() {
    const layer = target.querySelector("[data-planner-fleet-layer]");
    if (!layer) return;

    layer.innerHTML = "";
    vehicles = allocateFleetByCluster().map((assignment, index) => {
      const vehicle = createVehicleState(index, assignment);
      layer.appendChild(vehicle.node);
      return vehicle;
    });

    vehicles.forEach((vehicle) => {
      const route = routeLookup.get(vehicle.routeId);
      renderVehiclePose(vehicle, getPoseAtDistance(route, vehicle.distance));
    });
  }

  function setMapFleetFromCars(cars) {
    const selectedCars = Number(cars);
    const nextFleet =
      fleetDensityByCars[selectedCars] || Math.round(clamp(selectedCars / 26, 12, 42));

    if (nextFleet === scenario.mapFleet) return;

    scenario.mapFleet = nextFleet;
    mountFleet();
  }

  function enforceRouteHeadway(routeVehicles, route) {
    if (routeVehicles.length <= 1) return;

    const sorted = [...routeVehicles].sort((a, b) => a.distance - b.distance);

    sorted.forEach((vehicle, index) => {
      const leader = sorted[(index + 1) % sorted.length];
      const spacing = sizeConfig[scenario.sizeClass].headway;
      let gap = leader.distance - vehicle.distance;
      if (gap <= 0) gap += route.totalLength;

      if (gap < spacing * 1.7) {
        const ratio = clamp((gap - spacing * 0.88) / (spacing * 0.82), 0, 1);
        const softFollowSpeed = leader.speed * (0.92 + ratio * 0.08);
        const routeCap = vehicle.baseSpeed * (0.34 + ratio * 0.66);
        vehicle.targetSpeed = Math.min(vehicle.targetSpeed, softFollowSpeed, routeCap);
      }
    });
  }

  function advanceFleet(deltaTime) {
    const vehiclesByRoute = routeLibrary.reduce((acc, route) => {
      acc[route.id] = [];
      return acc;
    }, {});

    vehicles.forEach((vehicle) => {
      vehicle.targetSpeed = vehicle.baseSpeed;
      vehiclesByRoute[vehicle.routeId].push(vehicle);
    });

    routeLibrary.forEach((route) => {
      enforceRouteHeadway(vehiclesByRoute[route.id], route);
    });

    vehicles.forEach((vehicle) => {
      const route = routeLookup.get(vehicle.routeId);
      const acceleration = vehicle.targetSpeed > vehicle.speed ? 15 : 24;
      const maxDelta = acceleration * deltaTime;
      const speedDelta = clamp(vehicle.targetSpeed - vehicle.speed, -maxDelta, maxDelta);
      vehicle.speed += speedDelta;
      vehicle.distance = normalizeDistance(vehicle.distance + vehicle.speed * deltaTime, route.totalLength);

      const pose = getPoseAtDistance(route, vehicle.distance);
      vehicle.heading = lerpAngle(vehicle.heading, pose.heading, maxTurnRate * deltaTime);
      renderVehiclePose(vehicle, pose);
    });
  }

  function stopAnimation() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    lastTickTime = null;
  }

  function tickFleet(time) {
    if (!lastTickTime) lastTickTime = time;

    const deltaTime = clamp((time - lastTickTime) / 1000, 0.008, 0.045);
    lastTickTime = time;

    advanceFleet(deltaTime);
    animationFrame = requestAnimationFrame(tickFleet);
  }

  function startAnimation() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopAnimation();
    animationFrame = requestAnimationFrame(tickFleet);
  }

  buildLoopLibrary();
  renderBaseMap();
  mountFleet();
  startAnimation();

  window.updatePlannerMapFleet = setMapFleetFromCars;
  window.updatePlannerMapLanguage = setMapLanguage;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
      return;
    }

    startAnimation();
  });
})();
