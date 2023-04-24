import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [concatOutput, setConcatOutput] = useState([])
  const [currIndex, setCurrIndex] = useState(0)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setConcatOutput(output.text.split("***"))
    setIsGenerating(false);
  }

  const handleNextClick = () => {
    if(currIndex < (2 * concatOutput.length) - 1){
      setCurrIndex(currIndex + 1)
    }
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
      <div className="root">
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>AI Study Tool</h1>
            </div>
            <div className="header-subtitle">
              <h2>Paste your class notes, and I will quiz you on the material you provide</h2>
            </div>
          </div>
          <div className="prompt-container">
        <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
        />
            <div className="prompt-buttons">
              <a
                  className={isGenerating ? 'generate-button loading' : 'generate-button'}
                  onClick={callGenerateEndpoint}
              >
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {/* New code I added here */}
            {apiOutput && (
                <div className="output">
                  <div className="output-header-container">
                    <div className="output-header">
                      <h3>Output</h3>
                    </div>
                  </div>
                  <div className="output-content">
                    <p>{concatOutput[currIndex]}</p>
                    <button className = "next-button" onClick={() => handleNextClick()}>Next</button>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};


export default Home;