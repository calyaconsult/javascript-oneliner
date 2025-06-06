
#### Prompt: derive a Javascript one-liner from this decision table:
```
   |   m<10  |  d<0  |  return
   |    1    |   1   |  `0${m}`-`0${d}`
   |    1    |   0   |  `0${m}`-`${d}`
   |    0    |   1   |  `${m}`-`0${d}`
   |    0    |   0   |  `${m}`-`${d}`
```

#### ChatGPT
```
const formattingFunction = (a,b) => `${a < 10 ? '0' : ''}${a}-${b < 10 ? '0' : ''}${b}`;
function formatDate(m, d, f) {
  if (!Number.isInteger(m) || m < 1) throw new Error("Month must be a natural number.");
  if (!Number.isInteger(d) || d < 1) throw new Error("Day must be a natural number.");
  return f(m,d);
}

// Test cases
const tests = [
  { m: 3, d: 4 },    // expected: "03-04"
  { m: 3, d: 10 },   // expected: "03-10"
  { m: 10, d: 4 },   // expected: "10-04"
  { m: 12, d: 11 },  // expected: "12-11"
  { m: 5, d: -3 },   // expected: "05--3"
  { m: 11, d: -1 },  // expected: "11--1"
];

tests.forEach(({ m, d}) => {
  try {
    console.log(`m=${m}, d=${d} => ${formatDate(m, d, formattingFunction)}`);
  } catch (err) {
    console.log(`m=${m}, d=${d} => Error: ${err.message}`);
  }
});
```
