const numDivs = 36
const maxHits = 11

let hits = 1
let firstHitTime = 0
let flagsNumber = 0
let miss = 0
let missEdict = 0

function round() {
  $("#win-message").addClass("d-none")

  $(".col").removeClass("target")

  let divSelector = randomDivId()

  $(divSelector).addClass("target")
  // TODO: помечать target текущим номером (!!Но ведь тогда это будте мешать людям реагировать на зеленый!!)

  if (flagsNumber % 2 != 1) {
    $(".target").text(hits)
  }

  if (hits == 1) {
    firstHitTime = getTimestamp()
  }

  if (hits === maxHits) {
    $(".target").text("")
    endGame()
  }
}

function progressBar() {
  $(".progress-bar").width(hits + "0" + "%")
  if (hits != 1) {
    $(".progress-bar").text("Очки попаданий: " + (hits - (miss + 1)) + " / 10")
  }
  else {
    $(".progress-bar").text("")
  }
}

function endGame() {
  $(".col").removeClass("target")

  let totalPlayedMillis = getTimestamp() - firstHitTime
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3)
  $("#total-time-played").text(totalPlayedSeconds)

  $("#win-message").removeClass("d-none")
}

function handleClick(event) {
  $(".target").text("")

  if ($(event.target).hasClass("target")) {
    hits = hits + 1
    progressBar()
    round()
  }
  else {
    missEdict = getTimestamp()
    miss = miss + 1
    if (hits == 1 && miss == 1) {
      location.reload()
    }
    else {
      progressBar()
      $(event.target).addClass("miss")
      $(event.target).text("-" + miss)
      setTimeout(function() {
        $(event.target).removeClass("miss")
        $(event.target).text("")
      }, 700)
      round()
    }
  }
}

function init() {
  $("#defaultCheck").change(function() {
    flagsNumber = flagsNumber + 1
  })

  $(".game-field").click(handleClick)

  $("#button-reload").click(function() { 
    hits = 1 
    miss = 0
    $(".target").text("")
  })

  $("#button-reload").click(round)
  
}

$(document).ready(init)
