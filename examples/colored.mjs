#!/usr/bin/env node
/**
 * Colored Example using Chalk
 *
 * Run with: node examples/colored.mjs
 */

import chalk from 'chalk';
import { renderCalendarHeatmap } from '../dist/calendar-heatmap.js';

// Generate sample commit data for the past year
function generateCommitData() {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();

    // More commits on weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if (Math.random() > 0.3) {
        const value = Math.floor(Math.random() * 4) + 1;
        const dateStr = d.toISOString().split('T')[0];
        data.push({ date: dateStr, value });
      }
    } else {
      // Fewer commits on weekends
      if (Math.random() > 0.7) {
        const value = Math.floor(Math.random() * 3) + 1;
        const dateStr = d.toISOString().split('T')[0];
        data.push({ date: dateStr, value });
      }
    }
  }

  return data;
}

const commitData = generateCommitData();

const output = renderCalendarHeatmap({
  data: commitData,
});

// Apply colors to the output
const coloredOutput = output
  .split('\n')
  .map(line => {
    // Color the heatmap characters
    return line
      .replace(/█/g, chalk.green('█'))
      .replace(/▓/g, chalk.greenBright('▓'))
      .replace(/▒/g, chalk.hex('#9be9a8')('▒'))
      .replace(/░/g, chalk.hex('#ebedf0')('░'))
      .replace(/·/g, chalk.gray('·'));
  })
  .join('\n');

console.log(chalk.bold('GitHub-Style Contribution Graph:'));
console.log('');
console.log(coloredOutput);
console.log('');
console.log(chalk.dim(`Total contributions: ${commitData.length} days`));
