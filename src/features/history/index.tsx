import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import Table, { ColumnsType } from "antd/es/table";
import { Chart } from "react-google-charts";
import HistoryItem from "./components/HistoryItem";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [liveHistoryList, setLiveHistoryList] = useState<
  IHistoryItem[]
>(mockHistoryListData)
  const columns: ColumnsType<IHistoryRow> = [
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
        image: (<div><img className="rounded-md" src={item.image} width="250" height="200"></img></div>
        ),
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
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.key}
        pagination={false}
        onRow={(record, rowIndex) => ({
          onClick: event => navigate(`/history-detail`)
        })}
        rowClassName={'cursor-pointer'}
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
    image: "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
    name: "Kittiphon Singchom",
    creator: "You",
    lastEdit: "10 days ago.",
  }
]