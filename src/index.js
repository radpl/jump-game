import './style.css';
console.log("test 3");

const arr = [1, 2, 3, 4, NaN];
if (arr.indexOf(3) >= 0) {
  console.log("true 1");
}

if (arr.includes(3)) {
  console.log("includes true")
}