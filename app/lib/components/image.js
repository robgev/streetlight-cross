import React, { PureComponent } from 'react';
import { Image } from 'react-konva';
import CarImage from '../../assets/car.png';

class Car extends PureComponent {
	constructor() {
		super();
		this.state = {
			image: null,
		};
	}

	componentDidMount() {
		const image = new window.Image();
		image.src = CarImage;
		image.onload = () => {
			this.setState({ image });
		};
	}

	render() {
		const { x, y } = this.props;
		return (
			<Image
				x={x}
				y={y}
				width={100}
				height={32}
				image={this.state.image}
			/>
		);
	}
}

export default Car;
