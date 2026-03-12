# Calendar Heatmap Examples

This directory contains example usage of the calendar-heatmap-tui library.

## Prerequisites

Make sure you've built the project first:

```bash
npm install
npx tsc
```

## Examples

### 1. Basic Example

Displays an empty calendar heatmap for the last 365 days:

```bash
node examples/basic.mjs
```

### 2. With Data Example

Shows a calendar with sample activity data throughout the past year:

```bash
node examples/with-data.mjs
```

### 3. Random Data Example

Generates random activity data with configurable density:

```bash
node examples/random-data.mjs
```

### 4. Colored Example

Uses chalk to add GitHub-style green colors to the heatmap:

```bash
node examples/colored.mjs
```

## Creating Your Own

To create your own example:

1. Create a new `.mjs` file in this directory
2. Import the library: `import { renderCalendarHeatmap } from '../dist/calendar-heatmap.js'`
3. Prepare your data in the format: `{ date: 'YYYY-MM-DD', value: 1-4 }`
4. Call `renderCalendarHeatmap({ data })`
5. Display the result with `console.log()`

Note: The calendar displays a rolling 13-month view ending at the current month.

## Data Format

```javascript
const data = [
  { date: '2024-01-15', value: 1 },  // Light activity (░)
  { date: '2024-01-16', value: 2 },  // Medium activity (▒)
  { date: '2024-01-17', value: 3 },  // Heavy activity (▓)
  { date: '2024-01-18', value: 4 },  // Full activity (█)
];
```

Values:
- 0 or missing: Empty (·)
- 1: Light (░)
- 2: Medium (▒)
- 3: Heavy (▓)
- 4: Full (█)
