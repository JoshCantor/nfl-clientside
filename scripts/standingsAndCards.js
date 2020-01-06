// ###########
// API Sources
// ###########

// (1) For team wins, losses, and other details:
// http://www.nfl.com/feeds-rs/standings/2019/REG

// (2) For current week's standings
// http://www.nfl.com/liveupdate/scores/scores.json

// ###############
// Data Structures
// ###############

// Teams
const arizona =  "ARI";
const atlanta =  "ATL";
const baltimore =  "BAL";
const buffalo =  "BUF";
const carolina =  "CAR";
const chicago =  "CHI";
const cincinatti =  "CIN";
const cleveland =  "CLE";
const dallas =  "DAL";
const denver =  "DEN";
const detroit =  "DET";
const greenBay =  "GB";
const houston =  "HOU";
const indianapolis =  "IND";
const jacksonville =  "JAC"; // JSON file uses "JAX"
const kansasCity =  "KC";
const losAngelesRams =  "LA";
const losAngelesChargers =  "LAC";
const miami =  "MIA";
const minnesota =  "MIN";
const newEngland =  "NE";
const newOrleans =  "NO";
const newYorkGiants =  "NYG";
const newYorkJets =  "NYJ";
const oakland =  "OAK";
const philadelphia =  "PHI";
const pittsburgh =  "PIT";
const sanFrancisco =  "SF";
const seatle =  "SEA";
const tampaBay =  "TB";
const tennessee =  "TEN";
const washington =  "WAS";

//Owners
const barbara = "Barbara";
const hogan = "Hogan";
const howard = "Howard";
const jamie = "Jamie";
const jessica = "Jessica"
const narva = "Narva";
const susan = "Susan";
const teamConn = "Team Conn";
const thome = "Thome";
const tyler = "Tyler";

const ownersToPickNum = {
  [barbara]: 8,
  [hogan]: 6,
  [howard]: 9,
  [jamie]: 1,
  [jessica]: 4,
  [narva]: 7,
  [susan]: 10,
  [teamConn]: 2,
  [thome]: 3,
  [tyler]: 5
};

// const createTeamOwnership = (winsOwner, lossesOwner) => {
//   return {
//     winsOwner: winsOwner,
//     lossesOwner: lossesOwner,
//     wins: 0,
//     losses: 0,
//     ties: 0
//   };
// };
function createTeamOwnership(winsOwner, lossesOwner) {
  return {
    winsOwner: winsOwner,
    lossesOwner: lossesOwner,
    wins: 0,
    losses: 0,
    ties: 0
  };
};

var teams = {
  [arizona]: createTeamOwnership(howard, tyler),
  [atlanta]: createTeamOwnership(howard, hogan),
  [baltimore]: createTeamOwnership(jamie, jessica),
  [buffalo]: createTeamOwnership(thome, teamConn),
  [carolina]: createTeamOwnership(barbara, jessica),
  [chicago]: createTeamOwnership(susan, narva),
  [cincinatti]: createTeamOwnership(null, thome), 
  [cleveland]: createTeamOwnership(howard, jamie),
  [dallas]: createTeamOwnership(teamConn, hogan),
  [denver]: createTeamOwnership(susan, thome),
  [detroit]: createTeamOwnership(howard, jessica),
  [greenBay]: createTeamOwnership(tyler, narva),
  [houston]: createTeamOwnership(jamie, barbara),
  [indianapolis]: createTeamOwnership(hogan, tyler),
  [jacksonville]: createTeamOwnership(tyler, narva),
  [kansasCity]: createTeamOwnership(thome, null),
  [losAngelesRams]: createTeamOwnership(howard, null), 
  [losAngelesChargers]: createTeamOwnership(hogan, jessica),
  [miami]: createTeamOwnership(barbara, jamie),
  [minnesota]: createTeamOwnership(susan, tyler),
  [newEngland]: createTeamOwnership(teamConn, thome),
  [newOrleans]: createTeamOwnership(barbara, jamie),
  [newYorkGiants]: createTeamOwnership(jamie, narva),
  [newYorkJets]: createTeamOwnership(susan, teamConn),  
  [oakland]: createTeamOwnership(null, narva), 
  [philadelphia]: createTeamOwnership(thome, howard),
  [pittsburgh]: createTeamOwnership(barbara, susan),
  [sanFrancisco]: createTeamOwnership(barbara, hogan),
  [seatle]: createTeamOwnership(jessica, hogan),
  [tampaBay]: createTeamOwnership(tyler, susan),
  [tennessee]: createTeamOwnership(teamConn, jessica),
  [washington]: createTeamOwnership(teamConn, narva)
};

