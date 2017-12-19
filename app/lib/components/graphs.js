import React from 'react';
import Chart from './graph';

const Graphs = ({
	d0, L,
	x1Data, x2Data,
	v1Data, v2Data,
}) => (
	<div>
		<Chart
			line1Data={x1Data}
			line2Data={x2Data}
			xLabel="Time (s)"
			yLabel="Distance (m)"
			constantLines={[ d0, d0 + L ]}
		/>
		<Chart
			line1Data={v1Data}
			line2Data={v2Data}
			xLabel="Time (s)"
			yLabel="Velocity (m/s)"
			constantLines={[ ((60 * 1000) / 3600) ]} // 60 km/h is the speed limit
		/>
	</div>
);

export default Graphs;
