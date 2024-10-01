import { myThemeConfigs } from "../../../theme/antd-theme";
import BarChartComponent from "./bar-chart";
import PropTypes from "prop-types";

const BarChartWithTitle = ({ chartData, chartDataKey, chartYAxisDataKey, chartXAxisDataKey, title }) => {
  return (
    <div
      className=" flex justify-between flex-col  p-3 flex-1 min-w-[300px] rounded-md bg-[#b8e986]"
      style={myThemeConfigs.buttonBorderList}
    >
      <h2 className="capitalize font-roboto-slab">{title}</h2>
      <BarChartComponent
        chartData={chartData}
        chartDataKey={chartDataKey}
        chartYAxisDataKey={chartYAxisDataKey}
        chartXAxisDataKey={chartXAxisDataKey}
      />
    </div>
  );
};

export default BarChartWithTitle;

BarChartWithTitle.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartDataKey: PropTypes.string.isRequired,
  chartYAxisDataKey: PropTypes.string.isRequired,
  chartXAxisDataKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
