import Tesseract from 'tesseract.js';

const performOperation = async (number1, number2, selectedOperation) => {
  let result;
  console.log('aaaaaaa', number1, number2, selectedOperation)

  switch (selectedOperation) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
    default:
      result = 'Invalid Operation';
  }

  return result;
};

const extractNumberFromCanvas = async (canvas, setText) => {
  return new Promise((resolve, reject) => {
    if (canvas) {
      const imgData = canvas.toDataURL();
      Tesseract.recognize(imgData, 'eng', { logger: m => console.log(m) })
        .catch(err => {
          reject(err);
        })
        .then(res => {
          let extractedText = res.data.text;
          let number = parseFloat(extractedText);
          setText(extractedText)
          resolve(number);
        });
    } else {
      reject('Canvas not found');
    }
  });
};

export { performOperation, extractNumberFromCanvas };
