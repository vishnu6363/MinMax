import React, { useState } from 'react';
import axios from 'axios';

const NewEquationModal = ({ isOpen, onClose }) => {
  const [equation, setEquation] = useState('');
  const [equationType, setEquationType] = useState('');
  const [parameters, setParameters] = useState('');
  const [parameterCount, setParameterCount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!equation || !equationType || !parameters || !parameterCount) {
      alert("All fields are required.");
      return;
    }

    // Validate equation
    const equationParts = equation.split('=');
    if (equationParts.length !== 2 || equationParts[1].includes('y')) {
      alert("Equation is not valid. It should be in the format 'y = f(x)' where 'f(x)' represents the function of x.");
      return;
    }

    // Validate parameters
    const parameterArray = parameters.split(',');
    if (!parameterArray.includes('x') || parameterArray.length === 0 || parameterArray.length !== parseInt(parameterCount)) {
      alert("At least one parameter should be 'x', and the number of parameters should match the parameter count.");
      return;
    }

    const formData = {
      "equation": equation,
      "equationType": equationType,
      "parameteres": parameters,
      "parametercount": parseInt(parameterCount) // Ensure parameterCount is converted to a number
    };

    axios.post('http://localhost:5555/equations/', formData)
      .then((response) => {
        alert("Equation created successfully!!");
        onClose(); 
        setEquation('');
        setEquationType('');
        setParameters('');
        setParameterCount('');
      })
      .catch((error) => {
        alert("Error while creating Equation. Please try again!!");
        // Handle error as needed, e.g., show error message to the user
      });
  };

  const handleContentClick = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the modal background
  };

  const handleCancel = () => {
    onClose();  
    setEquation('');
    setEquationType('');
    setParameters('');
    setParameterCount('');
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="box">
          <h2>Create New Equation</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
             
              <div className="control margintop">
                <input className="input modalinput" type="text" value={equation} onChange={(e) => setEquation(e.target.value)} placeholder="Enter equation" />
              </div>
            </div>
            <div className="field">
             
              <div className="control margintop">
                <input className="input modalinput" type="text" value={equationType} onChange={(e) => setEquationType(e.target.value)} placeholder="Enter equation type" />
              </div>
            </div>
            <div className="field">
             
              <div className="control margintop">
                <input className="input modalinput" type="text" value={parameters} onChange={(e) => setParameters(e.target.value)} placeholder="Enter parameters" />
              </div>
            </div>
            <div className="field">
              
              <div className="control margintop">
                <input className="input modalinput" type="number" value={parameterCount} onChange={(e) => setParameterCount(e.target.value)} placeholder="Enter parameter count" />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control ">
                <button className="button is-primary" type="submit">Create</button>
                <button className="button is-light marginleft bccolor" type="button" onClick={handleCancel}>Cancel</button>
              </div>
              <div className="control">
                
              </div>
            </div>
          </form>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default NewEquationModal;
