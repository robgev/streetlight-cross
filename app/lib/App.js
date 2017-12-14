import React, { PureComponent } from 'react';
import { omit } from 'lodash';

import inputs from './constants/inputs';
import InputBox from './components/inputBox';
import Simulation from './components/simulation';
import Button from './components/button';

export default
class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			d0: 7,
			L: 7,
			Ty: 2,
			aa: 1,
			ad: 1,
			simulationCount: 0,
			v0: (20 * 1000) / 3600,
		};
	}

setFieldValue = (fieldKey, value) => {
	const sanitizedValue = parseInt(value, 10);
	const convertedValue = fieldKey === 'v0' ? (sanitizedValue * 1000) / 3600 : sanitizedValue; // convert to m/s
	this.setState({ [fieldKey]: convertedValue });
}

determinePassState = () => {
	const {
		v0, d0, L, Ty, aa, ad,
	} = this.state;
	const accelerateDistance = (v0 * Ty) + ((aa * (Ty ** 2)) / 2);
	const decelerateDistance = (v0 ** 2) / (2 * ad);
	// We assign value 1 to canPass and value 2 to canStop so we have numerical values
	// For each case possible
	const canPass = accelerateDistance >= d0 + L ? 1 : 0;
	const canStop = decelerateDistance <= d0 ? 2 : 0;
	switch (canPass + canStop) {
	case 0:
		return 'The car will crash!';
	case 1:
		return 'The car can pass only';
	case 2:
		return 'The car can stop only';
	case 3:
		return 'The car can either stop or pass';
	default:
		return 'Something went wrong';
	}
}

openSimulation = () => {
	this.setState({ simulationCount: this.state.simulationCount + 1 });
}

render() {
	const data = omit(this.state, 'simulationCount');
	const { simulationCount } = this.state;
	const passText = this.determinePassState();
	return (
		<div className="container">
			<ul className="inputs-container">
				{ inputs.map(inputData => (
					<InputBox
						{...inputData}
						key={inputData.name}
						setFieldValue={this.setFieldValue}
					/>
				))}
			</ul>
			<Button onClick={this.openSimulation} />
			{!!simulationCount &&
			<div>
				<p>{passText}</p>
				<div className="body-wrapper">
					<Simulation {...data} shouldSimulateAgain={simulationCount} />
					{/* <Graphs data={data} /> */}
				</div>
			</div>
			}
		</div>
	);
}
}
