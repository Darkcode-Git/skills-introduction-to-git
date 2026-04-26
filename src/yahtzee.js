// Yahtzee Classic - Monte Carlo Simulation with 2 Players
// Uses uniform probability distribution (Math.random) to simulate fair 6-sided dice

// ---------------------------------------------------------------------------
// Scoring categories
// ---------------------------------------------------------------------------
const CATEGORIES = [
  // Upper section
  { id: "ones",          name: "Ones",                section: "upper" },
  { id: "twos",          name: "Twos",                section: "upper" },
  { id: "threes",        name: "Threes",              section: "upper" },
  { id: "fours",         name: "Fours",               section: "upper" },
  { id: "fives",         name: "Fives",               section: "upper" },
  { id: "sixes",         name: "Sixes",               section: "upper" },
  // Lower section
  { id: "threeOfAKind",  name: "Three of a Kind",     section: "lower" },
  { id: "fourOfAKind",   name: "Four of a Kind",      section: "lower" },
  { id: "fullHouse",     name: "Full House",          section: "lower", fixed: 25  },
  { id: "smallStraight", name: "Small Straight",      section: "lower", fixed: 30  },
  { id: "largeStraight", name: "Large Straight",      section: "lower", fixed: 40  },
  { id: "yahtzee",       name: "YAHTZEE!",            section: "lower", fixed: 50  },
  { id: "chance",        name: "Chance",              section: "lower" },
];

const UPPER_BONUS_THRESHOLD = 63;
const UPPER_BONUS_VALUE     = 35;
const NUM_DICE              = 5;
const MAX_ROLLS_PER_TURN    = 3;

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------
let dice       = Array(NUM_DICE).fill(0);
let kept       = Array(NUM_DICE).fill(false);
let rollsLeft  = MAX_ROLLS_PER_TURN;
let hasRolled  = false;
let currentPlayer = 0;   // 0 = Player 1, 1 = Player 2
let scores     = [{}, {}];
let gameOver   = false;

// ---------------------------------------------------------------------------
// Monte Carlo: roll dice with uniform distribution
// ---------------------------------------------------------------------------
function rollDie() {
  // Uniform discrete distribution over {1,2,3,4,5,6}
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  if (rollsLeft <= 0 || gameOver) return;

  for (let i = 0; i < NUM_DICE; i++) {
    if (!kept[i]) {
      dice[i] = rollDie();
    }
  }
  rollsLeft--;
  hasRolled = true;

  updateDiceDisplay();
  updateRollButton();
  updateScoreOptions();
}

// ---------------------------------------------------------------------------
// Keep / release a die
// ---------------------------------------------------------------------------
function toggleKeep(index) {
  if (!hasRolled || rollsLeft === 0) return;
  kept[index] = !kept[index];
  updateDiceDisplay();
}

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------
function calculateScore(categoryId, diceValues) {
  const counts = Array(7).fill(0);
  diceValues.forEach((d) => counts[d]++);
  const sum = diceValues.reduce((a, b) => a + b, 0);

  switch (categoryId) {
    case "ones":          return counts[1] * 1;
    case "twos":          return counts[2] * 2;
    case "threes":        return counts[3] * 3;
    case "fours":         return counts[4] * 4;
    case "fives":         return counts[5] * 5;
    case "sixes":         return counts[6] * 6;

    case "threeOfAKind":  return counts.some((c) => c >= 3) ? sum : 0;
    case "fourOfAKind":   return counts.some((c) => c >= 4) ? sum : 0;

    case "fullHouse":
      return counts.some((c) => c === 3) && counts.some((c) => c === 2) ? 25 : 0;

    case "smallStraight": {
      const unique = [...new Set(diceValues)].sort((a, b) => a - b);
      const sequences = [[1,2,3,4],[2,3,4,5],[3,4,5,6]];
      return sequences.some((seq) => seq.every((v) => unique.includes(v))) ? 30 : 0;
    }

    case "largeStraight": {
      const sorted = [...new Set(diceValues)].sort((a, b) => a - b);
      return (
        JSON.stringify(sorted) === JSON.stringify([1,2,3,4,5]) ||
        JSON.stringify(sorted) === JSON.stringify([2,3,4,5,6])
      ) ? 40 : 0;
    }

    case "yahtzee":       return counts.some((c) => c === 5) ? 50 : 0;
    case "chance":        return sum;

    default: return 0;
  }
}

// Upper-section subtotal (before bonus)
function upperSubtotal(playerIndex) {
  return CATEGORIES
    .filter((c) => c.section === "upper")
    .reduce((total, c) => total + (scores[playerIndex][c.id] || 0), 0);
}

// Grand total including upper bonus
function grandTotal(playerIndex) {
  const upper  = upperSubtotal(playerIndex);
  const bonus  = upper >= UPPER_BONUS_THRESHOLD ? UPPER_BONUS_VALUE : 0;
  const lower  = CATEGORIES
    .filter((c) => c.section === "lower")
    .reduce((total, c) => total + (scores[playerIndex][c.id] || 0), 0);
  return upper + bonus + lower;
}

