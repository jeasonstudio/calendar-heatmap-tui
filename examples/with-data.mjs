#!/usr/bin/env node
/**
 * Example with Sample Data
 *
 * Run with: node examples/with-data.mjs
 */

import { renderCalendarHeatmap } from '../dist/calendar-heatmap.js';

// Generate sample activity data for the past year
function generateActivityData() {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Generate some activity patterns
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const dayOfMonth = d.getDate();
    const month = d.getMonth();

    // Skip some days randomly to simulate realistic activity
    if (Math.random() > 0.6) continue;

    let value = 0;

    // Weekends have higher activity
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      value = Math.floor(Math.random() * 3) + 2; // 2-4
    } else {
      value = Math.floor(Math.random() * 3) + 1; // 1-3
    }

    // Some days are very active
    if (dayOfMonth % 10 === 0) {
      value = 4;
    }

    const dateStr = d.toISOString().split('T')[0];
    data.push({ date: dateStr, value });
  }

  return data;
}

const activityData = generateActivityData();

const output = renderCalendarHeatmap({
  data: activityData,
});

console.log('Activity Calendar (Last 365 Days):');
console.log('');
console.log(output);
console.log('');
console.log('Total active days:', activityData.length);
