# Calendar Heatmap TUI

A terminal-based calendar heatmap component inspired by GitHub's contribution graph. Displays a fixed 52-week view ending at the current date, using Unicode block characters to represent activity levels.

## Features

- **Fixed 52-Column Layout**: Consistent width with exactly 52 weeks displayed
- **Dynamic Date Range**: Automatically calculates range ending at today
- **Partial Last Column**: Last week ends at today (e.g., Thursday if today is Thursday)
- **Fixed Month Labels**: Consistent "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar" header
- **Unicode Visualization**: Five activity levels using Unicode block characters
- **Zero Dependencies**: Lightweight implementation with no runtime dependencies
- **TypeScript Support**: Fully typed with TypeScript definitions

## Installation

```bash
npm install calendar-heatmap-tui
```

## Quick Start

```typescript
import { renderCalendarHeatmap } from 'calendar-heatmap-tui';

const data = [
  { date: '2026-03-01', value: 1 },
  { date: '2026-03-05', value: 3 },
  { date: '2026-03-10', value: 4 },
];

const output = renderCalendarHeatmap({ data });
console.log(output);
```

**Output:**
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

## API Reference

### `renderCalendarHeatmap(options)`

Renders a calendar heatmap as a formatted string.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `Object` | Configuration options |
| `options.data` | `Array<{date: string, value: number}>` | Activity data points |

#### Data Format

Each data point should have:
- `date`: ISO 8601 date string (`YYYY-MM-DD`)
- `value`: Activity level (0-4), where:
  - `0` = Empty (·)
  - `1` = Light (░)
  - `2` = Medium (▒)
  - `3` = Heavy (▓)
  - `4` = Full (█)

#### Returns

`string` - Formatted calendar heatmap with month labels, day rows, and legend.

#### Example

```typescript
import { renderCalendarHeatmap } from 'calendar-heatmap-tui';

const output = renderCalendarHeatmap({
  data: [
    { date: '2026-01-15', value: 2 },
    { date: '2026-01-16', value: 3 },
    { date: '2026-01-17', value: 4 },
  ],
});

console.log(output);
```

## Output Format

The calendar displays:

- **7 rows**: One per weekday (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
- **52 columns**: Fixed week count
- **Month header**: Fixed labels "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"
- **Weekday labels**: Mon, Wed, Fri shown on left side
- **Legend**: Activity level indicator at bottom

### Date Range Calculation

The calendar automatically calculates the display range:
- **End date**: Today (current date)
- **Start date**: 51 weeks before the Sunday of current week, plus 1 day
- **Result**: 52-column view where column 52 ends at today

For example, if today is Thursday, March 12, 2026:
- Column 52 shows Sun Mar 8 → Thu Mar 12 (today)
- Columns 1-51 show complete 7-day weeks
- Total span: March 16, 2025 to March 12, 2026

## Examples

### Basic Usage

```bash
node examples/basic.mjs
```

### With Sample Data

```bash
node examples/with-data.mjs
```

### Random Generated Data

```bash
node examples/random-data.mjs
```

### Colored Output (with Chalk)

```bash
node examples/colored.mjs
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/jeasonstudio/calendar-heatmap-tui.git
cd calendar-heatmap-tui

# Install dependencies
npm install

# Build TypeScript
npx tsc

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Project Structure

```
├── src/
│   ├── calendar-heatmap.ts       # Main implementation
│   └── calendar-heatmap.test.ts  # Vitest tests
├── examples/
│   ├── basic.mjs                 # Empty calendar example
│   ├── with-data.mjs             # Sample data example
│   ├── random-data.mjs           # Random data example
│   └── colored.mjs               # Colored output with chalk
├── dist/                         # Compiled JavaScript
├── CLAUDE.md                     # Development documentation
└── README.md                     # This file
```

### Testing

This project follows Test-Driven Development (TDD):

```bash
# Run all tests
npm test

# Run specific test file
npx vitest run src/calendar-heatmap.test.ts

# Run specific test
npx vitest run -t "should render different heat levels"
```

## Heat Level Mapping

| Value | Character | Visual | Description |
|-------|-----------|--------|-------------|
| 0 | `·` | Empty | No activity |
| 1 | `░` | Light | Low activity |
| 2 | `▒` | Medium | Moderate activity |
| 3 | `▓` | Heavy | High activity |
| 4 | `█` | Full | Maximum activity |

## TypeScript

The package includes TypeScript definitions:

```typescript
import { renderCalendarHeatmap, CalendarHeatmapOptions } from 'calendar-heatmap-tui';

const options: CalendarHeatmapOptions = {
  data: [
    { date: '2026-03-12', value: 3 },
  ],
};

const output: string = renderCalendarHeatmap(options);
```

## Browser Compatibility

This package is designed for Node.js terminal output. For browser usage, you may need to:

1. Use a monospace font for proper alignment
2. Ensure Unicode block characters are supported
3. Handle line height for consistent row spacing

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TDD: Write tests before implementation
- Maintain 100% test coverage for new features
- Update documentation for API changes
- Follow existing code style and formatting

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### 2026-03-12

- **Breaking**: Changed to fixed 52-column layout
- **Breaking**: Last column now ends at today (partial week)
- **Breaking**: Month labels are now fixed: "Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar"
- Added `generateFixedMonthLabels()` function
- Removed dynamic month label positioning
- Updated documentation with new behavior

## Acknowledgments

- Inspired by GitHub's contribution graph
- Unicode block characters for terminal visualization
- Built with TypeScript and Vitest

## Related Projects

- [github-contributions-canvas](https://github.com/sallar/github-contributions-canvas) - GitHub-style contribution graphs for the web
- [cal-heatmap](https://github.com/wa0x6e/cal-heatmap) - JavaScript date heatmap visualization

---

Made with ❤️ by [Jeason](https://github.com/jeasonstudio)
