import React from 'react';
import Chart from './graph';

const Graphs = ({
	x1Data, x2Data,
	v1Data, v2Data,
}) => (
	<div>
		<Chart
			line1Data={x1Data}
			line2Data={x2Data}
			xLabel="Time (s)"
			yLabel="Distance (m)"
		/>
		<Chart
			line1Data={v1Data}
			line2Data={v2Data}
			xLabel="Time (s)"
			yLabel="Velocity (m/s)"
		/>
	</div>
);

export default Graphs;
