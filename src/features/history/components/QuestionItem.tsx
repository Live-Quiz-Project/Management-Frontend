import { Flex } from "antd";
import React, { useState } from "react";
import Chart from "react-google-charts";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";

interface QuestionItemProps {
  title: string;
  data: CityPopulation[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({ title, data }) => {
  const [chartType, setChartType] = useState<"BarChart" | "PieChart">(
    "BarChart"
  );
  const chartData = [
    ["", "", { role: "style" }],
    ["Bangsean", 8175000, "#FFAAAA"],
    ["Chiangmai", 3792000, "#FFCA7A"],
    ["Bankok", 2695000, "#C7DAB0"],
    ["Pattaya", 2328000, "#C8DAF5"],
    ["Ayutthaya", 1568000, "#DDD1E1"],
  ];

  const chartOptions = {
    chartArea: { width: "50%" },
    backgroundColor: "#FFFADD",
  };

  const buildChartTypesButton = () => {
    return (
      <div className="flex p-0.5 rounded-sm bg-pastel-orange">
        <button
          className={`rounded-sm px-2 ${
            chartType === "BarChart" ? "bg-white" : null
          } mr-1`}
          onClick={() => setChartType("BarChart")}
        >
          <BarChartIcon style={{ fontSize: 18 }} />
        </button>
        <button
          className={`rounded-sm px-2 ${
            chartType === "PieChart" ? "bg-white" : null
          }`}
          onClick={() => setChartType("PieChart")}
        >
          <PieChartIcon style={{ fontSize: 18 }} />
        </button>
      </div>
    );
  };

  return (
    <div className="w-2/3 rounded-xl bg-peach p-4 mb-2 mt-2">
      <Flex className="justify-between">
        <h2>{title}</h2>
        {buildChartTypesButton()}
      </Flex>
      <Chart
        chartType={chartType}
        data={chartData}
        options={chartOptions}
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default QuestionItem;

export interface CityPopulation {
  city: string;
  population: number;
}
