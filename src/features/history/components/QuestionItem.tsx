import { Flex } from "antd";
import React, { useState } from "react";
import Chart from "react-google-charts";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { IOption } from "../HistoryDetail";
import NestQuestionItem from "./nestQuestionItem";

interface QuestionItemProps {
  title: string;
  questionNo: number;
  questionData: IOption[];
  poolQuestionData: [];
  questionType: string;
  poolOrder: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  title,
  questionNo,
  questionType,
  questionData,
  poolQuestionData,
  poolOrder,
}) => {
  const [chartType, setChartType] = useState<"BarChart" | "PieChart">(
    "BarChart"
  );

  const chartOptions = {
    chartArea: { width: "80%", height: "80%" },
    colors: ["#FFAAAA", "#FFCA7A", "#C7DAB0", "#C8DAF5", "#DDD1E1"],
    backgroundColor: "#FFFADD",
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

  const buildPoolChart = (order: number) => {
    const questionNumbers: { [key: number]: number } = {};

    return (
      <div className="pb-0">
        {poolQuestionData.map((item) => {
          if (!questionNumbers[item["pool_order"]]) {
            questionNumbers[item["pool_order"]] = 1;
          }
          const questionNo = questionNumbers[item["pool_order"]]++;

          return (
            <div className="pb-0" key={item["id"]}>
              {item["pool_order"] === order && (
                <NestQuestionItem
                  title={item["content"]}
                  questionNo={questionNo}
                  questionType={item["type"]}
                  questionData={item["options"]}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const buildMatchingChart = () => {
    return <div></div>;
  };

  const buildChart = () => {
    switch (questionType) {
      case "CHOICE":
        return buildMultiTypeChart();
      case "POOL":
        return buildPoolChart(poolOrder);
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
    <div className="w-full rounded-xl bg-peach p-4 mb-2 mt-2">
      <Flex className="justify-between">
        <h2 className="font-serif">
          {questionNo}. {title}
        </h2>
        {questionType === "POOL" ? null : buildChartTypesButton()}
      </Flex>
      {buildQuestionTypeBadge(questionType)}
      <div className="py-4">{buildChart()}</div>
    </div>
  );
};

export default QuestionItem;

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
