import SearchField from "@/common/layouts/main/components/SearchField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomHistoryTable from "./components/CustomHistoryTable";
import Topbar from "@/common/layouts/main/components/Topbar";
import { ILiveHistoryData } from "../library/utils/mockData/LiveHistory";
import { privateHttp as http } from "@/common/services/axios";

export default function History() {
  const navigate = useNavigate();
  const [isNameAscending, setIsNameAscending] = useState(false);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const [isTotalParticipantsAscending, setIsTotalParticipantsAscending] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState<IHistoryItem[]>([
    defaultHistoryItem,
  ]);
  const [liveHistoryData, setLiveHistoryData] = useState([]);

  const columns: HistoryTableColumn[] = [
    { key: "image", header: "", width: "20%" },
    { key: "name", header: "Name", width: "30%" },
    { key: "date", header: "Date", width: "20%" },
    { key: "totalParticipants", header: "Total Participants", width: "15%" },
    { key: "action", header: "", width: "15%" },
  ];

  useEffect(() => {
    fetchLiveHistory();
  }, []);

  async function fetchLiveHistory() {
    try {
      const liveHistoryResponse = await http.get("/dashboard");
      setLiveHistoryData(liveHistoryResponse.data);
    } catch (e) {
      console.log(e);
    }
  }

  const mapDataToIHistoryItem = (data: ILiveHistoryData[]) => {
    return data.map((item) => ({
      id: item.id,
      image: item.cover_image,
      name: item.title,
      date: formatLastEditedDate(item.created_at),
      totalParticipants: item.total_participants,
      action: <span></span>,
    }));
  };

  useEffect(() => {
    const transformedData = mapDataToIHistoryItem(liveHistoryData);
    setSortedData(transformedData);
  }, [liveHistoryData]);

  const formatLastEditedDate = (dateString: string): string => {
    const inputDate = new Date(dateString);

    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getFilteredData = () => {
    const filteredData = sortedData.filter((item) =>
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
    setIsDateAscending(false);
    setIsTotalParticipantsAscending(false);

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

  const toggleSortByDate = () => {
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) => {
        const dateA = convertToDate(a.date).getTime();
        const dateB = convertToDate(b.date).getTime();

        return isDateAscending ? dateA - dateB : dateB - dateA;
      });
      return sorted;
    });
    setIsNameAscending(false);
    setIsDateAscending(!isDateAscending);
    setIsTotalParticipantsAscending(false);
  };

  const convertToDate = (dateString: string) => {
    const parts = dateString.split("/");

    const date = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0])
    );
    return date;
  };

  const toggleSortByTotalParticipants = () => {
    setSortedData((prevData) => {
      const sorted = [...prevData];
      sorted.sort((a, b) =>
        isTotalParticipantsAscending
          ? a.totalParticipants.localeCompare(b.totalParticipants)
          : b.totalParticipants.localeCompare(a.totalParticipants)
      );
      return sorted;
    });
    setIsNameAscending(false);
    setIsDateAscending(false);
    setIsTotalParticipantsAscending(!isTotalParticipantsAscending);
  };

  const handleRowClick = (rowData: IHistoryItem) => {
    navigate(`/history/history-detail?id=${rowData.id}`);
  };

  return (
    <Topbar>
      <div>
        <p className="font-serif text-2xl">Live History</p>
        <div className="pr-2 py-2">
          <SearchField
            onSearch={handleSearch}
            keyword={searchTerm}
            setKeyword={setSearchTerm}
          />
        </div>
        <CustomHistoryTable
          columns={columns}
          data={filteredData}
          onRowClick={handleRowClick}
          sortName={toggleSortByName}
          sortDate={toggleSortByDate}
          sortTotalParticipants={toggleSortByTotalParticipants}
          isNameAscending={isNameAscending}
          isDateAscending={isDateAscending}
          isTotalParticipantsAscending={isTotalParticipantsAscending}
        />
      </div>
    </Topbar>
  );
}

const defaultHistoryItem: IHistoryItem = {
  id: "",
  image: "",
  name: "",
  date: "",
  totalParticipants: "",
  action: <span></span>,
};

export interface IHistoryItem {
  id: string;
  image: string;
  name: string;
  date: string;
  totalParticipants: string;
  action: JSX.Element;
}

export interface HistoryTableColumn {
  key: keyof IHistoryItem;
  header: string;
  width: string;
}
