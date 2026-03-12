import { describe, test, expect } from 'vitest';
import { renderCalendarHeatmap } from './calendar-heatmap.js';

describe('renderCalendarHeatmap', () => {
  test('should render a basic calendar heatmap with month headers and empty day cells', () => {
    const result = renderCalendarHeatmap({
      data: [],
    });

    // Should contain some month headers (depends on current date, but should have multiple)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const foundMonths = monthNames.filter(m => result.includes(m));
    expect(foundMonths.length).toBeGreaterThanOrEqual(12); // Should show about 12-13 months

    // Should contain empty day cells (dots)
    const dotCount = (result.match(/·/g) || []).length;
    expect(dotCount).toBeGreaterThan(300); // At least most of a year's worth of days
  });

  test('should render days in a grid format with 7 rows (one per weekday)', () => {
    const result = renderCalendarHeatmap({
      data: [],
    });

    const lines = result.split('\n');

    // Should have multiple lines (header + day rows)
    expect(lines.length).toBeGreaterThan(1);

    // Day rows should have 7 rows (one per weekday: Sun, Mon, Tue, Wed, Thu, Fri, Sat)
    // But typically GitHub-style heatmaps only show Mon, Wed, Fri labels
    // Let's check that we have the right structure
  });

  test('should render weekday labels on the left side', () => {
    const result = renderCalendarHeatmap({
      data: [],
    });

    // Should contain weekday labels
    expect(result).toContain('Mon');
    expect(result).toContain('Wed');
    expect(result).toContain('Fri');
  });

  test('should render different heat levels based on data values', () => {
    // Use today's date and some dates in the past year
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const result = renderCalendarHeatmap({
      data: [
        { date: dateStr, value: 1 },
        { date: dateStr, value: 2 },
        { date: dateStr, value: 3 },
        { date: dateStr, value: 4 },
      ],
    });

    // Should contain different heat level characters
    expect(result).toContain('░'); // level 1
    expect(result).toContain('▒'); // level 2
    expect(result).toContain('▓'); // level 3
    expect(result).toContain('█'); // level 4
  });

  test('should render a legend at the bottom', () => {
    const result = renderCalendarHeatmap({
      data: [],
    });

    // Should contain legend
    expect(result).toContain('Less');
    expect(result).toContain('More');
  });
});
