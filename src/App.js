import { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

import './App.css';
import Canvas from './Components/Canvas';
import OperationSelection from './Components/OperationSelection';
import { performOperation, extractNumberFromCanvas } from './Components/OperationUtils';



function App() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("+");
  const [results, setResults] = useState([]);

  const handleOperationSelect = (operation) => {
    setSelectedOperation(operation);
  };




  const handleClick = async () => {
    const canvas1 = document.getElementById('Canvas1');
    const canvas2 = document.getElementById('Canvas2');

    try {
      const number1 = await extractNumberFromCanvas(canvas1, setText);
      const number2 = await extractNumberFromCanvas(canvas2, setText2);
      console.log('bbbbb', number1, number2, selectedOperation)
      if (selectedOperation && !isNaN(number1) && !isNaN(number2)) {
        const result = await performOperation(number1, number2, selectedOperation);
        console.log(`Result of ${number1} ${selectedOperation} ${number2} is: ${result}`);
        const historyItem = `${number1} ${selectedOperation} ${number2} = ${result}`;
        setResults([historyItem, ...results]);
      } else {
        console.log('Invalid input or operation');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
    <h1 className="title">Draw two numbers and press Calculate to get the answer</h1>
    <main className="App-main">
      <div className="canvas-container">
        <div className="canvas">
          <Canvas id={"Canvas1"} width={200} height={100}  />
          <div className="text-box" style={{ minHeight: "40px" }}>
            <p>{text}</p>
          </div>
        </div>
        <div className="operation-selection-container">
          <OperationSelection handleOperationSelect={handleOperationSelect} />
        </div>
        <div className="canvas">
          <Canvas id={"Canvas2"} width={200} height={100}  />
          <div className="text-box" style={{ minHeight: "40px" }}>
            <p>{text2}</p>
          </div>
        </div>
      </div>
      <button onClick={handleClick} className="calculate-button" style={{ height: 50 }}>
        Calculate
      </button>
      <h3 style={{ marginTop: '40px' }}>Calculation History:</h3>
      <div className="results">
        
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </main>
  </div>
);
}



export default App;

  // const handleClick = async () => {
  //   const canvas = document.getElementById('Canvas1');
  //   const canvas2 = document.getElementById('Canvas2');

  //   let number1, number2, result;

  //   if (canvas) {
  //     const imgData = canvas.toDataURL();
  //     Tesseract.recognize(
  //       imgData,'eng',
  //       { 
  //         logger: m => console.log(m) 
  //       }
  //     )
  //     .catch (err => {
  //       console.error(err);
  //     })
  //     .then(result => {
  //       // Get Confidence score
  //       // console.log('aaaaaaaaaaa')
  //       // console.log(result)
  //       // console.log(result.data.text)
  //       // let confidence = result.data.confidence;
  //       let text = result.data.text;
  //       number1 = parseFloat(text);
  //       setText(text);
  //     });
  //   }
  //   if (canvas2) {
  //     const imgData = canvas2.toDataURL();
  //     console.log(imgData)
  //     Tesseract.recognize(
  //       imgData,'eng',
  //       { 
  //         logger: m => console.log(m) 
  //       }
  //     )
  //     .catch (err => {
  //       console.error(err);
  //     })
  //     .then(result => {
  //       // Get Confidence score
  //       // console.log('aaaaaaaaaaa')
  //       // console.log(result)
  //       // console.log(result.data.text)
  //       // let confidence = result.data.confidence;
  //       let text = result.data.text;
  //       number2 = parseFloat(text);
  //       setText2(text);
  //     });
  //   }
  //   console.log('a', number1, number2 , selectedOperation)
  //   if (number1 && number2 && selectedOperation) {
  //     switch (selectedOperation) {
  //       case '+':
  //         result = number1 + number2;
  //         break;
  //       case '-':
  //         result = number1 - number2;
  //         break;
  //       case '*':
  //         result = number1 * number2;
  //         break;
  //       case '/':
  //         result = number1 / number2;
  //         break;
  //       default:
  //         result = 'Invalid Operation';
  //     }
  //   }
  
  //     console.log(`Result of ${number1} ${selectedOperation} ${number2} is: ${result}`);
  

    // if (canvas) {
    //   const imgData = canvas.toDataURL();
    //   console.log(imgData)
      
    //   const url = 'http://127.0.0.1:5000/api/image_recognition';

    //   const formData = new FormData();
    //   formData.append("image_data", imgData);
    //   // formData.append("base64Image", base64Image);

    //   try {
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       body: formData
    //     });

    //     const data = await response.json();
    //     console.log(data)
    //     console.log('aaa')
    //     // Access the extracted text
    //     const extractedText = data.result.slice(0, 40)
    //     setText(extractedText);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  // }





    // if (api = true){
      // if (canvas) {
      //   const imgData = canvas.toDataURL();
      //   console.log(imgData)
        

      //   const apiKey = 'K85035700888957'; 
      //   const url = 'https://api.ocr.space/parse/image';



      //   const formData = new FormData();
      //   formData.append("apikey", apiKey);
      //   formData.append("isOverlayRequired", true);
      //   formData.append("base64Image", imgData);
      //   // formData.append("base64Image", base64Image);

      //   try {
      //     const response = await fetch(url, {
      //       method: 'POST',
      //       body: formData
      //     });

      //     const data = await response.json();
      //     console.log(data)
      //     console.log('aaa')
      //     // Access the extracted text
      //     if (data.ParsedResults && data.ParsedResults.length > 0) {
      //       const extractedText = data.ParsedResults[0].ParsedText;
      //       setText(extractedText);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

  

  // const handleClick = async () => {
  //   const { createWorker } = require("tesseract.js");
  //   const worker = await createWorker('eng');
    
  //   await worker.setParameters({
  //     tessedit_char_whitelist: '0123456789+-x/',
  //   });

  //   const canvas = document.getElementById('Canvas');
  //   if (canvas) {
  //     const imgData = canvas.toDataURL();
  //     console.log(imgData)
  //     await worker.recognize(imgData).then(async ({ data: { text, confidence } }) => {
  //       console.log('Detected Text:', text);
  //       console.log('Confidence:', confidence);
  //       setText(text);
  //     }).catch((err) => {
  //       console.error('Error during recognition:', err);
  //     });
  //   }

  //   await worker.terminate();
  // };



  //     Tesseract.recognize(
  //       imgData,'eng',
  //       { 
  //         logger: m => console.log(m) 
  //       }
  //     )
  //     .catch (err => {
  //       console.error(err);
  //     })
  //     .then(result => {
  //       // Get Confidence score
  //       console.log('aaaaaaaaaaa')
  //       console.log(result)
  //       console.log(result.data.text)
  //       let confidence = result.data.confidence;
  //       let text = result.data.text;
  //       setText(text);
  //     });
  //   }
  // }




  // import './App.css';
// import Canvas from './Components/Canvas';

// // function App() {
// //   return (
// //     <div className="App">
// //       <Canvas
// //         width={700}
// //         height={500}
// //       />
// //     </div>
// //   );
// // }

// import React, { useRef, useEffect, useState } from 'react';
// import Tesseract from 'tesseract.js';

// const App = () => {
//   const canvasRef = useRef(null);
//   const [text, setText] = useState('');


//   function convertToBlob() {
//     const canvas = canvasRef.current;
//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => {
//         resolve(blob);
//       });
//     });
//   }

//   function recognizeText() {
//     convertToBlob().then((blob) => {
//       Tesseract.recognize(blob, 'eng', {
//         logger: (m) => console.log(m),
//       })
//         .catch((err) => {
//           console.error(err);
//         })
//         .then((result) => {
//           setText(result.text);
//         });
//     });
//   }

//   return (
//     <div>
//       <Canvas
//         width={300}
//         height={300}
//         ref={canvasRef}
//       />
//       <button onClick={recognizeText}>Convert to text</button>
//       <div>
//         <p>Text: {text}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

