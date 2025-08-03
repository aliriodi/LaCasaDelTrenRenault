/*
Chocolate Bar Distribution Problem Statement:
 You are managing a gift-boxing operation
 where each gift box can hold exactly one chocolate bar. 
 You have a collection of N chocolate bars, 
 each with a specific size, and a collection of M 
 gift boxes, each with a maximum size capacity.
 Your task is to pack as many bars as possible into 
 the boxes such that each bar’s size is less than 
 or equal to the capacity of the box it is placed into.
 Each box holds at most one bar and each bar can 
 be placed in at most one box. Input Description:
 - The first line contains two space-separated
  integers M and N, where M is the number of boxes 
  and N is the number of bars. 
 - The second line contains M space-separated integers,
  representing the capacities of the boxes.
 - The third line contains N space-separated integers,
  representing the sizes of the chocolate bars.
 Output Description: 
 - A single integer indicating the maximum number of
 chocolate bars that can be packed into the boxes
 under the given constraints. 
 Constraints: - 1 ≤ M, 
                N ≤ 100,000 - 1 ≤ box capacity, 
                bar size ≤ 10^9 Edge Cases to Consider: 
                - No boxes or no bars (M = 0 or N = 0) 
                - All bars are larger than every box 
                - All bars fit into every box Performance Expectations: 
                - Your solution should run in O((M + N) log(M + N)) 
                time or better and use O(M + N) extra space.
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputLines = [];
console.log('Input:' )
  
rl.on('line', (line) => {
    
  inputLines.push(line.trim());
  // Esperamos 3 líneas: M N, capacidades, tamaños
  if (inputLines.length === 3) {
    rl.close();
  }
});

rl.on('close', () => {
  const [M, N] = inputLines[0].split(' ').map(Number);

  if (M === 0 || N === 0) {
    console.log(0);
    return ;
  }

  const boxCapacities = inputLines[1].split(' ').map(Number).sort((a, b) => a - b);
  const barSizes = inputLines[2].split(' ').map(Number).sort((a, b) => a - b);

  let i = 0; // boxes
  let j = 0; // bars
  let count = 0;

  while (i < M && j < N) {
    if (barSizes[j] <= boxCapacities[i]) {
      count++;
      j++;
      i++;
    } else {
      i++; // box too small, try next one
    }
  }
  //console.log(inputLines)
  //console.log(boxCapacities);
  //console.log(barSizes);
  console.log('Output: ',count);
});
