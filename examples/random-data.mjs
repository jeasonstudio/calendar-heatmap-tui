#!/usr/bin/env node
/**
 * Example with Random Data
 *
 * Run with: node examples/random-data.mjs
 */

import { renderCalendarHeatmap } from '../dist/calendar-heatmap.js';

function generateRandomData(density = 0.3) {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    // Only add data for some days based on density
    if (Math.random() < density) {
      const value = Math.floor(Math.random() * 4) + 1; // 1-4
      const dateStr = d.toISOString().split('T')[0];
      data.push({ date: dateStr, value });
    }
  }

  return data;
}

const randomData = generateRandomData(0.4); // 40% density

const output = renderCalendarHeatmap({
  data: randomData,
});

console.log('Random Activity Data (Last 365 Days):');
console.log(`Generated ${randomData.length} active days`);
console.log('');
console.log(output);
