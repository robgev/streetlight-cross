import React, { PureComponent } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
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
		Ty,
	} = this.props;
	const newX1 = x0 + (v0 * t) + ((aa * (t ** 2)) / 2);
	const newX2 = (x0 + (v0 * t)) - ((ad * (t ** 2)) / 2);
	const car2Stopped = newX2 - car2Pos < 0;
	const car1Passed = t >= Ty;
	if (car1Passed && car2Stopped) {
		cancelAnimationFrame(this.request);
	} else {
		const x1 = car1Passed ? car1Pos : newX1;
		const x2 = car2Stopped ? car2Pos : newX2;
		this.setState({ x1, x2, t: t + 0.1 });
		requestAnimationFrame(this.tick);
	}
}

componentWillReceiveProps() {
	this.setState({
		x0: 0,
		x1: 0,
		x2: 0,
		t: 0,
	});
	this.request = requestAnimationFrame(this.tick);
}

render() {
	const { x1, x2, t } = this.state;
	const { d0, L } = this.props;
	const width = window.innerWidth * 0.7;
	const height = window.innerHeight - 400;
	// width = 120m
	// ? = 100m
	const metersToPixels = width / 120;
	const car1Position = x1 * metersToPixels;
	const car2Position = x2 * metersToPixels;
	const crossStart = d0 * metersToPixels;
	const crossEnd = (d0 + L) * metersToPixels;
	return (
		<Stage
			width={width}
			height={height}
			className="simulation-container"
		>
			<Layer>
				<Text
					x={width / 2}
					align="center"
					text={`Elapsed Time: ${t}`}
				/>
				<Car x={car1Position} y={height / 2} />
				<Car x={car2Position} y={(height / 2) + 40} />
				<Rect
					y={40}
					width={1}
					fill="red"
					x={crossStart}
					height={height - 40}
				/>
				<Rect
					y={40}
					width={1}
					fill="green"
					x={crossEnd}
					height={height - 40}
				/>
			</Layer>
		</Stage>
	);
}
}

export default Simulation;
