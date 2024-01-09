import SearchField from "@/common/layouts/main/components/SearchField";
import { Chart } from "react-google-charts";

export default function History() {
  const chartData = [
    ["City", "Population"],
    ["New York City, NY", 8175000],
    ["Los Angeles, CA", 3792000],
    ["Chicago, IL", 2695000],
    ["Houston, TX", 2328000],
    ["Philadelphia, PA", 1568000],
  ];

  const chartOptions = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };

  return (
    <div className="flex flex-col">
      <p className="text-2xl">Live History</p>
      <SearchField 
      onSearch={() => {}}
      />
      <Chart
        chartType="BarChart"
        data={chartData}
        options={chartOptions}
        width="100%"
        height="400px"
      />
    </div>
  );
}
