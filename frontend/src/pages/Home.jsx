import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../component/sppiner'; // Corrected import path
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Plot from 'react-plotly.js';
import * as mathParser from 'math-expression-evaluator';
import NewEquationModal from '../component/NewEquationModal';






const Home = () => {
  const [equations, setEquations] = useState([]);
  const [selectedEquation, setSelectedEquation] = useState('');
  const [loading, setLoading] = useState(false);
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [minY, setMinY] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [promptText, setPromptText] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://minmax-1.onrender.com/equations/')
      .then((response) => {
        setEquations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching equations:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const handleEquationChange = (event) => {
    setSelectedEquation(event.target.value);
  };

  const generateGraphData = () => {
    if (!selectedEquation) {
      alert("Please select an equation to proceed.");
      return;
    }
  
    const x = [];
    const y = [];
    try {
      const equation = selectedEquation.split('=')[1].trim();
      for (let i = -10; i <= 10; i += 0.1) {
        x.push(i);
        y.push(eval(equation.replace(/x/g, i))); // Example evaluation, replace with proper math library
      }
      setXValues(x);
      setYValues(y);
      setMinY(Math.min(...y));
      setMaxY(Math.max(...y));
      generatePromptText();
    } catch (error) {
        alert("Please check the equation!!");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const generatePromptText = async () => {
    const options = {
      method: 'POST',
      url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '64a51a2c2emshd43500227e80be7p12cbe6jsn89a564e6bca8',
        'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `Explain about the equation "${selectedEquation}" from selectbox`
          }
        ],
        model: 'gpt-4-turbo-preview',
        max_tokens: 200,
        temperature: 0.9
      }
    };
  
    try {
      const response = await axios.request(options);
       
      if (response.data.choices && response.data.choices.length > 0) {
        const generatedText = response.data.choices[0].message.content.trim();
        setPromptText(generatedText);
      } else {
        setPromptText('No prompt generated');
      }
    } catch (error) {
      console.error(error);
      setPromptText('Error generating prompt');
    }
  };
  
  return (
    <div className='p-4'>
      <div className="main-card">
        <div className="row center-text headerstyel">
          <h1>Find Min Max</h1>
        </div>
        <div className="row">
          <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 buutonstye" onClick={openModal}>
              <MdOutlineAddBox className="inline-block mr-2" /> Create New Equation
            </button>
          </div>
          <div className='selectdiv'>
            <select
              id="equationSelect"
              className="w-full p-2 border border-gray-300 rounded-md selectboxstyle"
              value={selectedEquation}
              onChange={handleEquationChange}
            >
              <option value="">Select an equation...</option>
              {equations.map((equation) => (
                <option key={equation.id} value={equation.equation}>
                  {equation.equation}
                </option>
              ))}
            </select>
          </div>
          <div className='selectdiv border'>
            <button onClick={generateGraphData}>Generate Graph</button>
          </div>
        </div>
      </div>
      <div className="row mt-4 newrow selectdiv">
        <div className="col-md-6 selectdiv">
          
          <Plot
            data={[
              {
                type: 'line',
                x: xValues,
                y: yValues,
                name: 'Equation Plot'
            
              }
            ]}
            layout={{
              width: 800,
              height: 400,
              title: 'Equation Plot',
              xaxis: { title: 'X Axis', tickfont: { size: 14, color: 'black' } },
              yaxis: { title: 'Y Axis', tickfont: { size: 14, color: 'black' } },
              plot_bgcolor: 'rgba(240, 240, 240, 0.7)', // Set background color of plot
              paper_bgcolor: 'rgba(240, 240, 240, 0.7)', // Set background color of paper (area outside plot)
              annotations: [
                {
                  x: xValues[yValues.indexOf(minY)],
                  y: minY,
                  xref: 'x',
                  yref: 'y',
                  text: `Min: ${minY}`,
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  bordercolor: 'rgba(0, 0, 0, 0.7)',
                  borderwidth: 2,
                },
                {
                  x: xValues[yValues.indexOf(maxY)],
                  y: maxY,
                  xref: 'x',
                  yref: 'y',
                  text: `Max: ${maxY}`,
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  bordercolor: 'rgba(0, 0, 0, 0.7)',
                  borderwidth: 2,
                }
              ]
            }}
            
          />
        </div>
        {minY !== null && maxY !== null && (
       
       <div className="col-md-6 selectdiv">
         <h2>Minimum and Maximum</h2>
         <p>Minimum Y Value: {minY}</p>
         <p>Maximum Y Value: {maxY}</p>
         <textarea
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        rows={10}  
        cols={50}  
      />
       </div>
   
   )}
      </div>
      <NewEquationModal isOpen={showModal} onClose={closeModal} />
     
    </div>
  );
};

export default Home;