const standings = {};

const createStandings = () => {
  for (const owner in ownersToPickNum) {
    const pickNum = ownersToPickNum[owner];
    standings[owner] = [[-1, -1, pickNum]];
  };
  for (const team in teams) {
    const ownership = teams[team];
    const winsOwner = ownership.winsOwner;
    const lossesOwner = ownership.lossesOwner;
    if (winsOwner) {
      standings[winsOwner].push([team, "W", ""]);
    }
    if (lossesOwner) {
      standings[lossesOwner].push([team, "L", ""]);
    }
  };
};

console.log(standings);

createStandings();

// var standings = {
//   [narva]: [
//     [-1, -1, 7], // Rank, Total Pts., and Rd 1 pick #
//     ["OAK", "L", ""], // Blank string will hold pts for each team
//     ["WAS", "L", ""],
//     ["NYG", "L", ""],
//     ["JAC", "L", ""],
//     ["CHI", "L", ""],
//     ["GB", "L", ""]
//   ],
//   [jamie]: [
//     [-1, -1, 1], // Rank, Total Pts., and Rd 1 pick #
//     ["MIA", "L", ""], // Blank string will hold pts for each team
//     ["HOU", "W", ""],
//     ["BAL", "W", ""],
//     ["CLE", "L", ""],
//     ["NYG", "W", ""],
//     ["NO", "L", ""]
//   ],
//   [barbara]: [
//     [-1, -1, 8], // Rank, Total Pts., and Rd 1 pick #
//     ["NO", "W", ""], // Blank string will hold pts for each team
//     ["PIT", "W", ""],
//     ["HOU", "L", ""],
//     ["CAR", "W", ""],
//     ["SF", "W", ""],
//     ["MIA", "W", ""]
//   ],
//   [jessica]: [
//     [-1, -1, 4], // Rank, Total Pts., and Rd 1 pick #
//     ["SEA", "W", ""], // Blank string will hold pts for each team
//     ["DET", "L", ""],
//     ["TEN", "L", ""],
//     ["CAR", "L", ""],
//     ["BAL", "L", ""],
//     ["LAC", "L", ""]
//   ],
//   [hogan]: [
//     [-1, -1, 6], // Rank, Total Pts., and Rd 1 pick #
//     ["CIN", "L", ""], // Blank string will hold pts for each team
//     ["LAC", "W", ""],
//     ["IND", "W", ""],
//     ["SF", "L", ""],
//     ["ATL", "L", ""],
//     ["SEA", "L", ""]
//   ],
//   [thome]: [
//     [-1, -1, 3], // Rank, Total Pts., and Rd 1 pick #
//     ["KC", "W", ""], // Blank string will hold pts for each team
//     ["PHI", "W", ""],
//     ["DEN", "L", ""],
//     ["DAL", "L", ""],
//     ["BUF", "W", ""],
//     ["NE", "L", ""]
//   ],
//   [susan]: [
//     [-1, -1, 10], // Rank, Total Pts., and Rd 1 pick #
//     ["CHI", "W", ""], // Blank string will hold pts for each team
//     ["TB", "L", ""],
//     ["MIN", "W", ""],
//     ["DEN", "W", ""],
//     ["NYJ", "W", ""],
//     ["PIT", "L", ""]
//   ],
//   [teamConn]: [
//     [-1, -1, 2], // Rank, Total Pts., and Rd 1 pick #
//     ["NE", "W", ""], // Blank string will hold pts for each team
//     ["BUF", "L", ""],
//     ["DAL", "W", ""],
//     ["NYJ", "L", ""],
//     ["TEN", "W", ""],
//     ["WAS", "W", ""]
//   ],
//   [tyler]: [
//     [-1, -1, 5], // Rank, Total Pts., and Rd 1 pick #
//     ["ARI", "L", ""], // Blank string will hold pts for each team
//     ["GB", "W", ""],
//     ["JAC", "W", ""],
//     ["IND", "L", ""],
//     ["MIN", "L", ""],
//     ["TB", "W", ""]
//   ],
//   [howard]: [
//     [-1, -1, 9], // Rank, Total Pts., and Rd 1 pick #
//     ["LA", "W", ""], // Blank string will hold pts for each team
//     ["CLE", "W", ""],
//     ["ATL", "W", ""],
//     ["PHI", "L", ""],
//     ["ARI", "W", ""],
//     ["DET", "W", ""]
//   ]
// }

