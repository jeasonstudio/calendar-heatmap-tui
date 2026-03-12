export interface CalendarHeatmapOptions {
  year: number;
  data: Array<{ date: string; value: number }>;
}

export function renderCalendarHeatmap(options: CalendarHeatmapOptions): string {
  const { data } = options;

  // Fixed 52 columns: last column ends at today, first 51 columns are full weeks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // End at today (not Sunday)
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 1); // Exclusive end date

  // Calculate start date so that week 51 (the 52nd week) contains today
  // Week 51 starts on: today - today.getDay() (the Sunday of this week)
  // Week 0 starts on: (today - today.getDay()) - 51 * 7
  // Start date should be within week 0
  const lastWeekSunday = new Date(today);
  lastWeekSunday.setDate(today.getDate() - today.getDay());
  const firstWeekSunday = new Date(lastWeekSunday);
  firstWeekSunday.setDate(lastWeekSunday.getDate() - 51 * 7);
  const startDate = new Date(firstWeekSunday);
  // Start from the day after the first Sunday (Monday) to ensure exactly 52 weeks
  startDate.setDate(firstWeekSunday.getDate() + 1);

  // Build a map of date -> value from the data
  const dataMap = new Map<string, number>();
  for (const item of data) {
    dataMap.set(item.date, item.value);
  }

  // Generate the calendar grid for rolling view
  const weeks = generateWeeksRolling(startDate, endDate, dataMap);
  const monthLabels = generateFixedMonthLabels();

  // Build output
  const lines: string[] = [];

  // Month header row - align with data columns
  // Data rows have 4 char prefix, add one more space for visual alignment
  lines.push('    ' + monthLabels);

  // Day rows (7 rows, one per weekday: Sun, Mon, Tue, Wed, Thu, Fri, Sat)
  for (let row = 0; row < 7; row++) {
    let line = '';

    // Add weekday label for Mon, Wed, Fri
    if (row === 1) line += 'Mon ';
    else if (row === 3) line += 'Wed ';
    else if (row === 5) line += 'Fri ';
    else line += '    ';

    // Add day cells for this row across all weeks
    for (let week = 0; week < weeks.length; week++) {
      const day = weeks[week][row];
      if (day === null) {
        line += ' ';
      } else {
        line += getHeatChar(day.value);
      }
    }

    lines.push(line);
  }

  // Add legend
  lines.push('');
  lines.push('    Less · ░ ▒ ▓ █ More');

  return lines.join('\n');
}

interface DayCell {
  date: Date;
  value: number;
}

function generateWeeksRolling(startDate: Date, endDate: Date, dataMap: Map<string, number>): (DayCell | null)[][] {
  const weeks: (DayCell | null)[][] = [];

  // Find the first Sunday on or before startDate
  const firstSunday = new Date(startDate);
  firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

  // Generate exactly 52 weeks
  for (let week = 0; week < 52; week++) {
    const weekDays: (DayCell | null)[] = [];

    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(firstSunday);
      currentDate.setDate(firstSunday.getDate() + week * 7 + day);

      // Check if this date is within our range
      if (currentDate >= startDate && currentDate < endDate) {
        const dateStr = formatDate(currentDate);
        const value = dataMap.get(dateStr) || 0;
        weekDays.push({ date: currentDate, value });
      } else {
        weekDays.push(null);
      }
    }

    weeks.push(weekDays);
  }

  return weeks;
}

function generateFixedMonthLabels(): string {
  // Fixed 13 month labels for 52 columns (4 columns per month)
  // Position each month label at the start of its 4-column block
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const result: string[] = [];

  for (let i = 0; i < months.length; i++) {
    // Add the month name
    result.push(months[i]);
    // Add a single space after each month name (except the last one)
    if (i < months.length - 1) {
      result.push(' ');
    }
  }

  return result.join('');
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getHeatChar(value: number): string {
  // Value 0 = empty, 1-4 = different heat levels
  const chars = ['·', '░', '▒', '▓', '█'];
  return chars[Math.min(value, 4)];
}
