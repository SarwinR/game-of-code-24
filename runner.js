let memory = {};

function assign(target, source) {
  memory[target] = source;
  console.log(memory);
}

function getMemory() {
  return memory;
}
