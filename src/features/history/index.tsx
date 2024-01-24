import SearchField from "@/common/layouts/main/components/SearchField";
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
    { key: 'image', header: '' },
    { key: 'name', header: 'Name' },
    { key: 'creator', header: 'Creator' },
    { key: 'lastEdit', header: 'Last edited' },
  ];

  const data : IHistoryItem[] = [
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852890720972883/IMG_9028.jpg?ex=65b08b7c&is=659e167c&hm=62f766768e59e8ac0d4d426ab5120de2278cd0bd7fc33a70f9795ecf3eb8c9c7&=&format=webp&width=1560&height=1170",
      name: "Kittiphon Singchom",
      creator: "You",
      lastEdit: "10 days ago.",
    },
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
      name: "Chanikan Singchom",
      creator: "You",
      lastEdit: "15 days ago.",
    },
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
      name: "Chanikan Suechareon",
      creator: "You",
      lastEdit: "15 days ago.",
    },
  ];

  const handleRowClick = (rowData : IHistoryItem, rowIndex : number) => {
    console.log('Row Clicked:', rowData, rowIndex);
    navigate('/history/history-detail')
  };

  return (
    <div className="flex flex-col">
      <p className="text-2xl">Live History</p>
      <div className="flex">
        <div className="pr-2">
          <SearchField onSearch={() => {}} />
        </div>
      </div>
      <div>
      <CustomizableTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
    </div>
  );
}

interface IHistoryItem {
  image: string;
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
