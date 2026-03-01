//num.sign: 1 или -1
//num.layer: "уровень" (0 = обычные, 1 = экспоненты, 2 = тетрации...)
//num.array: внутреннее представление (массив пар [значение, индекс])

//num.eq(other): равно ли
//num.lt(other): меньше
//num.gt(other): больше
//num.gte(other): ≥
//num.lte(other): ≤

//num.isFinite(): не бесконечность
//num.isNaN()

function calculate() {
  const alphaInput = document.getElementById("level");
  const argumentInput = document.getElementById("number");
  const resultDiv = document.getElementById("output");
  
  const alphaStr = alphaInput.value.trim();
  const nStr = argumentInput.value.trim();
  const number = new ExpantaNum(nStr);
  
  if (number.isNaN()) {
    resultDiv.textContent = "Incorrect input / Very big number";
    resultDiv.style.color = "#ff5555";
    return;
  }
  
  if (alphaStr === "ω^ω") {
    resultDiv.innerHTML = `{${nStr}, ${nStr}(1)2}`;
    resultDiv.style.color = "#88ff88";
    return;
  }
  
  if (alphaStr.includes("^")) {
    const exp = parseInt(alphaStr.split("^")[1]);
    const arr = Array(exp + 1).fill(nStr).join(", ");
    resultDiv.innerHTML = `{${arr}}`;
    resultDiv.style.color = "#88ff88";
    return;
  } else
  if (alphaStr.includes("ω")) {
    if (alphaStr === "ω^2") {
      resultDiv.innerHTML = `{${nStr}, ${nStr}, ${nStr}, ${nStr}}`;
    } else if (alphaStr === "ω") {
      resultDiv.innerHTML = `2{${number.sub(1)}}${nStr}`;
    } else {
      const match = alphaStr.match(/ω\*?(\d+)?\+?(\d+)?/);
      const m = match[1] ? parseInt(match[1]) : 1;
      const k = match[2] ? parseInt(match[2]) : 0;
      if (k > 0) {
        resultDiv.innerHTML = `{${nStr}, ${nStr}, ${k}, ${m+1}}`;
      } else {
        resultDiv.innerHTML = `{${nStr}, ${nStr}, ${nStr}, ${m}}`;
      }
    }
    resultDiv.style.color = "#88ff88";
    return;
  }
  
  const level = new ExpantaNum(alphaStr);
  
  if (level.isNaN()) {
    resultDiv.textContent = "Incorrect input";
    resultDiv.style.color = "#ff5555";
    return;
  }
  
  let output;
  
  if (level.eq(0)) {
    output = number.add(1);
  } else if (level.eq(1)) {
    output = number.mul(2);
  } else if (level.eq(2)) {
    output = number.mul(ExpantaNum.fromNumber(2).pow(number));
  } else if (level.eq(3)) {
    output = ExpantaNum.fromNumber(2).tetr(number);
  } else if (level.eq(4)) {
    output = ExpantaNum.arrow(2, 3, number);
  } else if (level.gt(3) && level.lt(100)) {
    output = ExpantaNum.arrow(2, level.sub(1), number);
  } else if (level.gt(99)) {
    output = `2{${level}}${number}`;
  }
  
  if (!output || (typeof output !== "string" && output.isNaN())) {
    resultDiv.textContent = "Not calculated";
    resultDiv.style.color = "#ffaa00";
  } else {
    let outputHTML = typeof output === "string" ? output : output.toString();
    if (outputHTML.length > 100) outputHTML = outputHTML.substring(0, 100) + "...";
    resultDiv.innerHTML = outputHTML;
    resultDiv.style.color = "#88ff88";
  }
}