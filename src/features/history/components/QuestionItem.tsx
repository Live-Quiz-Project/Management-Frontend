import { Flex } from "antd";
import React, { useState } from "react";
import Chart from "react-google-charts";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CustomHistoryDetailTable from "./CustomHistoryDetailTable";

interface QuestionItemProps {
  title: string;
  data: CityPopulation[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({ title }) => {
  const [chartType, setChartType] = useState<
    "BarChart" | "PieChart" | "ListChart" | "LineChart"
  >("BarChart");
  const [isListChartState, setIsListChartState] = useState(false);
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

  const columns : HistoryDetailTableColumn[] = [
    { key: "displayName", header: "Display Name", width: "25%" },
    { key: "answer", header: "Answer", width: "25%" },
    { key: "mark", header: "Mark", width: "25%" },
    { key: "totalMarks", header: "Total Marks", width: "25%" },
  ];

  const data: IHistoryDetailItem[] = [
    {
      displayName:
        "Kittiphon Singchom",
        answer: "Kittiphon Singchom",
        mark: "5",
        totalMarks: "5",
    },
    {
      displayName:
      "Kittiphon Singchom",
      answer: "Kittiphon Singchom",
      mark: "5",
      totalMarks: "5",
    },
    {
      displayName:
        "Kittiphon Singchom",
        answer: "Kittiphon Singchom",
        mark: "7",
        totalMarks: "7",
    },
  ];

  const buildChartTypesButton = () => {
    return (
      <div className="flex p-0.5 rounded-sm bg-pastel-orange">
        <button
          className={`rounded-sm px-2 ${
            chartType === "BarChart" ? "bg-white" : null
          } mr-1`}
          onClick={() => {
            setChartType("BarChart");
            setIsListChartState(false);
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
            setIsListChartState(false);
          }}
        >
          <PieChartIcon style={{ fontSize: 18 }} />
        </button>
        <button
          className={`rounded-sm px-2 ${
            isListChartState === true ? "bg-white" : null
          }`}
          onClick={() => {
            setIsListChartState(true)
            setChartType("LineChart");}}
        >
          <FormatListNumberedIcon style={{ fontSize: 18 }} />
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
      {
        chartType === "LineChart" 
        ? <div>
          <CustomHistoryDetailTable
          columns={columns}
          data={data}
          onRowClick={() => {}}
          sortName={() => {}}
          sortCreator={() => {}}
          sortLastEdited={() => {}}
          isNameAscending={false}
          isCreatorAscending={false}
          isLastEditedAscending={false}
          />
        </div>
        :  <Chart
        chartType={chartType}
        data={chartData}
        options={chartOptions}
        width="100%"
        height="400px"
      />
      }
    </div>
  );
};

export default QuestionItem;

export interface CityPopulation {
  city: string;
  population: number;
}

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