// ---------------------------------------------------------------------------
// Select a category for scoring
// ---------------------------------------------------------------------------
function selectCategory(categoryId) {
  if (!hasRolled || gameOver) return;
  if (scores[currentPlayer][categoryId] !== undefined) return;

  scores[currentPlayer][categoryId] = calculateScore(categoryId, dice);

  updateScoreCard();
  nextTurn();
}

// ---------------------------------------------------------------------------
// Turn management
// ---------------------------------------------------------------------------
function nextTurn() {
  const totalCategories = CATEGORIES.length;
  const filled = [
    Object.keys(scores[0]).length,
    Object.keys(scores[1]).length,
  ];

  // Game ends when all categories are filled for both players
  if (filled[0] === totalCategories && filled[1] === totalCategories) {
    endGame();
    return;
  }

  // Alternate between players; skip a player whose scorecard is full
  let next = 1 - currentPlayer;
  if (Object.keys(scores[next]).length === totalCategories) {
    next = currentPlayer; // other player already full, stay on this one
  }
  currentPlayer = next;

  // Reset for new turn
  dice      = Array(NUM_DICE).fill(0);
  kept      = Array(NUM_DICE).fill(false);
  rollsLeft = MAX_ROLLS_PER_TURN;
  hasRolled = false;

  updateDiceDisplay();
  updateRollButton();
  updateCurrentPlayer();
  updateScoreCard();
  updateScoreOptions();
}

// ---------------------------------------------------------------------------
// End-game
// ---------------------------------------------------------------------------
function endGame() {
  gameOver = true;

  const total0 = grandTotal(0);
  const total1 = grandTotal(1);

  let winner;
  if (total0 > total1)       winner = "🏆 Player 1 wins!";
  else if (total1 > total0)  winner = "🏆 Player 2 wins!";
  else                       winner = "🤝 It's a tie!";

  document.getElementById("finalScore0").textContent = total0;
  document.getElementById("finalScore1").textContent = total1;
  document.getElementById("winnerMessage").textContent = winner;
  document.getElementById("gameOverOverlay").classList.add("show");

  updateScoreCard();
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------
function updateDiceDisplay() {
  for (let i = 0; i < NUM_DICE; i++) {
    const dieEl = document.getElementById(`die-${i}`);
    dieEl.textContent = dice[i] === 0 ? "?" : dieFace(dice[i]);
    dieEl.classList.toggle("kept",    kept[i]);
    dieEl.classList.toggle("unrolled", dice[i] === 0);
    dieEl.classList.toggle("rolled",   dice[i] !== 0 && !kept[i]);
  }
}

// Unicode die faces for visual clarity
function dieFace(n) {
  return ["⚀","⚁","⚂","⚃","⚄","⚅"][n - 1];
}

function updateRollButton() {
  const btn = document.getElementById("rollBtn");
  btn.disabled = rollsLeft <= 0 || gameOver;
  document.getElementById("rollsLeft").textContent = rollsLeft;
}

function updateCurrentPlayer() {
  document.getElementById("currentPlayer").textContent =
    `Player ${currentPlayer + 1}'s Turn`;
}

function updateScoreOptions() {
  CATEGORIES.forEach((cat) => {
    const optEl = document.getElementById(`opt-${cat.id}`);
    if (!optEl) return;

    const alreadyUsed = scores[currentPlayer][cat.id] !== undefined;
    if (alreadyUsed) {
      optEl.textContent = "—";
      optEl.classList.add("used");
      optEl.onclick = null;
    } else if (hasRolled) {
      const potential = calculateScore(cat.id, dice);
      optEl.textContent = potential;
      optEl.classList.remove("used");
      optEl.classList.add("available");
      optEl.onclick = () => selectCategory(cat.id);
    } else {
      optEl.textContent = "—";
      optEl.classList.remove("available");
      optEl.onclick = null;
    }
  });
}

function updateScoreCard() {
  for (let p = 0; p < 2; p++) {
    CATEGORIES.forEach((cat) => {
      const cellEl = document.getElementById(`score-p${p}-${cat.id}`);
      if (!cellEl) return;
      const val = scores[p][cat.id];
      cellEl.textContent = val !== undefined ? val : "";
    });

    // Upper subtotal & bonus
    const sub = upperSubtotal(p);
    const bonusEl = document.getElementById(`score-p${p}-upperBonus`);
    if (bonusEl) bonusEl.textContent = sub >= UPPER_BONUS_THRESHOLD ? UPPER_BONUS_VALUE : `${sub}/${UPPER_BONUS_THRESHOLD}`;

    // Grand total
    const totalEl = document.getElementById(`score-p${p}-total`);
    if (totalEl) totalEl.textContent = grandTotal(p);
  }
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
window.addEventListener("load", () => {
  updateDiceDisplay();
  updateRollButton();
  updateCurrentPlayer();
  updateScoreCard();
  updateScoreOptions();

  document.getElementById("rollBtn").addEventListener("click", rollDice);

  for (let i = 0; i < NUM_DICE; i++) {
    document.getElementById(`die-${i}`).addEventListener("click", () => toggleKeep(i));
  }
});
