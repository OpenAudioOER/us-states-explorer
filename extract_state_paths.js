const fs = require('fs');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

// US State FIPS codes mapping
const fipsToState = {
  "01": { id: "AL", name: "Alabama", capital: "Montgomery", region: "Southeast", funFact: "Alabama built the rocket that put the first humans on the moon!" },
  "05": { id: "AR", name: "Arkansas", capital: "Little Rock", region: "Southeast", funFact: "Arkansas has the only active diamond mine open to the public in the US!" },
  "09": { id: "CT", name: "Connecticut", capital: "Hartford", region: "New England", funFact: "The first hamburger and first color TV were made in Connecticut!" },
  "10": { id: "DE", name: "Delaware", capital: "Dover", region: "Mid-Atlantic", funFact: "Delaware was the very first state to ratify the US Constitution!" },
  "12": { id: "FL", name: "Florida", capital: "Tallahassee", region: "Southeast", funFact: "Florida is the only place where alligators and crocodiles live together!" },
  "13": { id: "GA", name: "Georgia", capital: "Atlanta", region: "Southeast", funFact: "Georgia is famous for peaches, pecans, and peanuts!" },
  "21": { id: "KY", name: "Kentucky", capital: "Frankfort", region: "Southeast", funFact: "Kentucky is famous for the Kentucky Derby horse race!" },
  "22": { id: "LA", name: "Louisiana", capital: "Baton Rouge", region: "Southeast", funFact: "Louisiana was named after King Louis XIV of France!" },
  "23": { id: "ME", name: "Maine", capital: "Augusta", region: "New England", funFact: "Maine produces over 90% of the United States' blueberry crop!" },
  "24": { id: "MD", name: "Maryland", capital: "Annapolis", region: "Mid-Atlantic", funFact: "The US National Anthem was written off the coast of Baltimore, Maryland!" },
  "25": { id: "MA", name: "Massachusetts", capital: "Boston", region: "New England", funFact: "Basketball and volleyball were both invented in Massachusetts!" },
  "28": { id: "MS", name: "Mississippi", capital: "Jackson", region: "Southeast", funFact: "The Teddy Bear was invented in Mississippi inspired by President Theodore Roosevelt!" },
  "33": { id: "NH", name: "New Hampshire", capital: "Concord", region: "New England", funFact: "New Hampshire's motto is 'Live Free or Die'!" },
  "34": { id: "NJ", name: "New Jersey", capital: "Trenton", region: "Mid-Atlantic", funFact: "New Jersey has the most diners in the world!" },
  "36": { id: "NY", name: "New York", capital: "Albany", region: "Mid-Atlantic", funFact: "The Statue of Liberty in New York was a gift from France!" },
  "37": { id: "NC", name: "North Carolina", capital: "Raleigh", region: "Southeast", funFact: "The Wright brothers made the first successful powered airplane flight here!" },
  "42": { id: "PA", name: "Pennsylvania", capital: "Harrisburg", region: "Mid-Atlantic", funFact: "Philadelphia was once the capital city of the United States!" },
  "44": { id: "RI", name: "Rhode Island", capital: "Providence", region: "New England", funFact: "Rhode Island is the smallest state in area in the whole US!" },
  "45": { id: "SC", name: "South Carolina", capital: "Columbia", region: "Southeast", funFact: "South Carolina produces more peaches than Georgia in some years!" },
  "47": { id: "TN", name: "Tennessee", capital: "Nashville", region: "Southeast", funFact: "Nashville, Tennessee is known as the Country Music Capital of the World!" },
  "50": { id: "VT", name: "Vermont", capital: "Montpelier", region: "New England", funFact: "Vermont is the leading producer of maple syrup in the US!" },
  "51": { id: "VA", name: "Virginia", capital: "Richmond", region: "Southeast", funFact: "Eight US presidents were born in Virginia!" },
  "54": { id: "WV", name: "West Virginia", capital: "Charleston", region: "Southeast", funFact: "West Virginia is known as the Mountain State!" }
};

// Load us-atlas Albers projected 10m topology
const us = require('us-atlas/states-albers-10m.json');
const statesGeo = topojson.feature(us, us.objects.states).features;

const pathGenerator = d3Geo.geoPath();

const unit1States = [];

for (const feature of statesGeo) {
  const fips = feature.id;
  const meta = fipsToState[fips];
  if (!meta) continue; // Only process Unit 1 states for now

  // Generate exact SVG path string from Census Bureau geography
  const d = pathGenerator(feature);
  
  // Calculate bounding box [[minX, minY], [maxX, maxY]] for individual viewBox
  const bounds = pathGenerator.bounds(feature);
  const minX = bounds[0][0];
  const minY = bounds[0][1];
  const width = bounds[1][0] - minX;
  const height = bounds[1][1] - minY;
  
  // Padding around state shape
  const padX = width * 0.08;
  const padY = height * 0.08;
  const viewBox = `${minX - padX} ${minY - padY} ${width + padX * 2} ${height + padY * 2}`;

  unit1States.push({
    id: meta.id,
    name: meta.name,
    capital: meta.capital,
    region: meta.region,
    funFact: meta.funFact,
    viewBox,
    path: d,
    bounds: { minX, minY, width, height }
  });
}

// Sort alphabetically by state name
unit1States.sort((a, b) => a.name.localeCompare(b.name));

const tsOutput = `export interface StateInfo {
  id: string;
  name: string;
  capital: string;
  region: string;
  funFact: string;
  viewBox: string;
  path: string;
  bounds?: { minX: number; minY: number; width: number; height: number };
}

export const US_MAP_VIEWBOX = "0 0 975 610";

export const UNIT_1_STATES: StateInfo[] = ${JSON.stringify(unit1States, null, 2)};
`;

fs.writeFileSync('./src/data/statesData.ts', tsOutput);
console.log(`Successfully generated ${unit1States.length} real state shapes!`);
