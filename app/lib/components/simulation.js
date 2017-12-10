import React, { PureComponent } from 'react';
import { Stage, Layer } from 'react-konva';
import Car from './image';

class Simulation extends PureComponent {
state = {
	x: 20,
	y: 20,
}

componentDidMount() {
	this.request = requestAnimationFrame(this.tick);
}

componentWillUnmount() {
	cancelAnimationFrame(this.request);
}

tick = () => {
	const { x } = this.state;
	this.setState({ x: x + 0.5 });
	requestAnimationFrame(this.tick);
}

render() {
	const { x, y } = this.state;
	return (
		<Stage className="simulation-container" width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Car x={x} y={y} />
			</Layer>
		</Stage>
	);
}
}

export default Simulation;