const updateTeamStandings = (latestStandings) => {
  for (let i = 0; i < latestStandings.length; i++) {
      const teamStanding = latestStandings[i];
      // Key for the team in the standings dict
      var teamAbbr = teamStanding.childNodes[0].getAttribute("abbr")

      // Switches JAX to JAC to fit the JSON data instead of XML data
      if (teamAbbr == "JAX") {
        teamAbbr = "JAC"
      }

      // Update wins, losses, then ties in the teams dict
      const currentTeam = teams[teamAbbr];
      const standing = teamStanding.childNodes[1];
      currentTeam.wins = standing.getAttribute("overallWins")
      currentTeam.losses = standing.getAttribute("overallLosses")
      currentTeam.ties = standing.getAttribute("overallTies")
    }
}

const updateOwnerStandings = () => {
      // Updates the points per team and overall points in the standings dict
    for (participant in standings) {
      var sumOfPoints = 0
      for (draftedTeam in standings[participant]) {

        // Updates pts for drafted team after checking if wins or losses are needed
        if (standings[participant][draftedTeam][1] == "W") {
          var points = teams[standings[participant][draftedTeam][0]][2]
          standings[participant][draftedTeam][2] = points
          sumOfPoints += Number(points)
        }
        // If team is for losses
        else if (standings[participant][draftedTeam][1] == "L") {
          var points = teams[standings[participant][draftedTeam][0]][3]
          standings[participant][draftedTeam][2] = points
          sumOfPoints += Number(points)
        }
      }

      // Updates overall points
      standings[participant][0][1] = sumOfPoints
    }
}

// #######################
// Collect Wins and Losses
// Updates teams then standings dicts
// #######################

// Uses API (1) to update teams with accurate wins, losses, and ties
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Turns string received from NFL into XML object
    const parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml")

    // Iterates through each team
    var teamStandings = xmlDoc.getElementsByTagName('teamStanding');
    updateTeamStandings(teamStandings);
    updateOwnerStandings();

    console.log(standings)
    console.log(teams)
  }
}

// Actualy live API Get request
xhttp.open("GET", "http://www.nfl.com/feeds-rs/standings/2019/REG", true);

// Used when testing from local file (for flights with no wifi)
// xhttp.open("GET", "http://localhost:8888/APIs/xml.xml", true);
xhttp.send();


// #############################
// Generates Standings table
// #############################

const standingsTable = document.createElement('table')
standingsTable.className += " table"

const standingsTableHead = document.createElement('thead')
standingsTable.className += " thead-dark"

const standingsTableHeadRow = document.createElement('trow')

const standingsTableBody = document.createElement('tbody')

//standingsTable.appendChild()


// ########################
// Generates the Scorecards
// ########################

// Sets constant app to the first div inside the body
const gameCardContainer = document.getElementById('gameCardContainer')

var request = new XMLHttpRequest()

// Actual JSON file to request
request.open('GET', 'http://www.nfl.com/liveupdate/scores/scores.json', true)

