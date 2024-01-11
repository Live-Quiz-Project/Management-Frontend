import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import Table, { ColumnsType } from "antd/es/table";
import { Chart } from "react-google-charts";
import HistoryItem from "./components/HistoryItem";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CustomizableTable from "./components/CustomTable";

export default function History() {
  const navigate = useNavigate();
  const [liveHistoryList, setLiveHistoryList] =
    useState<IHistoryItem[]>(mockHistoryListData);
  // const columns: ColumnsType<IHistoryRow> = [
  //   {
  //     title: "",
  //     dataIndex: "image",
  //     key: "_image",
  //     width: `${(300 / 1124) * 100}%`,
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "_name",
  //     width: `${(330 / 1124) * 100}%`,
  //   },
  //   {
  //     title: "Creator",
  //     dataIndex: "creator",
  //     key: "_creator",
  //     width: `${(300 / 1124) * 100}%`,
  //   },
  //   {
  //     title: "Last edited",
  //     dataIndex: "lastEdit",
  //     key: "_lastEdit",
  //     width: `${(300 / 1124) * 100}%`,
  //   },
  // ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    { key: 'city', header: 'City' },
  ];

  const data = [
    { name: 'John Doe', age: 25, city: 'New York' },
    { name: 'Jane Smith', age: 30, city: 'San Francisco' },
    // Add more data as needed
  ];

  const tableStyles = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    // Add more styles as needed
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
    return liveHistoryList.map<IHistoryRow>((item) => {
      return {
        key: item.id,
        image: (
          <div>
            <img
              className="rounded-md"
              src={item.image}
              width="150"
              height="100"
            ></img>
          </div>
        ),
        name: item.name,
        creator: item.creator,
        lastEdit: item.lastEdit,
      } as IHistoryRow;
    });
  }, [liveHistoryList]);

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
      <div className="flex justify-around pb-1 border-b border-pastel-orange">
      <div>
          <span className="pr-2"></span>
        </div>
        <div>
          <span className="pr-2">Name</span>
          <KeyboardArrowDownIcon className="text-pastel-orange"/>
        </div>
        <div>
          <span className="pr-2">Creator</span>
          <KeyboardArrowDownIcon className="text-pastel-orange"/>
        </div>
        <div>
          <span className="pr-2">Last edited</span>
          <KeyboardArrowDownIcon className="text-pastel-orange"/>
        </div>
      </div>
      {
        mockHistoryListData.map((item) => {
          return (<HistoryItem 
            key={item.id}
            image={item.image}
            name={item.name}
            creator={item.creator}
            lastEdit={item.lastEdit}
          />)
        })
      }
      {/* <div>
      <h1>Customizable Table Example</h1>
      <CustomizableTable columns={columns} data={data} styles={tableStyles} />
    </div> */}
      {/* <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.key}
        pagination={false}
        onRow={(record, rowIndex) => ({
          onClick: event => navigate(`/history-detail`)
        })}
        rowClassName={'cursor-pointer custom-row'}
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
  key: number;
  image: JSX.Element;
  name: string;
  creator: string;
  lastEdit: string;
}

const mockHistoryListData: IHistoryItem[] = [
  {
    id: 1,
    image:
      "https://media.discordapp.net/attachments/988486551275200573/1115852890720972883/IMG_9028.jpg?ex=65b08b7c&is=659e167c&hm=62f766768e59e8ac0d4d426ab5120de2278cd0bd7fc33a70f9795ecf3eb8c9c7&=&format=webp&width=1560&height=1170",
    name: "Kittiphon Singchom",
    creator: "You",
    lastEdit: "10 days ago.",
  },
  {
    id: 2,
    image:
      "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
    name: "Chanikan Singchom",
    creator: "You",
    lastEdit: "15 days ago.",
  },
  {
    id: 3,
    image:
      "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
    name: "Chanikan Suechareon",
    creator: "You",
    lastEdit: "15 days ago.",
  },
];
