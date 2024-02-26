import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import QuestionItem from "./components/QuestionItem";
import { useEffect, useMemo, useState } from "react";
import { MenuProps } from "antd";
import CustomParticipantsDashboardTable from "./components/CustomParticipantsDashboardTable";
import { privateHttp as http } from "@/common/services/axios";

export default function HistoryDetail() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [viewTypeFiltered, setViewTypeFiltered] = useState(
    defaultViewTypeFiltered
  );
  const [sortingFiltered, setSortingFiltered] = useState(
    defaultSortingFilteredFiltered
  );
  const [dashboardQuestionsData, setDashboardQuestionsData] = useState([]);
  const [dashboardAnswerData, setDashboardAnswerData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [liveHistoryTitle, setLiveHistoryData] = useState("");

  const participantColumns: HistoryPaticipantsDetailTableColumn[] = [
    { key: "displayName", header: "Display Name", width: "25%" },
    { key: "corrects", header: "Corrects", width: "25%" },
    { key: "incorrects", header: "Incorrects", width: "25%" },
    { key: "unanswered", header: "Unanswered", width: "25%" },
  ];

  const questionColumns: HistoryQesutionDetailTableColumn[] = [
    { key: "order", header: "No.", width: "16%" },
    { key: "questionType", header: "Question Type", width: "16%" },
    { key: "content", header: "Question", width: "16%" },
    { key: "answer", header: "Answer", width: "16%" },
    { key: "mark", header: "Mark", width: "16%" },
    { key: "timeUsed", header: "Time used", width: "16%" },
  ];

  useEffect(() => {
    fetchQuestionDashboard();
    fetchAnswerDashboard();
  }, []);

  async function fetchQuestionDashboard() {
    try {
      const dashboardData = await http.get(`/dashboard/question/${id}`);
      setDashboardQuestionsData(dashboardData.data.questions);
      setLiveHistoryData(dashboardData.data.title);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchAnswerDashboard() {
    try {
      const dashboardData = await http.get(`/dashboard/answer/${id}`);
      console.log(dashboardData.data.participants);
      setDashboardAnswerData(dashboardData.data.participants);
    } catch (e) {
      console.log(e);
    }
  }

  const filteredPoolQuestions = useMemo(() => {
    const poolQuestions = dashboardQuestionsData.filter(
      (item) => item["pool_oder"] !== -1 && item["type"] !== "POOL"
    );

    return poolQuestions.filter((item: IQuestionItem) =>
      item.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [dashboardQuestionsData, searchKeyword]);

  const mapParticipantsToDetailItems = (participants: IParticipantDetail[]) => {
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

  const historyParticipantsDetailItems =
    mapParticipantsToDetailItems(dashboardAnswerData);

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

  const filteredQuestions = useMemo(() => {
    return dashboardQuestionsData.filter(
      (item: IQuestionItem) =>
        (item.content.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          item.pool_order === -1) ||
        (item.pool_order !== -1 && item.type === "POOL")
    );
  }, [dashboardQuestionsData, searchKeyword]);

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

  const handleRowClick = (rowData: IHistoryPaticipantsDetailItem) => {
    console.log(rowData.displayName);
  };

  return (
    <div className="flex w-full mx-6 mt-2 flex-col">
      <p className="text-2xl pb-4 font-serif">{liveHistoryTitle}</p>
      <div className="flex pb-4">
        <div className="pr-2">
          <SearchField
            className=""
            onSearch={(value) => setSearchKeyword(value)}
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
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
      <div className="overflow-y-auto" style={{ maxHeight: "85vh" }}>
        {viewTypeFiltered.viewTypeSelected === 0 ? (
          filteredQuestions.map((item, index) => {
            return (
              <div>
                <div className="pb-2" key={item["id"]}>
                  <QuestionItem
                    title={item["content"]}
                    questionNo={index + 1}
                    questionType={item["type"]}
                    questionData={item["options"]}
                    poolOrder={item["pool_order"]}
                    poolQuestionData={filteredPoolQuestions}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <CustomParticipantsDashboardTable
              participantColumns={participantColumns}
              questionColumns={questionColumns}
              participantsData={historyParticipantsDetailItems}
              questionsData={[]}
              onRowClick={handleRowClick}
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
  corrects: string;
  incorrects: string;
  unanswered: string;
  questions: ParticipantQuestion[];
}

export interface IHistoryQuestionsDetailItem {
  questionType: string;
  order: number;
  content: string;
  answer: string;
  mark: number;
  timeUsed: number;
}

export interface HistoryPaticipantsDetailTableColumn {
  key: keyof IHistoryPaticipantsDetailItem;
  header: string;
  width: string;
}

export interface HistoryQesutionDetailTableColumn {
  key: keyof IHistoryQuestionsDetailItem;
  header: string;
  width: string;
}

interface IParticipantDetail {
  id: string;
  user_id: string;
  name: string;
  marks: number;
  corrects: number;
  incorrects: number;
  unanswered: number;
  total_questions: number;
  total_marks: number;
  questions: Question[];
}

export interface IQuestionItem {
  id: string;
  order: number;
  content: string;
  pool_order: number;
  type: QuestionType;
  note: string;
  media: string;
  use_template: boolean;
  time_limit: number;
  have_time_factor: boolean;
  time_factor: number;
  font_size: number;
  select_up_to: number;
  options: IOption[];
}

export interface IOption {
  id: string;
  order: number;
  content: string;
  mark: number;
  option_content: string;
  prompt_content: string;
  correct: boolean;
  participants: Participant[];
  Participants: Participant[];
}

interface Participant {
  id: string;
  user_id: string;
  name: string;
}
