import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { omit } from 'lodash';
import inputs from './constants/inputs';
import InputBox from './components/inputBox';
import Simulation from './components/simulation';

export default
class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      v0: 20,
      d0: 7,
      L: 7,
      Ty: 2,
      aa: 1,
      ad: 1,
      simulationOpen: false,
    }
  }

  setFieldValue = ( fieldName, value ) => {
    this.setState({ [fieldName]: value });
  }

  openSimulation = () => {
    this.setState({ simulationOpen: true })
  }

  render() {
    const data = omit(this.state, 'simulationOpen');
    const { simulationOpen } = this.state;
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
        <div className='proceed-btn' onClick={this.openSimulation}>
          <span className="block-button text-bordered" style={{ borderColor: 'rgb(0, 0, 0)' }}>
            <span className="bg"></span>
            <span className="text" style={{ color: 'rgb(0, 0, 0)' }}>Proceed to the simulation</span>
          </span>
        </div>
        {simulationOpen &&
          <Simulation
            data={data}
          />
        }
      </div>
    );
  }
};
