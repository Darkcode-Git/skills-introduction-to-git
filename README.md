# Introduction to Git

_Use Git version control to work on a game using command line (CLI) and VS Code._

## Welcome

- **Who is this for**: Beginner developers who want to learn Git version control
- **What you'll learn**: Fundamental Git concepts including commits, branches, history, and collaboration basics
- **What you'll build**: You'll create a Git repository, add a sample code, then develop some simple features.
- **Prerequisites**:

  - No prior Git or version control experience required.
  - Recommended: Basic familiarity with Command Line Interfaces (CLI)
  - Recommended: Basic familiarity with Visual Studio Code.

- **How long**: This exercise takes less than 60 minutes to complete.

In this exercise, you will:

1. Understand what version control is and why developers use it.
1. Configure your Git identity.
1. Create your first repository and make commits.
1. View project history and compare file changes.
1. Work with branches to experiment safely.
1. Learn about Git collaboration concepts.

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=skills&template_name=introduction-to-git&owner=%40me&name=skills-introduction-to-git&description=Exercise:+Introduction+to+Git&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.

- We recommend creating a public repository, since private repositories will use Actions minutes.

If the exercise isn't ready in 20 seconds, please check the [Actions](../../actions) tab.

- Check to see if a job is running. Sometimes it simply takes a bit longer.

- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>

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
