// SPDX-License-Identifier: MIT
//
// One Line, One Laugh
// -------------------
// Competition: u-plucky-finch-20-one-line-one-laugh-0ffe66ea
//
// What this program does
// ----------------------
// It emits exactly one line: a single self-contained joke. The line goes to
// standard output, and -- when the grader's MAKEFUN_OUTPUT_DIR environment
// variable names a directory -- it is also written there as `entry.txt`,
// holding that one line and nothing else.
//
// Why a program at all, for one fixed line?
// ------------------------------------------
// The competition is a program/v1 harness: the grader runs this file twice
// in a fresh sandbox and gates whatever it produces. So the joke cannot
// just sit in a text file in the repo; the program has to produce it, and
// it has to prove to itself -- before emitting anything -- that the line
// it is about to emit satisfies the gate:
//
//   * it is a single line (no embedded newline),
//   * it is between 1 and 200 characters long,
//   * it is not only whitespace,
//   * it ends cleanly, with no trailing spaces to trim.
//
// If any of those checks fails the program exits non-zero and emits
// nothing, because an invalid entry is never judged and takes no prize.
// A loud failure here is far better than a silent invalid entry.
//
// How the joke itself is built
// ----------------------------
// The joke is assembled from two named parts instead of being one opaque
// string literal:
//
//   * SETUP -- a bank phones its customer about "suspicious activity" on
//              the account. Every reader knows this call: it is the fraud
//              department, and something has gone wrong.
//   * TURN  -- the suspicious activity turns out to be that someone tried
//              to *save* money -- and the bank, knowing the customer's
//              spending profile, is certain it could not have been him.
//
// That structure is deliberate. The setup borrows a real, slightly tense
// moment everyone recognises, so the misdirection has something solid to
// bend: the reader braces for fraud and instead gets a confession about
// the customer's own habits, delivered by the one institution that has
// the receipts. The laugh lands on the last four words -- "couldn't have
// been me" -- because they reframe the whole call: the bank is not
// accusing a stranger, it is ruling the account holder himself out.
//
// The parts are joined exactly as written and the result is checked
// against the gate before it is emitted, so the line a judge reads is
// the line this file assembles, character for character, every run.
// The output is fully deterministic: no clock, no randomness, no input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Gate constants -- the published gate, written out as named values so the
// checks below read as the rules themselves rather than magic numbers.
// ---------------------------------------------------------------------------

/** Maximum characters the gate allows in the entry line (inclusive). */
const MAX_CHARS = 200;

/** Minimum characters the gate allows in the entry line (inclusive). */
const MIN_CHARS = 1;

/** Name of the file written into the output directory, when one is set. */
const OUTPUT_FILENAME = "entry.txt";

/** Name of the environment variable that names the output directory. */
const OUTPUT_DIR_ENV = "MAKEFUN_OUTPUT_DIR";

// ---------------------------------------------------------------------------
// The joke, in two parts.
// ---------------------------------------------------------------------------

/** Setup: the bank calls about suspicious activity on the account. */
const SETUP =
  "My bank called about suspicious activity on my account:";

/** Turn: the "suspicious" act was saving money -- not his style at all. */
const TURN =
  "someone had tried to save money, and they knew it couldn't have been me.";

/**
 * Join the setup and the turn into the single entry line.
 *
 * The parts are joined by exactly one space, so the finished line reads
 * as one continuous sentence and its length is easy to reason about:
 * it is the length of the two parts plus one.
 */
function buildLine(): string {
  return `${SETUP} ${TURN}`;
}

// ---------------------------------------------------------------------------
// Gate validation.
// ---------------------------------------------------------------------------

/**
 * Count the characters in a candidate line the way the gate counts
 * them: one per Unicode code point, so an accented letter or an emoji
 * counts once, never as the two UTF-16 code units `String.length`
 * would report for characters outside the basic multilingual plane.
 * This line is plain ASCII, where the two counts agree, but the gate
 * check should be right by construction rather than by luck.
 */
function countCharacters(line: string): number {
  return [...line].length;
}

/**
 * Check a candidate line against every rule of the gate.
 *
 * Returns a list of problems found; an empty list means the line is a
 * valid entry. Every rule is checked even after one fails, so a broken
 * line reports everything wrong with it at once.
 */
function validateLine(line: string): string[] {
  const problems: string[] = [];
  const charCount = countCharacters(line);

  if (charCount < MIN_CHARS) {
    problems.push(`line is ${charCount} characters, below the minimum of ${MIN_CHARS}`);
  }
  if (charCount > MAX_CHARS) {
    problems.push(`line is ${charCount} characters, above the maximum of ${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    problems.push("line is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("line contains a newline; the entry must be a single line");
  }
  if (line !== line.trim()) {
    problems.push("line has leading or trailing whitespace");
  }

  return problems;
}

// ---------------------------------------------------------------------------
// Emission.
// ---------------------------------------------------------------------------

/**
 * Write the line to the output directory named by MAKEFUN_OUTPUT_DIR,
 * when that variable is set. The grader hands the entry an empty,
 * writable output directory; locally the variable is usually unset and
 * this step is skipped, leaving standard output as the only emission.
 */
function writeEntryFile(line: string): void {
  const outputDir = process.env[OUTPUT_DIR_ENV];
  if (outputDir === undefined || outputDir === "") {
    return;
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, OUTPUT_FILENAME), `${line}\n`, "utf8");
}

/**
 * Program entry point: build the line, gate-check it, then emit it.
 * Exits non-zero without emitting anything when the line is invalid.
 */
function main(): void {
  const line = buildLine();
  const problems = validateLine(line);

  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`gate check failed: ${problem}`);
    }
    process.exit(1);
  }

  writeEntryFile(line);
  console.log(line);
}

main();
