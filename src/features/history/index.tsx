import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import Table, { ColumnsType } from "antd/es/table";
import { Chart } from "react-google-charts";
import HistoryItem from "./HistoryItem";
import { useMemo, useState } from "react";

export default function History() {
  const [liveHistoryList, setLiveHistoryList] = useState<
  IHistoryItem[]
>(mockHistoryListData)
  const chartData = [
    ["City", "Population"],
    ["New York City, NY", 8175000],
    ["Los Angeles, CA", 3792000],
    ["Chicago, IL", 2695000],
    ["Houston, TX", 2328000],
    ["Philadelphia, PA", 1568000],
  ];

  const columns: ColumnsType<IHistoryItem> = [
    {
      title: "",
      dataIndex: "image",
      key: "_image",
      width: `${(300 / 1124) * 100}%`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "_name",
      width: `${(330 / 1124) * 100}%`,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "_creator",
      width: `${(300 / 1124) * 100}%`,
    },
    {
      title: "Last edited",
      dataIndex: "lastEdit",
      key: "_lastEdit",
      width: `${(300 / 1124) * 100}%`,
    },
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

  const dataSource = useMemo(() => {
    return liveHistoryList.map<IHistoryRow>((item, index) => {
      return {
        key: item.id,
        image: (<div>{item.image}</div>),
        name: item.name,
        creator: item.creator,
        lastEdit: item.lastEdit,
      } as IHistoryRow
    })
  }, [liveHistoryList])

  return (
    <div className="flex flex-col">
      <p className="text-2xl">Live History</p>
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
      {/* <Chart
        chartType="BarChart"
        data={chartData}
        options={chartOptions}
        width="100%"
        height="400px"
      /> */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        pagination={false}
        onRow={(record, rowIndex) => ({
          onClick: () => {}
        })}
      />
      {/* <HistoryItem 
      image=""
      name=""
      creator=""
      lastEdit=""
      /> */}
    </div>
  );
}

interface IHistoryItem {
  id: number;
  image: string;
  name: string;
  creator: string;
  lastEdit: string;
}

interface IHistoryRow {
  key: number
  image: JSX.Element
  name: string
  creator: string
  lastEdit: string
}

const mockHistoryListData : IHistoryItem[] = [
  {
    id: 1,
    image: "Image",
    name: "Kittiphon Singchom",
    creator: "You",
    lastEdit: "10 days ago.",
  }
]