import { Flex } from "antd";
import React, { useState } from "react";
import Chart from "react-google-charts";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { IOption } from "../HistoryDetail";

interface NestQuestionItemProps {
  title: string;
  questionNo: number;
  questionData: IOption[];
  questionType: string;
}

const NestQuestionItem: React.FC<NestQuestionItemProps> = ({
  title,
  questionNo,
  questionType,
  questionData,
}) => {
  const [chartType, setChartType] = useState<"BarChart" | "PieChart">(
    "BarChart"
  );

  const chartOptions = {
    chartArea: { width: "80%", height: "80%" },
    colors: ["#FFAAAA", "#FFCA7A", "#C7DAB0", "#C8DAF5", "#DDD1E1"],
    backgroundColor: "#FFF",
  };

  const buildChartTypesButton = () => {
    return (
      <div className="flex p-0.5 rounded-sm bg-pastel-orange">
        <button
          className={`rounded-sm px-2 ${
            chartType === "BarChart" ? "bg-white" : null
          } mr-1`}
          onClick={() => {
            setChartType("BarChart");
          }}
        >
          <BarChartIcon style={{ fontSize: 18 }} />
        </button>
        <button
          className={`rounded-sm px-2 ${
            chartType === "PieChart" ? "bg-white" : null
          }`}
          onClick={() => {
            setChartType("PieChart");
          }}
        >
          <PieChartIcon style={{ fontSize: 18 }} />
        </button>
      </div>
    );
  };

  const getQuestionTypeDescription = (questionType: string) => {
    switch (questionType) {
      case "CHOICE":
        return "Choice";
      case "POOL":
        return "Pool";
      case "FILL_BLANK":
        return "Fill in the blank";
      case "PARAGRAPH":
        return "Paragraph";
      case "TRUE_FALSE":
        return "True or False";
      case "MATCHING":
        return "Matching";
      default:
        return "Unknown Type";
    }
  };

  const buildQuestionTypeBadge = (type: string) => {
    return (
      <div className="inline-flex px-2 py-1 bg-pastel-orange rounded-xl">
        {getQuestionTypeDescription(type)}
      </div>
    );
  };

  function transformData(inputObject: IOption[]) {
    const chartData: (string | number | { role: string })[][] = [
      ["", "", { role: "style" }],
    ];

    const colors = ["#FFAAAA", "#FFCA7A", "#C7DAB0", "#C8DAF5", "#DDD1E1"];
    let colorIndex = 0;

    inputObject.forEach((option) => {
      const content = option.content;
      let participantCount = 0;
      if (option.participants != null) {
        participantCount = option.participants.length;
      }

      const color = colors[colorIndex % colors.length];
      colorIndex++;

      chartData.push([content, participantCount, color]);
    });

    return chartData;
  }

  const buildMultiTypeChart = () => {
    const chartData = transformData(questionData);
    return (
      <Chart
        chartType={chartType}
        data={chartData}
        options={chartOptions}
        width="100%"
        height="400px"
      />
    );
  };

  const buildMatchingChart = () => {
    return <div></div>;
  };

  const buildChart = () => {
    switch (questionType) {
      case "CHOICE":
        return buildMultiTypeChart();
      case "FILL_BLANK":
        return buildMultiTypeChart();
      case "PARAGRAPH":
        return buildMultiTypeChart();
      case "TRUE_FALSE":
        return buildMultiTypeChart();
      case "MATCHING":
        return buildMatchingChart();
      default:
        return null;
    }
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 mb-2">
      <Flex className="justify-between">
        <h2 className="font-serif">
          {questionNo}. {title}
        </h2>
        {buildChartTypesButton()}
      </Flex>
      {buildQuestionTypeBadge(questionType)}
      <div className="py-4">{buildChart()}</div>
    </div>
  );
};

export default NestQuestionItem;

export interface IHistoryDetailItem {
  displayName: string;
  answer: string;
  mark: string;
  totalMarks: string;
}

export interface HistoryDetailTableColumn {
  key: keyof IHistoryDetailItem;
  header: string;
  width: string;
}
