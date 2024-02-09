import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import QuestionItem from "./components/QuestionItem";
import { useMemo, useState } from "react";
import { MenuProps } from "antd";
import CustomParticipantsDashboardTable from "./components/CustomParticipantsDashboardTable";
import { participantsHistoryDetailData } from "../library/utils/mockData/LiveHistory";

export default function HistoryDetail() {
  const [viewTypeFiltered, setViewTypeFiltered] = useState(
    defaultViewTypeFiltered
  );
  const [sortingFiltered, setSortingFiltered] = useState(
    defaultSortingFilteredFiltered
  );

  const columns: HistoryPaticipantsDetailTableColumn[] = [
    { key: "displayName", header: "Display Name", width: "25%" },
    // { key: "mark", header: "Mark", width: "25%" },
    { key: "corrects", header: "Corrects", width: "25%" },
    { key: "incorrects", header: "Incorrects", width: "25%" },
    { key: "unanswered", header: "Unanswered", width: "25%" },
  ];

  const mapParticipantsToDetailItems = (participants) => {
    return participants.map((participant) => ({
      displayName: participant.name,
      mark: `${participant.marks}/${participant.total_marks}`,
      corrects: `${participant.corrects}/${participant.total_questions}  (${
        (participant.corrects * 100) /
        (participant.total_questions - participant.unanswered)
      }%)`,
      incorrects: `${participant.incorrects}/${participant.total_questions} (${
        (participant.incorrects * 100) /
        (participant.total_questions - participant.unanswered)
      }%)`,
      unanswered: `${participant.unanswered}/${participant.total_questions} (${
        (participant.unanswered * 100) /
        (participant.total_questions - participant.unanswered)
      }%)`,
    }));
  };

  const { participants } = participantsHistoryDetailData;

  const historyParticipantsDetailItems =
    mapParticipantsToDetailItems(participants);

  const viewTypeDropdownData = useMemo<MenuProps["items"]>(() => {
    const newRowDropdown = defaultViewType.map((item) => ({
      key: item.id.toString(),
      label: <div className="text-sm ">{item.viewType}</div>,
      onClick: () => {
        handleViewTypeDropdownChange(item.id.toString(), "viewTypeSelected");
      },
    }));

    return [...newRowDropdown];
  }, [defaultViewType]);

  const handleViewTypeDropdownChange = (key: string, fieldName: string) => {
    setViewTypeFiltered((prevState) => ({
      ...prevState,
      [fieldName]: Number.parseInt(key),
    }));
  };

  const sortingDropdownData = useMemo<MenuProps["items"]>(() => {
    const newRowDropdown = defaultSorting.map((item) => ({
      key: item.id.toString(),
      label: <div className="text-sm ">{item.viewType}</div>,
      onClick: () => {
        handleSortingDropdownChange(item.id.toString(), "sortingSelected");
      },
    }));

    return [...newRowDropdown];
  }, [defaultViewType]);

  const handleSortingDropdownChange = (key: string, fieldName: string) => {
    setSortingFiltered((prevState) => ({
      ...prevState,
      [fieldName]: Number.parseInt(key),
    }));
  };

  return (
    <div className="flex w-full mx-12 mt-24 flex-col">
      <p className="text-2xl pb-4 font-serif">English Quiz</p>
      <div className="flex pb-4">
        <div className="pr-2">
          <SearchField
            className=""
            onSearch={() => {}}
            keyword={""}
            setKeyword={() => {}}
          />
        </div>
        <div className="pr-2">
          <AppDropdown
            items={viewTypeDropdownData}
            indexSelected={viewTypeFiltered.viewTypeSelected}
            minWidth={130}
          />
        </div>
        <div className="pr-2">
          <AppDropdown
            items={sortingDropdownData}
            indexSelected={sortingFiltered.sortingSelected}
            minWidth={100}
          />
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "780px" }}>
        {viewTypeFiltered.viewTypeSelected === 0 ? (
          <div>
            <QuestionItem
              title="What is the capital city of Thailand"
              data={[]}
            />
          </div>
        ) : (
          <div>
            <CustomParticipantsDashboardTable
              columns={columns}
              data={historyParticipantsDetailItems}
              onRowClick={() => {}}
              sortName={() => {}}
              sortCreator={() => {}}
              sortLastEdited={() => {}}
              isNameAscending={false}
              isCreatorAscending={false}
              isLastEditedAscending={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface IViewTypeFiltered {
  viewTypeText: string;
  viewTypeSelected: number;
}

const defaultViewTypeFiltered: IViewTypeFiltered = {
  viewTypeText: "",
  viewTypeSelected: 0,
};

interface IViewType {
  id: number;
  viewType: string;
}

const defaultViewType: IViewType[] = [
  {
    id: 0,
    viewType: "Questions",
  },
  {
    id: 1,
    viewType: "Paticipants",
  },
];

interface ISortingFiltered {
  sortingText: string;
  sortingSelected: number;
}

const defaultSortingFilteredFiltered: ISortingFiltered = {
  sortingText: "",
  sortingSelected: 0,
};

interface ISorting {
  id: number;
  viewType: string;
}

const defaultSorting: ISorting[] = [
  {
    id: 0,
    viewType: "Asc",
  },
  {
    id: 1,
    viewType: "Dsc",
  },
];

export interface IHistoryPaticipantsDetailItem {
  displayName: string;
  // mark: string;
  corrects: string;
  incorrects: string;
  unanswered: string;
}

export interface HistoryPaticipantsDetailTableColumn {
  key: keyof IHistoryPaticipantsDetailItem;
  header: string;
  width: string;
}
