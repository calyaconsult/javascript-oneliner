/* Der Code lässt sich zum Beispiel auf https://playcode.io/javascript ausführen */
/* Code Variante 1: X-preview */
const fF0 = (a,b) => `ChatGPT 0: ${a < 10 ? '0' : ''}${a}-${b < 10 ? '0' : ''}${b}`;
const fF1 = (a,b) => `ChatGPT 1: ${`${a}`.padStart(2, '0')}-${`${b}`.padStart(2, '0')}`;
const fF2 = (a,b) => `ChatGPT 2: ${a}`.padStart(2, '0') + '-' + `${b}`.padStart(2, '0');
const fF3 = (a,b) => `ChatGPT 3: ${a < 10 ? '0' : ''}${a}-${b < 10 && b >= 0 ? '0' : ''}${b}`;
const fF4 = (a,b) => `Gemma:   ${a < 10 ? '0' : ''}${a}-${b < 0 ? '0' : ''}${b}`;

const dateFormatters = [fF0, fF1, fF2, fF3, fF4]; // More descriptive name

function formatDate(month, day, dateFormatter) {
  // Enhanced validation with more informative error messages
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be integer between 1-12.`);
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error(`Invalid day: ${day}. Must be integer between 1-31.`);
  }

  return dateFormatter(month, day);
}

// Test cases with meaningful names
const testCases = [
  { month: 1,  day: 6 },   // Single-digit month and day
  { month: 1,  day: 16 },  // Single-digit month, double-digit day
  { month: 10, day: 6 },   // Double-digit month, single-digit day
  { month: 10, day: 16 }  // Double-digit month and day
];

// Execute tests with proper error handling
testCases.forEach(({ month, day }) => {
  console.log("------");
  console.log(`Testing: Month ${month}, Day ${day} (${month<10} ${day<10})`);
  /*console.log(`Formatting requirements: ${
    month < 10 ? 'Pad month' : 'No padding'
  } | ${
    day < 10 ? 'Pad day' : 'No padding'
  }\n`);*/

  dateFormatters.forEach((formatter, index) => {
    try {
      const result = formatDate(month, day, formatter);
      console.log(`${result}`);
    } catch (error) {
      console.error(`Formatter ${index + 1} Error: ${error.message}`);
    }
  });
});

/* Code Variante 2: o3-mini */
const fF0 = (a,b) => `ChatGPT 0: ${a < 10 ? '0' : ''}${a}-${b < 10 ? '0' : ''}${b}`;
const fF1 = (a,b) => `ChatGPT 1: ${`${a}`.padStart(2, '0')}-${`${b}`.padStart(2, '0')}`;
const fF2 = (a,b) => `ChatGPT 2: ${a}`.padStart(2, '0') + '-' + `${b}`.padStart(2, '0');
const fF3 = (a,b) => `ChatGPT 3: ${a < 10 ? '0' : ''}${a}-${b < 10 && b >= 0 ? '0' : ''}${b}`;
const fF4 = (a,b) => `Gemma:   ${a < 10 ? '0' : ''}${a}-${b < 0 ? '0' : ''}${b}`;

const functions = [fF0, fF1, fF2, fF3, fF4];

/**
 * Formats a date using the provided formatting function after validating the inputs.
 *
 * @param {number} m - The month (must be a natural number).
 * @param {number} d - The day (must be a natural number).
 * @param {Function} formatter - The function to format the date, defined elsewhere.
 * @returns {*} The formatted date as returned by the formatter.
 * @throws {Error} If the month or day are not valid natural numbers.
 */
function formatDate(m, d, formatter) {
  if (!Number.isInteger(m) || m < 1) {
    throw new Error("Month must be a natural number.");
  }
  if (!Number.isInteger(d) || d < 1) {
    throw new Error("Day must be a natural number.");
  }
  return formatter(m, d);
}

// Define the months and days to iterate over.
const months = [1, 10];
const days = [6, 16];

months.forEach(month => {
  days.forEach(day => {
    console.log(`Debug: month < 10: ${month < 10} | day < 10: ${day < 10}`);
    functions.forEach(formatter => {
      try {
        const result = formatDate(month, day, formatter);
        console.log(result);
      } catch (error) {
        console.error(`Error formatting date ${month}/${day} with formatter ${formatter.name}: ${error.message}`);
      }
    });
  });
});
