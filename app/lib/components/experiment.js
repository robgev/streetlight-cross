import React, { PureComponent } from 'react';
import { omit } from 'lodash';
import Simulation from './simulation';
import Graphs from './graphs';

class Experiment extends PureComponent {
	constructor(props) {
		super(props);
		const { v0 } = props.data;
		this.state = {
			x0: 0,
			x1: 0,
			x2: 0,
			t: 0,
			v1: v0,
			v2: v0,
			graph1Data: [],
			graph2Data: [],
			velocity1Data: [],
			velocity2Data: [],
		};
	}

	animateMove = (positionData) => {
		const {
			x1, x2, t, v1, v2,
		} = positionData;
		const {
			graph1Data: x1Graph,
			graph2Data: x2Graph,
			velocity1Data: v1Graph,
			velocity2Data: v2Graph,
		} = this.state;
		const newGraph1Point = [ { x: t, y: x1 } ];
		const newGraph2Point = [ { x: t, y: x2 } ];
		const newVelocity1Point = [ { x: t, y: v1 } ];
		const newVelocity2Point = [ { x: t, y: v2 } ];
		const graph1Data = [ ...x1Graph, ...newGraph1Point ];
		const graph2Data = [ ...x2Graph, ...newGraph2Point ];
		const velocity1Data = [ ...v1Graph, ...newVelocity1Point ];
		const velocity2Data = [ ...v2Graph, ...newVelocity2Point ];
		this.setState({
			...positionData,
			graph1Data,
			graph2Data,
			velocity1Data,
			velocity2Data,
		});
	}

	resetCoordinateData = () => {
		const { v0 } = this.props.data;
		this.setState({
			x0: 0,
			x1: 0,
			x2: 0,
			t: 0,
			v1: v0,
			v2: v0,
			graph1Data: [],
			graph2Data: [],
			velocity1Data: [],
			velocity2Data: [],
		});
	}

	render() {
		const {
			graph1Data, graph2Data,
			velocity1Data, velocity2Data,
		} = this.state;
		const coordinates = omit(this.state, [ 'graph1Data', 'graph2Data' ]);
		const { data, experimentNumber } = this.props;
		return (
			<div className="body-wrapper">
				<Simulation
					{...data}
					{...coordinates}
					animateMove={this.animateMove}
					experimentNumber={experimentNumber}
					resetCoordinateData={this.resetCoordinateData}
				/>
				<Graphs
					v0={data.v0}
					x1Data={graph1Data}
					x2Data={graph2Data}
					v1Data={velocity1Data}
					v2Data={velocity2Data}
				/>
			</div>
		);
	}
}

export default Experiment;
