# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Calendar Heatmap TUI - A terminal-based calendar heatmap component inspired by GitHub's contribution graph. Displays a rolling 13-month view ending at the current month, using Unicode block characters to represent activity levels.

## Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npx tsc

# Run tests (TDD workflow)
npm test

# Run tests in watch mode
npm run test:watch

# Run a single test file
npx vitest run src/calendar-heatmap.test.ts

# Run a specific test
npx vitest run -t "should render different heat levels"
```

## Examples

See `examples/` directory for runnable examples:

```bash
# Basic empty calendar
node examples/basic.mjs

# Calendar with sample data
node examples/with-data.mjs

# Random generated data
node examples/random-data.mjs

# Colored output with chalk
node examples/colored.mjs
```

## Architecture

### Core API

```typescript
import { renderCalendarHeatmap } from './calendar-heatmap.js';

const output = renderCalendarHeatmap({
  data: [
    { date: '2024-01-15', value: 1 },  // ░
    { date: '2024-01-16', value: 2 },  // ▒
    { date: '2024-01-17', value: 3 },  // ▓
    { date: '2024-01-18', value: 4 },  // █
  ],
});
console.log(output);
```

**Note**: The API uses dynamic date range - it automatically displays a rolling 13-month view ending at the current month. No `year` parameter needed.

### Key Components

- **renderCalendarHeatmap()** - Main entry point, returns formatted string
- **generateWeeksRolling()** - Creates 52-column week grid, last column ends at today
- **generateFixedMonthLabels()** - Returns fixed 13-month labels: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"
- **getHeatChar()** - Maps value (0-4) to Unicode character (·, ░, ▒, ▓, █)

### Heat Level Mapping

| Value | Character | Visual |
|-------|-----------|--------|
| 0 | · | Empty |
| 1 | ░ | Light |
| 2 | ▒ | Medium |
| 3 | ▓ | Heavy |
| 4 | █ | Full |

### Output Format

GitHub-style contribution graph:
- 7 rows (one per weekday: Sun-Sat)
- **52 columns** (fixed week count)
- **Fixed month labels**: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"
- Month header row has 4-space prefix
- Data rows have 4-space prefix (empty) or 4-char weekday labels (Mon, Wed, Fri)
- Legend at bottom

**Note**: The last column ends at today (e.g., if today is Thursday, Fri/Sat are blank).

### Month Label Alignment

The month labels use a fixed format for consistent display:
- Month header row: 4-space prefix + fixed month labels
- Data rows: 4-space prefix (empty rows) or 4-char weekday labels (Mon/Wed/Fri)
- Fixed 13-month labels: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"

## TDD Workflow

This project follows strict TDD:
1. Write failing test first
2. Run `npm test` to verify it fails
3. Write minimal code to pass
4. Run `npm test` to verify it passes
5. Refactor if needed

Never write production code without a failing test first.

## File Structure

```
src/
├── calendar-heatmap.ts       # Main implementation
└── calendar-heatmap.test.ts  # Vitest tests
```

## Date Format

Input dates use ISO 8601 format: `YYYY-MM-DD`

## Date Range

The calendar automatically calculates the display range:
- **Total columns**: Fixed 52 weeks (364 days)
- **End date**: Today (current date)
- **Start date**: 51 weeks and (today's weekday + 1) days before today
- **Result**: 52-column view where the last column ends at today

For example, if today is Thursday, March 12, 2026:
- Column 52 (last column) shows Sun Mar 8 to Thu Mar 12 (today)
- Columns 1-51 show complete 7-day weeks
- Total span: March 16, 2025 to March 12, 2026

## TypeScript Configuration

- Target: ES2022
- Module: NodeNext
- Strict mode enabled
- Output: `dist/` directory

## Implementation Notes

### Key Design Decisions

1. **Fixed 52-column layout**: The calendar displays exactly 52 weeks (columns), with the last column ending at today. This provides a consistent, predictable width.

2. **Date range calculation**: The date range is calculated to ensure column 52 contains today:
   ```typescript
   const lastWeekSunday = new Date(today);
   lastWeekSunday.setDate(today.getDate() - today.getDay());
   const firstWeekSunday = new Date(lastWeekSunday);
   firstWeekSunday.setDate(lastWeekSunday.getDate() - 51 * 7);
   const startDate = new Date(firstWeekSunday);
   startDate.setDate(firstWeekSunday.getDate() + 1);
   ```

3. **Fixed month labels**: Instead of dynamically positioning month names based on the date range, the calendar uses fixed labels: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar". This provides consistent visual reference across all renders.

4. **Partial last column**: The last column only shows days up to today (e.g., if today is Thursday, Fri/Sat are blank), giving a clear visual indication of the current date.

### API Evolution

The API was simplified from:
```typescript
renderCalendarHeatmap({ year: 2024, data: [] })
```

To:
```typescript
renderCalendarHeatmap({ data: [] })
```

The `year` parameter was removed because the component now automatically calculates the date range based on the current date.

## Change Log

### 2026-03-12: Fixed 52-Column Layout

**Requirements**:
- Fixed 52 columns (instead of dynamic ~53)
- Last column ends at today (partial week if today is not Saturday)
- First 51 columns are complete 7-day weeks
- Fixed month labels: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"

**Implementation**:
- Modified date range calculation to ensure column 52 contains today
- Added `generateFixedMonthLabels()` function for consistent month headers
- Removed dynamic month label positioning (`generateMonthLabelsRolling()`)
- Updated week generation to always produce exactly 52 columns

**Result**:
```
    Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar
     ···················································
Mon ····················································
    ····················································
Wed ····················································
    ····················································
Fri ···················································
    ···················································

    Less · ░ ▒ ▓ █ More
```
(Last column ends at Thursday if today is Thursday)
