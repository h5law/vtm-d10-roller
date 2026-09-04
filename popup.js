let diceCount = 0;
let results = [];

let stats = {
  criticalWins: 0,
  messyCriticals: 0,
  successes: 0,
  bestialFailures: 0,
  messyFailures: 0,
  failures: 0
};

/* Elements */
const addDie = document.getElementById("add-die");

const poolCount = document.getElementById("pool-count");
const poolText = document.getElementById("pool-text");

const thresholdInput = document.getElementById("threshold");
const difficultyInput = document.getElementById("difficulty");

const rollButton = document.getElementById("roll");
const resetButton = document.getElementById("reset");

const resultsElement = document.getElementById("results");
const outcomeElement = document.getElementById("outcome");

const criticalsElement = document.getElementById("criticals");
const messyCriticalsElement = document.getElementById("messy-criticals");
const successesElement = document.getElementById("successes");

const bestialElement = document.getElementById("bestial");
const messyFailuresElement = document.getElementById("messy-failures");
const failuresElement = document.getElementById("failures");


/*  Safely read an integer from an input. */
function integerValue(input, fallback) {
  const value = Number.parseInt(input.value, 10);

  return Number.isFinite(value)
    ? value
    : fallback;
}


/* Update the displayed dice pool. */
function redrawPool() {
  poolCount.textContent = String(diceCount);
  poolText.textContent = diceCount === 1 ? "die" : "dice";

  rollButton.disabled = diceCount === 0;
}


/*
 * Calculate successes contributed by 10s.
 *
 * One 10 = 1 success
 * Every pair of 10s = 4 successes
 *
 * Therefore:
 * 0 tens = 0 successes
 * 1 ten  = 1 success
 * 2 tens = 4 successes
 * 3 tens = 5 successes
 * 4 tens = 8 successes
 * 5 tens = 9 successes
 * 6 tens = 12 successes
 * ...
 */
function successesFromTens(tens) {
  const pairs = Math.floor(tens / 2);
  const remainder = tens % 2;

  return (pairs * 4) + remainder;
}


/*  Determine the outcome of the current roll. */
function determineOutcome() {
  const threshold = Math.max(
    1,
    Math.min(10, integerValue(thresholdInput, 6))
  );

  const difficulty = Math.max(
    0,
    integerValue(difficultyInput, 1)
  );

  /* Count all normal successes. */
  const normalSuccesses = results.filter(
    value => value >= threshold && value !== 10
  ).length;

  /* Count 10s separately because they have special success rules. */
  const tens = results.filter(
    value => value === 10
  ).length;

  /*
   * Each pair of 10s contributes 4 successes.
   * A lone 10 contributes 1 success.
   */
  const tenSuccesses = successesFromTens(tens);

  /* Total successes used to determine whether the test wins. */
  const successCount = normalSuccesses + tenSuccesses;

  /* Count 1s for Bestial/Messy Failure determination. */
  const ones = results.filter(
    value => value === 1
  ).length;

  /*
   * The test succeeds when successes are
   * greater than or equal to the difficulty.
   */
  const won = successCount >= difficulty;

  let type;

  if (won) {
    /*
     * Two or more 10s produce a Critical Win.
     * Exactly one 10 produces a Messy Critical.
     */
    if (tens >= 2) {
      type = "critical";
    } else if (tens === 1) {
      type = "messy-critical";
    } else {
      type = "success";
    }
  } else {
    if (ones >= 2) {
      type = "bestial";
    } else if (ones === 1) {
      type = "messy-failure";
    } else {
      type = "failure";
    }
  }

  return {
    successes: successCount,
    normalSuccesses,
    tenSuccesses,
    difficulty,
    threshold,
    tens,
    ones,
    won,
    type
  };
}


/* Update the current roll display. */
function redrawResults() {
  resultsElement.textContent = `[${results.join(", ")}]`;

  if (results.length === 0) {
    outcomeElement.textContent = "No roll yet";
    return;
  }

  const roll = determineOutcome();

  switch (roll.type) {
    case "critical":
      outcomeElement.textContent =
        `CRITICAL WIN — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;

    case "messy-critical":
      outcomeElement.textContent =
        `MESSY CRITICAL — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;

    case "success":
      outcomeElement.textContent =
        `SUCCESS — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;

    case "bestial":
      outcomeElement.textContent =
        `BESTIAL FAILURE — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;

    case "messy-failure":
      outcomeElement.textContent =
        `MESSY FAILURE — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;

    case "failure":
      outcomeElement.textContent =
        `FAILURE — ${roll.successes} successes vs difficulty ${roll.difficulty}`;
      break;
  }
}


/* Update the cumulative statistics. */
function redrawStats() {
  criticalsElement.textContent = String(stats.criticalWins);
  messyCriticalsElement.textContent = String(stats.messyCriticals);
  successesElement.textContent = String(stats.successes);

  bestialElement.textContent = String(stats.bestialFailures);
  messyFailuresElement.textContent = String(stats.messyFailures);
  failuresElement.textContent = String(stats.failures);
}


/* Add one die to the pool. */
addDie.addEventListener("click", () => {
  diceCount += 1;

  redrawPool();
});


/* Roll the current dice pool. */
rollButton.addEventListener("click", () => {
  if (diceCount === 0) {
    return;
  }

  results = Array.from(
    { length: diceCount },
    () => Math.floor(Math.random() * 10) + 1
  );

  const roll = determineOutcome();

  /* Exactly one statistic is incremented per roll. */
  switch (roll.type) {
    case "critical":
      stats.criticalWins += 1;
      break;

    case "messy-critical":
      stats.messyCriticals += 1;
      break;

    case "success":
      stats.successes += 1;
      break;

    case "bestial":
      stats.bestialFailures += 1;
      break;

    case "messy-failure":
      stats.messyFailures += 1;
      break;

    case "failure":
      stats.failures += 1;
      break;
  }

  redrawResults();
  redrawStats();
});


/* Reset the dice pool, current roll, and cumulative statistics. */
resetButton.addEventListener("click", () => {
  diceCount = 0;
  results = [];

  stats = {
    criticalWins: 0,
    messyCriticals: 0,
    successes: 0,
    bestialFailures: 0,
    messyFailures: 0,
    failures: 0
  };

  redrawPool();
  redrawResults();
  redrawStats();
});


/* Recalculate the displayed outcome when settings change. */
thresholdInput.addEventListener("input", redrawResults);
difficultyInput.addEventListener("input", redrawResults);


/* Initial display. */
redrawPool();
redrawResults();
redrawStats();
