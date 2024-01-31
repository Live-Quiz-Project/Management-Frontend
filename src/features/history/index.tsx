import SearchField from "@/common/layouts/main/components/SearchField";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomizableTable from "./components/CustomTable";

export default function History() {
  const navigate = useNavigate();
  const [isNameAscending, setIsNameAscending] = useState(false);
  const [isCreatorAscending, setIsCreatorAscending] = useState(false);
  const [isLastEditedAscending, setIsLastEditedAscending] = useState(false);

  const columns = [
    { key: "image", header: "", width: "20%" },
    { key: "name", header: "Name", width: "20%" },
    { key: "creator", header: "Creator", width: "20%" },
    { key: "lastEdited", header: "Last edited", width: "20%" },
    { key: "action", header: "", width: "20%" },
  ];

  const data: IHistoryItem[] = [
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852890720972883/IMG_9028.jpg?ex=65b08b7c&is=659e167c&hm=62f766768e59e8ac0d4d426ab5120de2278cd0bd7fc33a70f9795ecf3eb8c9c7&=&format=webp&width=1560&height=1170",
      name: "Kittiphon Singchom",
      creator: "You",
      lastEdited: "10 days ago.",
      action: <span></span>,
    },
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1149605252149026816/how-to-install-a-split-jamb-door-step-6.png?ex=65aa22d2&is=6597add2&hm=4f59872bca885805d274a5581790057cd43f694f784184bccc3215a7263519f1&=&format=webp&quality=lossless&width=1872&height=1170",
      name: "Chanikan Singchom",
      creator: "You",
      lastEdited: "15 days ago.",
      action: <span></span>,
    },
    {
      image:
        "https://media.discordapp.net/attachments/988486551275200573/1115852891832463390/IMG_6115.jpg?ex=65b08b7c&is=659e167c&hm=8924224afac46d2d02e9e8eb41418e3ed58c275258d0ca62f6a64e1d13b4189a&=&format=webp&width=878&height=1170",
      name: "Chanikan Suechareon",
      creator: "You",
      lastEdited: "15 days ago.",
      action: <span></span>,
    },
  ];
  const [sortedData, setSortedData] = useState(data);

  const toggleSortByName = () => {
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) =>
        isNameAscending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      return sorted;
    });
    setIsNameAscending(!isNameAscending);
    setIsCreatorAscending(false);
    setIsLastEditedAscending(false);
  };

  const toggleSortByCraetor = () => {
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) =>
        isCreatorAscending
          ? a.creator.localeCompare(b.creator)
          : b.creator.localeCompare(a.creator)
      );
      return sorted;
    });
    setIsCreatorAscending(!isCreatorAscending);
    setIsNameAscending(false);
    setIsLastEditedAscending(false);
  };

  const toggleSortByLastEdited = () => {
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) =>
        isLastEditedAscending
          ? a.lastEdited.localeCompare(b.lastEdited)
          : b.lastEdited.localeCompare(a.lastEdited)
      );
      return sorted;
    });
    setIsLastEditedAscending(!isLastEditedAscending);
    setIsNameAscending(false);
    setIsCreatorAscending(false);
  };

  const handleRowClick = (rowData: IHistoryItem, rowIndex: number) => {
    console.log("Row Clicked:", rowData, rowIndex);
    navigate("/history/history-detail");
  };

  return (
    <div className="flex flex-col px-6 pt-2">
      <p className="text-2xl">Live History</p>
      <div className="flex">
        <div className="pr-2">
          <SearchField onSearch={() => {}} />
        </div>
      </div>
      <div>
        <CustomizableTable
          columns={columns}
          data={sortedData}
          onRowClick={handleRowClick}
          sortName={toggleSortByName}
          sortCreator={toggleSortByCraetor}
          sortLastEdited={toggleSortByLastEdited}
          isNameAscending={isNameAscending}
          isCreatorAscending={isCreatorAscending}
          isLastEditedAscending={isLastEditedAscending}
        />
      </div>
    </div>
  );
}

interface IHistoryItem {
  image: string;
  name: string;
  creator: string;
  lastEdited: string;
  action: JSX.Element;
}
