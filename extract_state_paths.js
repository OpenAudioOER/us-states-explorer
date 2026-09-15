const fs = require('fs');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

const unit1Fips = {
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

const unit2Fips = {
  "02": { id: "AK", name: "Alaska", capital: "Juneau", region: "Non-Contiguous", funFact: "Alaska is the largest US state by land area—more than double the size of Texas!" },
  "04": { id: "AZ", name: "Arizona", capital: "Phoenix", region: "West", funFact: "Arizona is home to the Grand Canyon, one of the 7 Natural Wonders of the World!" },
  "06": { id: "CA", name: "California", capital: "Sacramento", region: "West Coast", funFact: "California is home to the tallest living trees in the world (Redwoods)!" },
  "08": { id: "CO", name: "Colorado", capital: "Denver", region: "Rockies", funFact: "Colorado is called the Centennial State and has over 50 mountains higher than 14,000 feet!" },
  "15": { id: "HI", name: "Hawaii", capital: "Honolulu", region: "Non-Contiguous", funFact: "Hawaii is the only US state made entirely of islands!" },
  "16": { id: "ID", name: "Idaho", capital: "Boise", region: "Rockies", funFact: "Idaho produces about one-third of all potatoes grown in the United States!" },
  "17": { id: "IL", name: "Illinois", capital: "Springfield", region: "Midwest", funFact: "The first Ferris wheel and the world’s first skyscraper were built in Chicago, Illinois!" },
  "18": { id: "IN", name: "Indiana", capital: "Indianapolis", region: "Midwest", funFact: "Indiana hosts the famous Indianapolis 500 auto race every year!" },
  "19": { id: "IA", name: "Iowa", capital: "Des Moines", region: "Heartland", funFact: "Iowa has more pigs than people!" },
  "20": { id: "KS", name: "Kansas", capital: "Topeka", region: "Heartland", funFact: "Kansas is famous as the sunflower state and the setting of The Wizard of Oz!" },
  "26": { id: "MI", name: "Michigan", capital: "Lansing", region: "Great Lakes", funFact: "Michigan touches 4 of the 5 Great Lakes and has the longest freshwater coastline!" },
  "27": { id: "MN", name: "Minnesota", capital: "Saint Paul", region: "Heartland", funFact: "Minnesota is known as the Land of 10,000 Lakes!" },
  "29": { id: "MO", name: "Missouri", capital: "Jefferson City", region: "Heartland", funFact: "The Gateway Arch in Saint Louis, Missouri is the tallest monument in the US!" },
  "30": { id: "MT", name: "Montana", capital: "Helena", region: "Rockies", funFact: "Montana has more elk, deer, and antelope than humans!" },
  "31": { id: "NE", name: "Nebraska", capital: "Lincoln", region: "Heartland", funFact: "Kool-Aid was invented in Hastings, Nebraska in 1927!" },
  "32": { id: "NV", name: "Nevada", capital: "Carson City", region: "West", funFact: "Nevada is the driest state in the US, getting only about 7 inches of rain per year!" },
  "35": { id: "NM", name: "New Mexico", capital: "Santa Fe", region: "West", funFact: "Santa Fe, New Mexico is the highest capital city in the US (over 7,000 feet high)!" },
  "38": { id: "ND", name: "North Dakota", capital: "Bismarck", region: "Heartland", funFact: "North Dakota grows more sunflowers and honey than almost any other state!" },
  "39": { id: "OH", name: "Ohio", capital: "Columbus", region: "Great Lakes", funFact: "Seven US presidents were born in Ohio, earning it the nickname Mother of Presidents!" },
  "40": { id: "OK", name: "Oklahoma", capital: "Oklahoma City", region: "Heartland", funFact: "Oklahoma has a panhandle shape and the official state meal includes fried okra!" },
  "41": { id: "OR", name: "Oregon", capital: "Salem", region: "West Coast", funFact: "Oregon is home to Crater Lake, the deepest lake in the United States!" },
  "46": { id: "SD", name: "South Dakota", capital: "Pierre", region: "Heartland", funFact: "South Dakota is home to Mount Rushmore, featuring giant stone faces of 4 presidents!" },
  "48": { id: "TX", name: "Texas", capital: "Austin", region: "Heartland", funFact: "Texas is so big that its second-largest city is bigger than some whole states!" },
  "49": { id: "UT", name: "Utah", capital: "Salt Lake City", region: "West", funFact: "Utah is famous for its arches, canyons, and red rock natural bridges!" },
  "53": { id: "WA", name: "Washington", capital: "Olympia", region: "West Coast", funFact: "Washington state produces more apples than any other US state!" },
  "55": { id: "WI", name: "Wisconsin", capital: "Madison", region: "Great Lakes", funFact: "Wisconsin is known as America’s Dairyland and produces famous cheddar cheese!" },
  "56": { id: "WY", name: "Wyoming", capital: "Cheyenne", region: "Rockies", funFact: "Wyoming is home to Yellowstone, the very first National Park in the world!" }
};

const us = require('us-atlas/states-albers-10m.json');
const statesGeo = topojson.feature(us, us.objects.states).features;
const pathGenerator = d3Geo.geoPath();

function processSet(fipsMap) {
  const result = [];
  for (const feature of statesGeo) {
    const meta = fipsMap[feature.id];
    if (!meta) continue;

    const d = pathGenerator(feature);
    const bounds = pathGenerator.bounds(feature);
    const minX = bounds[0][0];
    const minY = bounds[0][1];
    const width = bounds[1][0] - minX;
    const height = bounds[1][1] - minY;
    
    const padX = width * 0.08;
    const padY = height * 0.08;
    const viewBox = `${minX - padX} ${minY - padY} ${width + padX * 2} ${height + padY * 2}`;

    result.push({
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
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

const unit1States = processSet(unit1Fips);
const unit2States = processSet(unit2Fips);

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

export const UNIT_2_STATES: StateInfo[] = ${JSON.stringify(unit2States, null, 2)};

export const ALL_50_STATES: StateInfo[] = ${JSON.stringify([...unit1States, ...unit2States].sort((a,b)=>a.name.localeCompare(b.name)), null, 2)};
`;

fs.writeFileSync('./src/data/statesData.ts', tsOutput);
console.log(`Successfully generated ${unit1States.length} Unit 1 states and ${unit2States.length} Unit 2 states!`);
