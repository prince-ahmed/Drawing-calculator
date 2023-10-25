import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

import './App.css';
import Canvas from './Components/Canvas';


function App() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const handleClick = async () => {
    const canvas = document.getElementById('Canvas1');
    const canvas2 = document.getElementById('Canvas2');
    if (canvas) {
      const imgData = canvas.toDataURL();
      Tesseract.recognize(
        imgData,'eng',
        { 
          logger: m => console.log(m) 
        }
      )
      .catch (err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        console.log('aaaaaaaaaaa')
        console.log(result)
        console.log(result.data.text)
        let confidence = result.data.confidence;
        let text = result.data.text;
        setText(text);
      });
    }
    if (canvas2) {
      const imgData = canvas2.toDataURL();
      console.log(imgData)
      Tesseract.recognize(
        imgData,'eng',
        { 
          logger: m => console.log(m) 
        }
      )
      .catch (err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        console.log('aaaaaaaaaaa')
        console.log(result)
        console.log(result.data.text)
        let confidence = result.data.confidence;
        let text = result.data.text;
        setText2(text);
      });
    }

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
  }

  return (
    <div className="App">
  <main className="App-main">
    <div className="canvas-container">
      <div>
        <h3>Draw a number on the canvas</h3>
        <Canvas id={"Canvas1"} width={200} height={100} />
        <h3>Extracted text</h3>
        <div className="text-box">
          <p>{text}</p>
        </div>
      </div>
      <div>
        <h3>Draw another number on the canvas</h3>
        <Canvas id={"Canvas2"} width={200} height={100} />
        <h3>Extracted text</h3>
        <div className="text-box">
          <p>{text2}</p>
        </div>
      </div>
    </div>
    <button onClick={handleClick} style={{ height: 50 }}>Convert to text</button>
  </main>
</div>

  );
}

export default App;




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

