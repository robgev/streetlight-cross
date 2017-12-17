import React, { PureComponent } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Car from './image';

class Simulation extends PureComponent {
	componentDidMount() {
		this.request = requestAnimationFrame(this.tick);
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.request);
	}

tick = () => {
	const {
		v0, d0, L,
		aa, ad, x0,
		animateMove,
		x1: car1Pos, x2: car2Pos, t,
	} = this.props;
	const newX1 = x0 + (v0 * t) + ((aa * (t ** 2)) / 2);
	const newX2 = (x0 + (v0 * t)) - ((ad * (t ** 2)) / 2);
	const v1 = v0 + (aa * t);
	const v2 = v0 - (ad * t);
	const car2Stopped = newX2 - car2Pos < 0;
	const car1Passed = newX1 >= x0 + d0 + L;
	if (car1Passed && car2Stopped) {
		cancelAnimationFrame(this.request);
	} else {
		const x1 = car1Passed ? car1Pos : newX1;
		const x2 = car2Stopped ? car2Pos : newX2;
		animateMove({
			x1, x2, v1, v2, t: t + 0.1,
		});
		requestAnimationFrame(this.tick);
	}
}

componentWillReceiveProps(newProps) {
	if (newProps.experimentNumber !== this.props.experimentNumber) {
		this.props.resetCoordinateData();
		this.request = requestAnimationFrame(this.tick);
	}
}

render() {
	const {
		d0, L, Ty, x1, x2, t,
	} = this.props;
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
				<Text
					x={width / 2}
					y={20}
					align="center"
					text={`Yellow right will turn to red in: ${Ty - t > 0 ? Math.floor(Ty - t) : 0}`}
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
