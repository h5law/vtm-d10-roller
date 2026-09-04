# VtM d10 Roller

VtM d10 Roller.

A simple Firefox extension for rolling d10 dice pools for **Vampire: The
Masquerade**.

A lightweight d10 roller for **Vampire: the Masquerade**. Build pools, set
difficulty and thresholds, roll instantly, and track criticals, messy criticals,
successes, and failures throughout your session.

## Demo

https://github.com/user-attachments/assets/43d60000-5c7d-4fe7-a4f5-9e4bf75358d7

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
- ...

- One 10 on a winning roll is a **Messy Critical**.
- Two or more 10s on a winning roll is a **Critical Win**.
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
```
