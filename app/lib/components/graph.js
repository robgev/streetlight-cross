import React from 'react';
import {
	VictoryLine,
	VictoryChart,
	VictoryLabel,
	VictoryTheme,
	VictoryZoomContainer,
} from 'victory';

const Chart = ({
	constantLines,
	yLabel, xLabel,
	line1Data, line2Data,
}) => (
	<VictoryChart
		width={600}
		height={275}
		style={{
			parent: { height: '50%' },
		}}
		theme={VictoryTheme.material}
		containerComponent={
			<VictoryZoomContainer
				zoomDomain={{ x: [ 0, 20 ], y: [ 0, 120 ] }}
			/>
		}
	>
		<VictoryLabel
			x={25}
			y={55}
			dx={-55}
			dy={-20}
			angle={-90}
			text={yLabel}
		/>
		<VictoryLabel
			x={550}
			y={275}
			dx={-55}
			dy={-10}
			text={xLabel}
		/>
		<VictoryLine
			data={line1Data}
		/>
		<VictoryLine
			data={line2Data}
		/>
		{constantLines.map(lineY => (
			<VictoryLine
				key={lineY}
				data={[
					{ x: 0, y: lineY },
					{ x: 20, y: lineY },
				]}
			/>
		))
		}
	</VictoryChart>
);

export default Chart;
