import PropTypes from "prop-types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const BarChartComponent = ({ chartData, chartDataKey, chartYAxisDataKey, chartXAxisDataKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <BarChart data={chartData}>
        <Tooltip cursor={{ fill: "#fafff0", radius: 4 }} />
        <Bar dataKey={chartDataKey} fill="#58942e" radius={[10, 10, 0, 0]} />
        <XAxis
          allowDataOverflow
          fontSize={12}
          dataKey={chartXAxisDataKey}
          height={40}
          angle={-15}
          tickMargin={10}
          interval={"equidistantPreserveStart"}
        />
        <YAxis dataKey={chartYAxisDataKey} fontSize={12} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

BarChartComponent.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartDataKey: PropTypes.string.isRequired,
  chartYAxisDataKey: PropTypes.string.isRequired,
  chartXAxisDataKey: PropTypes.string.isRequired,
};
