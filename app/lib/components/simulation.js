import React, { PureComponent } from 'react';
import { Stage, Layer } from 'react-konva';
import Car from './image';

class Simulation extends PureComponent {
state = {
	x0: 0,
	x1: 0,
	x2: 0,
	t: 0,
}

componentDidMount() {
	this.request = requestAnimationFrame(this.tick);
}

componentWillUnmount() {
	cancelAnimationFrame(this.request);
}

tick = () => {
	const {
		x0, x1: car1Pos, x2: car2Pos, t,
	} = this.state;
	const {
		v0,
		d0,
		L,
		aa,
		ad,
	} = this.props;
	const newX1 = x0 + (v0 * t) + ((aa * (t ** 2)) / 2);
	const newX2 = (x0 + (v0 * t)) - ((ad * (t ** 2)) / 2);
	const car2Stopped = newX2 - car2Pos > 0;
	const car1Passed = newX1 >= x0 + d0 + L;
	console.log(newX2);
	if (car2Stopped && car1Passed) {
		cancelAnimationFrame(this.request);
	} else {
		const x1 = car1Passed ? car1Pos : newX1;
		const x2 = car2Stopped ? car2Pos : newX2;
		this.setState({ x1, x2, t: t + 0.1 });
		requestAnimationFrame(this.tick);
	}
}

render() {
	const { x1, x2 } = this.state;
	const width = window.innerWidth * 0.7;
	const height = window.innerHeight - 400;
	// width = 120m
	// ? = Xm
	const metersToPixels = width / 120;
	const car1Position = x1 * metersToPixels;
	const car2Position = x2 * metersToPixels;
	return (
		<Stage
			width={width}
			height={height}
			className="simulation-container"
		>
			<Layer>
				<Car x={car1Position} y={height / 2} />
				<Car x={car2Position} y={(height / 2) + 40} />
			</Layer>
		</Stage>
	);
}
}

export default Simulation;
