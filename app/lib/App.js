import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import inputs from './constants/inputs';
import InputBox from './components/inputBox';
import Simulation from './components/simulation';

export default
class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      v0: 0,
      d0: 0,
      L: 0,
      Ty: 0,
      aa: 0,
      ad: 0,
    }
  }

  setFieldValue = ( fieldName, value ) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const data = { ...this.state };
    return (
      <div className='container'>
        <ul className='inputs-container'>
          { inputs.map(inputData => (
            <InputBox
              {...inputData}
              key={inputData.name}
              setFieldValue={this.setFieldValue}
            />
          ))}
        </ul>
        <div className='proceed-btn'>
          <span className="block-button text-bordered" style={{ borderColor: 'rgb(0, 0, 0)' }}>
            <span className="bg"></span>
            <span className="text" style={{ color: 'rgb(0, 0, 0)' }}>Proceed to the simulation</span>
          </span>
        </div>
        <Simulation
          data={data}
        />
      </div>
    );
  }
};
