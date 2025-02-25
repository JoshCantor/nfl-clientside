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

// Dict Format --> Abr: [Wins Owner, Losses Owner, Wins, Losses, Ties]
// Shows who owns each team
var teams = {
  "ARI": ["Howard", "Tyler", 0, 0, 0],
  "ATL": ["Howard", "Hogan", 0, 0, 0],
  "BAL": ["Jamie", "Jessica", 0, 0, 0],
  "BUF": ["Thome", "Team Conn", 0, 0, 0],
  "CAR": ["Barbara", "Jessica", 0, 0, 0],
  "CHI": ["Susan", "Narva", 0, 0, 0],
  "CIN": [null, "Thome", 0, 0, 0],
  "CLE": ["Howard", "Jamie", 0, 0, 0],
  "DAL": ["Team Conn", "Hogan", 0, 0, 0],
  "DEN": ["Susan", "Thome", 0, 0, 0],
  "DET": ["Howard", "Jessica", 0, 0, 0],
  "GB": ["Tyler", "Narva", 0, 0, 0],
  "HOU": ["Jamie", "Barbara", 0, 0, 0],
  "IND": ["Hogan", "Tyler", 0, 0, 0],
  "JAC": ["Tyler", "Narva", 0, 0, 0], // JSON file uses "JAX"
  "KC": ["Thome", null, 0, 0, 0],
  "LA": ["Howard", null, 0, 0, 0],
  "LAC": ["Hogan", "Jessica", 0, 0, 0],
  "MIA": ["Barbara", "Jamie", 0, 0, 0],
  "MIN": ["Susan", "Tyler", 0, 0, 0],
  "NE": ["Team Conn", "Thome", 0, 0, 0],
  "NO": ["Barbara", "Jamie", 0, 0, 0],
  "NYG": ["Jamie", "Narva", 0, 0, 0],
  "NYJ": ["Susan", "Team Conn", 0, 0, 0],
  "OAK": [null, "Narva", 0, 0, 0],
  "PHI": ["Thome", "Howard", 0, 0, 0],
  "PIT": ["Barbara", "Susan", 0, 0, 0],
  "SF": ["Barbara", "Hogan", 0, 0, 0],
  "SEA": ["Jessica", "Hogan", 0, 0, 0],
  "TB": ["Tyler", "Susan", 0, 0, 0],
  "TEN": ["Team Conn", "Jessica", 0, 0, 0],
  "WAS": ["Team Conn", "Narva", 0, 0, 0]
}

var standings = {
  "Narva": [
    [-1, -1, 7], // Rank, Total Pts., and Rd 1 pick #
    ["OAK", "L", ""], // Blank string will hold pts for each team
    ["WAS", "L", ""],
    ["NYG", "L", ""],
    ["JAC", "L", ""],
    ["CHI", "L", ""],
    ["GB", "L", ""]
  ],
  "Jamie": [
    [-1, -1, 1], // Rank, Total Pts., and Rd 1 pick #
    ["MIA", "L", ""], // Blank string will hold pts for each team
    ["HOU", "W", ""],
    ["BAL", "W", ""],
    ["CLE", "L", ""],
    ["NYG", "W", ""],
    ["NO", "L", ""]
  ],
  "Barbara": [
    [-1, -1, 8], // Rank, Total Pts., and Rd 1 pick #
    ["NO", "W", ""], // Blank string will hold pts for each team
    ["PIT", "W", ""],
    ["HOU", "L", ""],
    ["CAR", "W", ""],
    ["SF", "W", ""],
    ["MIA", "W", ""]
  ],
  "Jessica": [
    [-1, -1, 4], // Rank, Total Pts., and Rd 1 pick #
    ["SEA", "W", ""], // Blank string will hold pts for each team
    ["DET", "L", ""],
    ["TEN", "L", ""],
    ["CAR", "L", ""],
    ["BAL", "L", ""],
    ["LAC", "L", ""]
  ],
  "Hogan": [
    [-1, -1, 6], // Rank, Total Pts., and Rd 1 pick #
    ["CIN", "L", ""], // Blank string will hold pts for each team
    ["LAC", "W", ""],
    ["IND", "W", ""],
    ["SF", "L", ""],
    ["ATL", "L", ""],
    ["SEA", "L", ""]
  ],
  "Thome": [
    [-1, -1, 3], // Rank, Total Pts., and Rd 1 pick #
    ["KC", "W", ""], // Blank string will hold pts for each team
    ["PHI", "W", ""],
    ["DEN", "L", ""],
    ["DAL", "L", ""],
    ["BUF", "W", ""],
    ["NE", "L", ""]
  ],
  "Susan": [
    [-1, -1, 10], // Rank, Total Pts., and Rd 1 pick #
    ["CHI", "W", ""], // Blank string will hold pts for each team
    ["TB", "L", ""],
    ["MIN", "W", ""],
    ["DEN", "W", ""],
    ["NYJ", "W", ""],
    ["PIT", "L", ""]
  ],
  "Team Conn": [
    [-1, -1, 2], // Rank, Total Pts., and Rd 1 pick #
    ["NE", "W", ""], // Blank string will hold pts for each team
    ["BUF", "L", ""],
    ["DAL", "W", ""],
    ["NYJ", "L", ""],
    ["TEN", "W", ""],
    ["WAS", "W", ""]
  ],
  "Tyler": [
    [-1, -1, 5], // Rank, Total Pts., and Rd 1 pick #
    ["ARI", "L", ""], // Blank string will hold pts for each team
    ["GB", "W", ""],
    ["JAC", "W", ""],
    ["IND", "L", ""],
    ["MIN", "L", ""],
    ["TB", "W", ""]
  ],
  "Howard": [
    [-1, -1, 9], // Rank, Total Pts., and Rd 1 pick #
    ["LA", "W", ""], // Blank string will hold pts for each team
    ["CLE", "W", ""],
    ["ATL", "W", ""],
    ["PHI", "L", ""],
    ["ARI", "W", ""],
    ["DET", "W", ""]
  ]
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
    parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml")

    // Iterates through each team
    var x = xmlDoc.getElementsByTagName('teamStanding');
    for (i = 0; i < x.length; i++) {

      // Key for the team in the standings dict
      var teamAbbr = x[i].childNodes[0].getAttribute("abbr")

      // Switches JAX to JAC to fit the JSON data instead of XML data
      if (teamAbbr == "JAX") {
        teamAbbr = "JAC"
      }


      // Update wins, losses, then ties in the teams dict
      teams[teamAbbr][2] = x[i].childNodes[1].getAttribute("overallWins")
      teams[teamAbbr][3] = x[i].childNodes[1].getAttribute("overallLosses")
      teams[teamAbbr][4] = x[i].childNodes[1].getAttribute("overallTies")
    }

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

    console.log(standings)
    console.log(teams)
    // Determines each persons rank

    var pointsCounter = 0

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