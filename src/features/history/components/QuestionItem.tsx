import React, { useState } from "react";
import Chart from "react-google-charts";

interface QuestionItemProps {
  title: string;
  data: CityPopulation[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  title,
  data
}) => {
    const chartData = [
        ["", "", { role: 'style' }],
        ["Bangsean", 8175000, '#FFAAAA'],
        ["Chiangmai", 3792000, '#FFCA7A'],
        ["Bankok", 2695000, '#C7DAB0'],
        ["Pattaya", 2328000, '#C8DAF5'],
        ["Ayutthaya", 1568000, '#DDD1E1'],
      ];
    
      const chartOptions = {
        chartArea: { width: "50%" },
        backgroundColor: '#FFFADD',
      };
  return (
    <div className="w-2/3 rounded-xl bg-peach p-4 mb-2 mt-2">
        <div className="flex justify-between">
        <h2>{title}</h2>
        </div>
      <Chart
        chartType="BarChart"
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