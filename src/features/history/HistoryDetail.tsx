import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import { Chart } from "react-google-charts";
import { useMemo, useState } from "react";

export default function HistoryDetail() {
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

  const filterTypes = [
    { key: "1", label: "Questions" },
    { key: "2", label: "Paticipants" },
  ];

  const sortingFilter = [
    { key: "1", label: "Asc" },
    { key: "2", label: "Dsc" },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-2xl">Parabola Quiz</p>
      <div className="flex">
        <div className="pr-2">
          <SearchField onSearch={() => {}} />
        </div>
        <div className="pr-2">
          <AppDropdown items={filterTypes} indexSelected={1} minWidth={130} />
        </div>
        <div className="pr-2">
          <AppDropdown items={sortingFilter} indexSelected={1} minWidth={100} />
        </div>
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
}