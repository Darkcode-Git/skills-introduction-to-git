# Introduction to Git

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey Darkcode-Git!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/Darkcode-Git/skills-introduction-to-git/issues/2)

---

## 🎲 Yahtzee Clásico – Actividad Montecarlo (M1)

This repository also contains a fully playable **2-player classic Yahtzee** game implemented as a browser application, built as part of a Monte Carlo methods exercise.

### Introduction

Yahtzee is a dice game where each player, on their turn, rolls five standard 6-sided dice up to three times, choosing which dice to keep between rolls. After the final roll the player assigns their dice result to one of 13 scoring categories. The player with the highest total score at the end of the game wins.

The simulation applies the **Monte Carlo method** using a **uniform discrete probability distribution** (each face of a fair die has probability 1/6) implemented via JavaScript's `Math.random()`.

### Files

| File | Description |
|------|-------------|
| `src/yahtzee.html` | Main HTML page – game structure and scorecard |
| `src/yahtzee.js`   | Game logic: dice rolling (Monte Carlo), scoring, turn management |
| `src/yahtzee.css`  | Visual styling |

### How to Play

1. Open `src/yahtzee.html` in any modern web browser (no server needed).
2. **Player 1** starts. Click **🎲 Roll** to roll all five dice.
3. Click individual dice to **keep** them (highlighted in gold); click again to unkeep.
4. Roll again (up to 3 rolls total per turn).
5. Click a **score category** on the left panel to record your score for that turn.
6. Play passes to **Player 2**, who repeats the process.
7. After all 13 categories are filled for both players, the game ends and the winner is announced.

### Scoring Categories

**Upper Section** (sum of the specified face value)

| Category | Score |
|----------|-------|
| Ones     | Sum of all 1s |
| Twos     | Sum of all 2s |
| Threes   | Sum of all 3s |
| Fours    | Sum of all 4s |
| Fives    | Sum of all 5s |
| Sixes    | Sum of all 6s |
| **Upper Bonus** | **+35 if upper subtotal ≥ 63** |

**Lower Section**

| Category | Score |
|----------|-------|
| Three of a Kind | Sum of all dice (if ≥3 alike) |
| Four of a Kind  | Sum of all dice (if ≥4 alike) |
| Full House      | 25 pts (3 of one + 2 of another) |
| Small Straight  | 30 pts (4 sequential values) |
| Large Straight  | 40 pts (5 sequential values) |
| YAHTZEE!        | 50 pts (all 5 dice the same) |
| Chance          | Sum of all dice (no requirement) |

### Methodology

The dice rolls are simulated using the expression:

```js
Math.floor(Math.random() * 6) + 1   // uniform over {1, 2, 3, 4, 5, 6}
```

This replicates the behaviour of a fair physical die: each outcome has equal probability **P(X = k) = 1/6** for k ∈ {1,…,6}. Because each roll is independent and identically distributed, the simulation correctly models the stochastic nature of the real game (Monte Carlo approach).

### Conclusions

- The uniform distribution is the natural model for a fair die; the Monte Carlo approach lets us simulate thousands of virtual rolls without physical dice.
- Keeping dice strategically between rolls significantly increases the probability of hitting high-value categories (e.g. Yahtzee, Large Straight).
- Expected upper-section subtotal per player ≈ 3.5 × 6 × (number of turns in upper section), providing a theoretical benchmark for the 63-point bonus threshold.

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

