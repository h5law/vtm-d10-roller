# VtM d10 Dice Roller

A simple Firefox extension for rolling d10 dice pools for **Vampire: The
Masquerade**.

## Features

- Add dice to your pool with a single click.
- Configure the **Success Threshold** and **Difficulty**.
- Automatically calculate successes.
- Supports critical and messy critical results.
- Supports bestial and messy failures.
- Tracks cumulative roll statistics for the current session.
- Reset the pool and statistics at any time.
- Runs entirely locally with no tracking or data collection.

## VTM Rules

- A die is a success when it meets or exceeds the Success Threshold.
- A roll succeeds when successes are greater than or equal to the Difficulty.
- Every pair of 10s counts as **4 successes**.
- A single 10 counts as **1 success**.
- Therefore:
- 1 ten = 1 success
- 2 tens = 4 successes
- 3 tens = 5 successes
- 4 tens = 8 successes
- One 10 on a winning roll is a **Messy Critical**.
- Two or more 10s on a winning roll are a **Critical Win**.
- One 1 on a failed roll is a **Messy Failure**.
- Two or more 1s on a failed roll are a **Bestial Failure**.

## Installation

The extension can be installed from Firefox's Add-ons manager once signed by
Mozilla.

For development, load it temporarily through:

`about:debugging` → **This Firefox** → **Load Temporary Add-on**

## Files

```text
├── dice.png
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
└── LICENSE
