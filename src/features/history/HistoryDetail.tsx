import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import QuestionItem from "./components/QuestionItem";
import { useEffect, useMemo, useState } from "react";
import { Flex, MenuProps } from "antd";
import CustomParticipantsDashboardTable from "./components/CustomParticipantsDashboardTable";
import { privateHttp as http } from "@/common/services/axios";
import Topbar from "@/common/layouts/main/components/Topbar";
import { useNavigate } from "react-router-dom";

export default function HistoryDetail() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const [viewTypeFiltered, setViewTypeFiltered] = useState(
    defaultViewTypeFiltered
  );
  const [dashboardQuestionsData, setDashboardQuestionsData] = useState([]);
  const [dashboardAnswerData, setDashboardAnswerData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [liveHistoryTitle, setLiveHistoryData] = useState("");
  const [isNameAscending, setIsNameAscending] = useState(false);
  const [isCorrectsAscending, setIsCorrectsAscending] = useState(false);
  const [isInCorrectsAscending, setIsInCorrectsAscending] = useState(false);
  const [isUnAnsweredAscending, setIsUnAnsweredAscending] = useState(false);
  const [isTotalMarkAscending, setIsTotalMarkAscending] = useState(false);

  const participantColumns: HistoryPaticipantsDetailTableColumn[] = [
    { key: "displayName", header: "Display Name", width: "20%" },
    { key: "corrects", header: "Corrects", width: "20%" },
    { key: "incorrects", header: "Incorrects", width: "20%" },
    { key: "unanswered", header: "Unanswered", width: "20%" },
    { key: "mark", header: "Total marks", width: "20%" },
  ];

  const questionColumns: HistoryQesutionDetailTableColumn[] = [
    { key: "order", header: "No.", width: "8%" },
    { key: "type", header: "Question Type", width: "15%" },
    { key: "content", header: "Question", width: "30%" },
    { key: "answer", header: "Answer", width: "25%" },
    { key: "mark", header: "Marks", width: "10%" },
    { key: "use_time", header: "Time used", width: "12%" },
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
    const poolQuestions = dashboardQuestionsData?.filter(
      (item) => item["pool_oder"] !== -1 && item["type"] !== "POOL"
    );

    return poolQuestions?.filter((item: IQuestionItem) =>
      item.content.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [dashboardQuestionsData, searchKeyword]);

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
    return dashboardQuestionsData?.filter(
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

  const sortByName = () => {
    setIsNameAscending(!isNameAscending);
    setIsCorrectsAscending(false);
    setIsInCorrectsAscending(false);
    setIsUnAnsweredAscending(false);
    setIsTotalMarkAscending(false);
    setDashboardAnswerData((prevData) => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return isNameAscending
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
      return sortedData;
    });
  };

  const sortCorrects = () => {
    setIsNameAscending(false);
    setIsCorrectsAscending(!isCorrectsAscending);
    setIsInCorrectsAscending(false);
    setIsUnAnsweredAscending(false);
    setIsTotalMarkAscending(false);
    setDashboardAnswerData((prevData) => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        const correctsA = a.corrects;
        const correctsB = b.corrects;
        return isCorrectsAscending
          ? correctsA - correctsB
          : correctsB - correctsA;
      });
      return sortedData;
    });
  };

  const sortIncorrects = () => {
    setIsNameAscending(false);
    setIsCorrectsAscending(false);
    setIsInCorrectsAscending(!isInCorrectsAscending);
    setIsUnAnsweredAscending(false);
    setIsTotalMarkAscending(false);
    setDashboardAnswerData((prevData) => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        const incorrectsA = a.incorrects;
        const incorrectsB = b.incorrects;
        return isInCorrectsAscending
          ? incorrectsA - incorrectsB
          : incorrectsB - incorrectsA;
      });
      return sortedData;
    });
  };

  const sortUnanswered = () => {
    setIsNameAscending(false);
    setIsCorrectsAscending(false);
    setIsInCorrectsAscending(false);
    setIsUnAnsweredAscending(!isUnAnsweredAscending);
    setIsTotalMarkAscending(false);
    setDashboardAnswerData((prevData) => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        const unansweredA = a.unanswered;
        const unansweredB = b.unanswered;
        return isUnAnsweredAscending
          ? unansweredA - unansweredB
          : unansweredB - unansweredA;
      });
      return sortedData;
    });
  };

  const sortTotalMark = () => {
    setIsNameAscending(false);
    setIsCorrectsAscending(false);
    setIsInCorrectsAscending(false);
    setIsUnAnsweredAscending(false);
    setIsTotalMarkAscending(!isTotalMarkAscending);
    setDashboardAnswerData((prevData) => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        const markA = a.marks;
        const markB = b.marks;
        return isTotalMarkAscending ? markA - markB : markB - markA;
      });
      return sortedData;
    });
  };

  const handleRowClick = (rowData: IHistoryPaticipantsDetailItem) => {
    console.log(rowData.displayName);
  };

  const onBack = () => {
    navigate(`/history`);
  };

  return (
    <Topbar backable={true} backFunction={onBack}>
      <div className="flex w-full mt-2 flex-col">
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
        </div>
        <div style={{ maxHeight: "73vh" }}>
          {viewTypeFiltered.viewTypeSelected === 0 ? (
            filteredQuestions == null || filteredQuestions.length === 0 ? (
              <Flex className="justify-center">
                <p className="font-semibold">Data not found.</p>
              </Flex>
            ) : (
              filteredQuestions?.map((item, index) => {
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
            )
          ) : (
            <div>
              <CustomParticipantsDashboardTable
                participantColumns={participantColumns}
                questionColumns={questionColumns}
                data={dashboardAnswerData ?? []}
                onRowClick={handleRowClick}
                sortByName={sortByName}
                sortCorrects={sortCorrects}
                sortIncorrects={sortIncorrects}
                sortUnanswered={sortUnanswered}
                sortTotalMark={sortTotalMark}
                isNameAscending={isNameAscending}
                isCorrectsAscending={isCorrectsAscending}
                isInCorrectsAscending={isInCorrectsAscending}
                isUnAnsweredAscending={isUnAnsweredAscending}
                isTotalMarkAscending={isTotalMarkAscending}
              />
            </div>
          )}
        </div>
      </div>
    </Topbar>
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

export interface IHistoryPaticipantsDetailItem {
  displayName: string;
  corrects: string;
  incorrects: string;
  unanswered: string;
  mark: string;
  questions: ParticipantQuestion[];
}

export interface IHistoryQuestionsDetailItem {
  type: string;
  order: number;
  content: string;
  answer: string;
  mark: number;
  use_time: number;
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

export interface IParticipantDetail {
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
