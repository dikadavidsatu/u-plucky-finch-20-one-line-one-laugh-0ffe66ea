# One Line, One Laugh

[![make.fun · u-plucky-finch-20-one-line-one-laugh-0ffe66ea](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea?utm_source=github&utm_medium=readme&utm_campaign=u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![rank](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/dikadavidsatu/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/rank.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![reward](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/dikadavidsatu/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/reward.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea?utm_source=github&utm_medium=readme&utm_campaign=u-plucky-finch-20-one-line-one-laugh-0ffe66ea)

A one-line joke, delivered by a small TypeScript program. The line it prints:

> My bank called about suspicious activity on my account: someone had tried to save money, and they knew it couldn't have been me.

The setup borrows a call everyone dreads — the bank's fraud department — and the turn reveals that the "suspicious activity" was an attempt to save money, something the bank's own spending profile rules the account holder out of. The program assembles the line from its setup and turn, validates it against the entry gate (a single line, 1–200 characters, no stray whitespace) before printing it, and exits non-zero without printing anything if the line ever failed a check. Output is deterministic: no clock, no randomness, no input. When `MAKEFUN_OUTPUT_DIR` is set, the line is also written there as `entry.txt`.

## Run it

```sh
node main.ts
```
