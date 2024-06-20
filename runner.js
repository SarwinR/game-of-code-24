let memory = {

  "x":4,
  "y":5,
  "z":
  6,
  a: 7,
  b: 8,
  c: 9,
  d: 10,
  e: "abcedgsdgh",
};

function assign(target, source) {
  memory[target] = source;
  console.log(memory);
}

function getMemory() {
  return memory;
}
