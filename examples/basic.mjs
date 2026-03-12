#!/usr/bin/env node
/**
 * Basic Example - Empty Calendar Heatmap
 *
 * Run with: node examples/basic.mjs
 */

import { renderCalendarHeatmap } from '../dist/calendar-heatmap.js';

const output = renderCalendarHeatmap({
  data: [],
});

console.log('Calendar Heatmap (Last 365 Days):');
console.log('');
console.log(output);
