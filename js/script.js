const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultBox = document.getElementById("result");

const fields = [
  { input: num1, error: document.getElementById("err1") },
  { input: num2, error: document.getElementById("err2") },
];

function clearErrors() {
  fields.forEach(({ input, error }) => {
    input.classList.remove("invalid");
    error.style.display = "none";
  });
}

function validate(input, error) {
  const ok = input.value.trim() !== "" && !isNaN(input.value);
  input.classList.toggle("invalid", !ok);
  error.style.display = ok ? "none" : "block";
  return ok;
}

function validateFields(indices) {
  return indices.every((i) => validate(fields[i].input, fields[i].error));
}

function compute(op) {
  clearErrors();

  const v1 = parseFloat(num1.value);
  const v2 = parseFloat(num2.value);

  const operations = {
    add: () => v1 + v2,
    sub: () => v1 - v2,
    mul: () => v1 * v2,
    div: () => (v2 === 0 ? "Cannot divide by zero" : (v1 / v2).toFixed(4)),
    sqr: () => v1 ** 2,
    cub: () => v1 ** 3,
  };

  const needsBoth = ["add", "sub", "mul", "div"].includes(op);
  const isValid = needsBoth ? validateFields([0, 1]) : validateFields([0]);

  if (!isValid) return;

  if (!operations[op]) {
    resultBox.textContent = "Invalid operation";
    return;
  }
  resultBox.textContent = parseFloat(operations[op]());
}

document
  .querySelectorAll("button[data-op]")
  .forEach((btn) =>
    btn.addEventListener("click", () => compute(btn.dataset.op))
  );

fields.forEach(({ input, error }) =>
  input.addEventListener("input", () => validate(input, error))
);
