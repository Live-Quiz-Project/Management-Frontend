import SearchField from "@/common/layouts/main/components/SearchField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomHistoryTable from "./components/CustomHistoryTable";
import Topbar from "@/common/layouts/main/components/Topbar";
import { ILiveHistoryData, liveHistoryData } from "../library/utils/mockData/LiveHistory";

export default function History() {
  const navigate = useNavigate();
  const [isNameAscending, setIsNameAscending] = useState(false);
  const [isCreatorAscending, setIsCreatorAscending] = useState(false);
  const [isLastEditedAscending, setIsLastEditedAscending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedData, setSortedData] = useState<IHistoryItem[]>([defaultHistoryItem]);

  const columns : HistoryTableColumn[] = [
    { key: "image", header: "", width: "20%" },
    { key: "name", header: "Name", width: "30%" },
    { key: "creator", header: "Creator", width: "20%" },
    { key: "lastEdited", header: "Last edited", width: "15%" },
    { key: "action", header: "", width: "15%" },
  ];

  useEffect(() => {
    const transformedData = mapDataToIHistoryItem(liveHistoryData);
    setSortedData(transformedData);
  }, [liveHistoryData]);

  const mapDataToIHistoryItem = (data : ILiveHistoryData[]) => {
    return data.map(item => ({
      image: item.cover_image,
      name: item.title,
      creator: item.creator_name,
      lastEdited: formatLastEditedDate(item.updated_at),
      action: <span></span>,
    }));
  };

  const formatLastEditedDate = (dateString: string) => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
  
    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    const differenceInTime = currentDate.getTime() - inputDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    return differenceInDays.toString();
  };
  

  const getFilteredData = () => {
    const filteredData = sortedData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isNameAscending) {
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (!isNameAscending && searchTerm) {
      filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredData;
  };

  const filteredData = getFilteredData();

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const toggleSortByName = () => {
    setIsNameAscending(!isNameAscending);
    setIsCreatorAscending(false);
    setIsLastEditedAscending(false);
  
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) =>
        isNameAscending
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );
      return sorted;
    });
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
    setIsNameAscending(false);
    setIsCreatorAscending(!isCreatorAscending);
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
    setIsNameAscending(false);
    setIsCreatorAscending(false);
    setIsLastEditedAscending(!isLastEditedAscending);
  };

  const handleRowClick = (rowData: IHistoryItem, rowIndex: number) => {
    console.log("Row Clicked:", rowData, rowIndex);
    navigate("/history/history-detail");
  };

  return (
    <Topbar>
      <div>
         <p className="font-serif text-2xl">Live History</p>
        <div className="pr-2 py-2">
           <SearchField onSearch={handleSearch} keyword={searchTerm} setKeyword={setSearchTerm} />
         </div>
         <CustomHistoryTable
          columns={columns}
          data={filteredData}
          onRowClick={handleRowClick}
          sortName={toggleSortByName}
          sortCreator={toggleSortByCraetor}
          sortLastEdited={toggleSortByLastEdited}
          isNameAscending={isNameAscending}
          isCreatorAscending={isCreatorAscending}
          isLastEditedAscending={isLastEditedAscending}
          />
      </div>
    </Topbar>
  );
}

const defaultHistoryItem : IHistoryItem = 
  {
    image: "",
    name: "",
    creator: "",
    lastEdited: "",
    action: <span></span>,
  }

export interface IHistoryItem {
  image: string;
  name: string;
  creator: string;
  lastEdited: string;
  action: JSX.Element;
}

export interface HistoryTableColumn {
  key: keyof IHistoryItem;
  header: string;
  width: string;
}
