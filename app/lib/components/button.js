import React from 'react';

const Button = ({ onClick }) => (
	<div role="button" tabIndex="0" className="proceed-btn" onClick={onClick}>
		<span className="block-button text-bordered" style={{ borderColor: 'rgb(0, 0, 0)' }}>
			<span className="bg" />
			<span className="text" style={{ color: 'rgb(0, 0, 0)' }}>Proceed to the simulation</span>
		</span>
	</div>
);

export default Button;
