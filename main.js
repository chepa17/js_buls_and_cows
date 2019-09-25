let number = document.getElementById('number').value;
let round = 0;
let memoryGuess = ["Guess"];
let memoryResult = ["Result"];
let memoryRound = [""];
const okButton = document.getElementById('ok');
const ngButton = document.getElementById('start');
const roundDiv = document.getElementById('round');
const guessDiv = document.getElementById('guess');
const resultDiv = document.getElementById('result');
const winMassage = document.getElementById('win');

generatorIA = () => {
  const n1 = Math.floor(Math.random() * 9) + 1;
  let n2 = Math.floor(Math.random() * 9);// змінні n генерують цифри числа
  if (n2 >= n1) {n2++};
  let n3 = Math.floor(Math.random() * 8);
  let k1 = Math.max(n1, n2);//змінні k технічні і потрібні для перескоку нашого генератору через вже викоричтані цифри
  let k2 = Math.min(n1, n2);
  if (n3 >= k2 && n3 < (k1 - 1)) {n3++} else { 
    if (n3 >= (k1 - 1)) {n3 = n3 + 2}
  }
  let n4 = Math.floor(Math.random() * 7);
  k1 = Math.min(n1, n2, n3);
  let k3 = Math.max(n1, n2, n3);
  k2 = n1 + n2 + n3 - k1 - k3;
  if (n4 >= k1 && n4 < (k2 - 1)) {n4++} else {
    if (n4 >= (k2 - 1) && n4 < (k3 - 2) && n4 >= k1) {n4 = n4 + 2}
    else {
      if (n4 >= (k3 - 2) && n4 >=(k2 - 1) && n4 >= k1) {n4 = n4 + 3};
    }
  }
  return n1 * 1000 + n2 * 100 + n3 * 10 + n4;
};

isLegal = (list) => {
  return ((list.sort().filter((e, i, a) => (a[i] !== a[i-1])).length === list.length) && (+list.join('') > 1000));
}

printResult = (list) => {
  let res = "";
  for (let i = 0; i < list.length; i++) {
    res = res + list[i] + "<br>";
  }
  return res.slice(0, res.length - 4);
};

okButton.onclick = () => {
  number = document.getElementById('number').value;
  let numberList = [
    Math.floor(number / 1000),
    Math.floor((number % 1000) / 100),
    Math.floor((number % 100) / 10),
    number % 10
  ];
  if (!isLegal(numberList)) {
    okButton.innerHTML = "Invalid number"
  } else {
  round++;
  const numberIA = generatorIA();
  memoryGuess.push(numberIA);
  let bull = 0;
  let cow = 0;
  
  let numberIAList = [
    Math.floor(numberIA / 1000),
    Math.floor((numberIA % 1000) / 100),
    Math.floor((numberIA % 100) / 10),
    numberIA % 10
  ];
  for (i = 0; i < 4; i++) {
    if (numberList[i] === numberIAList [i]) {
      bull++;
    }
    if (numberIAList.includes(numberList[i])) {
      cow++;
    } 
  }
  cow = cow - bull;
  let result = bull + 'A' + cow + 'B';
  memoryResult.push(result);
  memoryRound.push(round);
  if (bull === 4 || number == 9876) {
    winMassage.innerHTML = "You WIN!!!"
  }
  roundDiv.innerHTML = printResult(memoryRound);
  guessDiv.innerHTML = printResult(memoryGuess);
  resultDiv.innerHTML = printResult(memoryResult);
  okButton.innerHTML = "OK"
  }
};

ngButton.onclick = () => {
  round = 0;
  memoryGuess = ["Guess"];
  memoryResult = ["Result"];
  memoryRound = [""];
  roundDiv.innerHTML = printResult(memoryRound);
  guessDiv.innerHTML = printResult(memoryGuess);
  resultDiv.innerHTML = printResult(memoryResult);
  winMassage.innerHTML = "";
  console.log(memoryGuess);
}

