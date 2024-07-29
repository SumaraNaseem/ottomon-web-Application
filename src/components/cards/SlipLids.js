import React, { useState } from 'react';

const SlipLids = ({ defaultText, buttonTexts, buttonStyles, onButtonClick }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [displayText, setDisplayText] = useState(defaultText);

  const handleSlipLidsBtnClick = (buttonIndex, text) => {
    setActiveButton(buttonIndex);
    setDisplayText(text);

    // Log true for "Yes" and false for "No"
    if (text === "Yes") {
      console.log(true);
    } else if (text === "No") {
      console.log(false);
    }

    if (onButtonClick) {
      onButtonClick(text); // Call the onButtonClick function here
    } else {
      console.error("onButtonClick is not defined or not a function");
    }
  };

  // Ensure buttonStyles has the same length as buttonTexts or provide default styles
  const styles = buttonStyles ? buttonStyles : Array(buttonTexts.length).fill({});
  
  return (
    <div>
      <div className="min-h-[30vh] flex flex-col justify-center rounded-2xl items-center gap-5 bg-[#f1feff]">
        <div className="border-black border-[2px] text-[#222222] font-semibold w-[85%] p-2 cursor-pointer rounded-2xl text-center">
          {displayText}
        </div>

        <div className="flex flex-wrap gap-[1%]  text-[0.8rem] w-[100%] justify-center text-center">
          {buttonTexts.map((text, index) => (
            <div
              key={index}
              className={`border-black border-[2px] my-2 w-[42%] p-2 cursor-pointer rounded-2xl text-center ${activeButton === index ? 'bg-black text-white' : ''}`}
              onClick={() => handleSlipLidsBtnClick(index, text)}
              style={styles[index]} // Use styles array instead of buttonStyles directly
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4'></div>
    </div>
  );
};

export default SlipLids;

// Usage
{/* <SlipLids
  defaultText="No. Items"
  buttonTexts={[
    "Base Only +£55",
    "Mattress Only +£55",
    "Base + Mattress +£75",
    "Base + Mattress + Headboard +£75",
    // Add more button texts as needed
  ]}
  buttonStyles={buttonStyles}
  onButtonClick={handleRemovalServiceClick}
/> */}
