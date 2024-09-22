import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate and parse JSON input
      const parsedInput = JSON.parse(jsonInput); 
      
      // Ensure the expected structure exists
      if (!parsedInput.data) {
        throw new Error("JSON must contain a 'data' property.");
      }

      const res = await axios.post('http://localhost:5000/bfhl', {
        data: parsedInput.data,
      });

      setResponseData(res.data);
    } catch (error) {
      // Specific error messages for easier debugging
      if (error instanceof SyntaxError) {
        alert('Invalid JSON format. Please check your input.');
      } else {
        alert(error.message || 'An error occurred while processing your request.');
      }
      console.error(error);
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setDropdownOptions(options);
  };

  return (
    <div className="App">
      <h1>REST API Data Input</h1>
      <textarea 
        value={jsonInput} 
        onChange={handleInputChange} 
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>
      <br />

      {responseData && (
        <>
          <select multiple onChange={handleDropdownChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div className="response-output">
            {dropdownOptions.includes('alphabets') && (
              <p>Alphabets: {responseData.alphabets.join(', ')}</p>
            )}
            {dropdownOptions.includes('numbers') && (
              <p>Numbers: {responseData.numbers.join(', ')}</p>
            )}
            {dropdownOptions.includes('highest_lowercase_alphabet') && (
              <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