// Local JSON file for testing when flying without wifi
// request.open('GET', 'http://localhost:8888/APIs/json.json', true)

request.onload = function () {
  // Begin accessing JSON data here
  // Builds new elements as it goes
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {

    // This is the first time I was able to access something deep in the nest. Now I need to figure out how to iterate through the games
    for (game in data) {

      var gameId = game // holds iterator index for loop

      // Current quarter, can be null, 1, 2, 3, 4, ??
      const qtr = data[gameId]["qtr"]

      // Card element
      const gameCard = document.createElement('div')
      gameCard.className += " card gameCard shadow"

      // Main body of card (everything except footer)
      const gameCardBody = document.createElement('div')
      gameCardBody.className += ' card-body'

      // Looks up score
      // Replaces null values with 0 when games have not begun
      var awayScore, homeScore
      if (qtr == null || qtr == "Pregame") {
        awayScore = "0"
        homeScore = "0"
      } else {
        awayScore = data[gameId]["away"]["score"]["T"]
        homeScore = data[gameId]["home"]["score"]["T"]
      }


      var awayWinsOwner = ""
      var awayLossesOwner = ""
      var homeWinsOwner = ""
      var homeLossesOwner = ""

      // Looks up team owners, fills in owners if they exist
      if (teams[data[gameId]["away"]["abbr"]][0] != null) {
        awayWinsOwner = "<b>W: </b>" + teams[data[gameId]["away"]["abbr"]][0] + " "
      }
      if (teams[data[gameId]["away"]["abbr"]][1] != null) {
        awayLossesOwner = "<b>L: </b>" + teams[data[gameId]["away"]["abbr"]][1]
      }
      if (teams[data[gameId]["home"]["abbr"]][0] != null) {
        homeWinsOwner = "<b>W: </b>" + teams[data[gameId]["home"]["abbr"]][0] + " "
      }
      if (teams[data[gameId]["home"]["abbr"]][1] != null) {
        homeLossesOwner = "<b>L: </b>" + teams[data[gameId]["home"]["abbr"]][1]
      }

      // Away team (top). Placed in gameCard <div>
      const awayTeamInfo = document.createElement('div')
      awayTeamInfo.className += ' gameCardScore'
      awayTeamInfo.innerHTML = (
        "<h4>" + data[gameId]["away"]["abbr"] + " " + +awayScore + " </h4>" +
        "<span class='gameCardOwner'>" + awayWinsOwner + awayLossesOwner + "</span>"
      )

      // Home team (bottom). Placed in gameCard <div>
      const homeTeamInfo = document.createElement('div')
      homeTeamInfo.className += ' gameCardScore'
      homeTeamInfo.innerHTML = (
        "<h4>" + data[gameId]["home"]["abbr"] + " " + +homeScore + " </h4>" +
        "<span class='gameCardOwner'>" + homeWinsOwner + homeLossesOwner + "</span>"
      )

      // Footer time details
      const details = document.createElement('div')
      details.className += ' gameCardDetails card-footer text-right'

      // If game has not begun
      if (qtr == null || qtr == "Pregame") {
        details.innerHTML = ("<i>Pregame</i>")
        details.className += " gameCardFooterPregame"

        // If game in progress
      } else if (qtr != "Final") {
        details.innerHTML = (data[gameId]["clock"] + " | " + qtr)
        gameCard.className += " border-secondary"
        details.className += " gameCardFooterInProgress"


        // If game has ended
      } else {
        details.innerHTML = ("<i>Game Over</i>")
        gameCard.className += " border-dark"
        details.className += " gameCardFooterGameOver"
      }

      // Adds info to gameCardBody
      gameCardBody.appendChild(awayTeamInfo)
      gameCardBody.appendChild(homeTeamInfo)

      // Adds gameCardBody to gameCard
      gameCard.appendChild(gameCardBody)
      gameCard.appendChild(details)

      // Add .gameCard to .gameCardContainer
      gameCardContainer.appendChild(gameCard)
    }

  } else {
    // Error message for failed request
    console.log(`Gah, it's not working!`)
  }
}

request.send()