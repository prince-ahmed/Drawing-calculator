import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTimes, FaDivide } from 'react-icons/fa';
import ScrollWheelHandler from 'react-scroll-wheel-handler';
import '../App.css';

const operations = [
  { sign: '+', icon: <FaPlus /> },
  { sign: '-', icon: <FaMinus /> },
  { sign: '*', icon: <FaTimes /> },
  { sign: '/', icon: <FaDivide /> }
];

const OperationSelection = ({ handleOperationSelect }) => {
  const [selected, setSelected] = useState(0);

  const selectItem = (index) => {
    setSelected(index);
    handleOperationSelect(operations[index].sign);
  };

  const handleWheel = (direction) => {
    if (direction === 'up') {
      selectItem((selected + 1) % operations.length);
    } else if (direction === 'down') {
      selectItem((selected - 1 + operations.length) % operations.length);
    }
  };

  return (
    <div className="scrollable-container">
      <ScrollWheelHandler upHandler={() => handleWheel('up')} downHandler={() => handleWheel('down')}>
        <div className="operation-container">
          {operations.map((operation, index) => (
            <div
              key={index}
              className={`operation ${selected === index ? 'selected' : ''}`}
              onClick={() => selectItem(index)}
            >
              {operation.icon}
            </div>
          ))}
        </div>
      </ScrollWheelHandler>
    </div>
  );
};

export default OperationSelection;
