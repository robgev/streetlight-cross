import React, { PureComponent } from 'react';

export default
class InputBox extends PureComponent {
	constructor() {
		super();
		this.state = {
			incorrect: false,
		};
	}

handleInputChange = (e) => {
	const {
		min,
		max,
		fieldKey,
		setFieldValue,
	} = this.props;
	const { value } = e.target;
	if (!value) {
		this.setState({ incorrect: false });
	} else if (value >= min && value <= max) {
		this.setState({ incorrect: false });
		setFieldValue(fieldKey, value);
	} else {
		this.setState({ incorrect: true });
	}
}

render() {
	const { min, max, name } = this.props;
	const { incorrect } = this.state;
	return (
		<li className="input-wrapper">
			<input
				min={min}
				max={max}
				type="number"
				placeholder={`${name} (Default: ${min})`}
				onChange={this.handleInputChange}
			/>
			<p className={incorrect ? 'show' : ''}>
The inputted value is out of range. Input something between { min } and { max }.
			</p>
		</li>
	);
}
}
