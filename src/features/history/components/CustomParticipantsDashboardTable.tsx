import { Flex } from "antd";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  HistoryPaticipantsDetailTableColumn,
  HistoryQesutionDetailTableColumn,
  IHistoryPaticipantsDetailItem,
  IParticipantDetail,
} from "../HistoryDetail";

interface CustomParticipantsDashboardTableProps {
  participantColumns: HistoryPaticipantsDetailTableColumn[];
  questionColumns: HistoryQesutionDetailTableColumn[];
  data: [];
  onRowClick?: (
    rowData: IHistoryPaticipantsDetailItem,
    rowIndex: number
  ) => void;
  sortByName?: () => void;
  sortCorrects?: () => void;
  sortIncorrects?: () => void;
  sortUnanswered?: () => void;
  sortTotalMark?: () => void;
  isNameAscending: boolean;
  isCorrectsAscending: boolean;
  isInCorrectsAscending: boolean;
  isUnAnsweredAscending: boolean;
  isTotalMarkAscending: boolean;
}

const CustomParticipantsDashboardTable: React.FC<
  CustomParticipantsDashboardTableProps
> = ({
  participantColumns,
  questionColumns,
  data,
  onRowClick,
  sortByName,
  sortCorrects,
  sortIncorrects,
  sortUnanswered,
  sortTotalMark,
  isNameAscending,
  isCorrectsAscending,
  isInCorrectsAscending,
  isUnAnsweredAscending,
  isTotalMarkAscending,
}) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderSortIcon = (columnKey: string) => {
    if (columnKey === "displayName") {
      return isNameAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "corrects") {
      return isCorrectsAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "incorrects") {
      return isInCorrectsAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "unanswered") {
      return isUnAnsweredAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "mark") {
      return isTotalMarkAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    }
    return <KeyboardArrowDownIcon />;
  };

  const handleSort = (columnKey: string) => {
    switch (columnKey) {
      case "displayName":
        sortByName && sortByName();
        break;
      case "corrects":
        sortCorrects && sortCorrects();
        break;
      case "incorrects":
        sortIncorrects && sortIncorrects();
        break;
      case "unanswered":
        sortUnanswered && sortUnanswered();
        break;
      case "mark":
        sortTotalMark && sortTotalMark();
        break;
      default:
        break;
    }
  };

  const convertQuestionType = (type: string) => {
    switch (type) {
      case "CHOICE":
        return "Choice";
      case "FILL_BLANK":
        return "Fill in the blanks";
      case "PARAGRAPH":
        return "Paragraph";
      case "TRUE_FALSE":
        return "True or False";
      case "MATCHING":
        return "Matching";
      default:
        break;
    }
  };

  const convertIsCorrect = (isCorrect: boolean) => {
    return (
      <div>
        {isCorrect ? (
          <div className="w-1/2 py-2 flex justify-center bg-correct-green rounded-xl">
            <CheckIcon style={{ fontSize: 28, color: "white" }} />
          </div>
        ) : (
          <div className="w-1/2 py-2 flex justify-center bg-false-red rounded-xl">
            <ClearIcon style={{ fontSize: 28, color: "white" }} />
          </div>
        )}
      </div>
    );
  };

  const mapParticipantsToDetailItems = (participants: IParticipantDetail[]) => {
    return participants?.map((participant) => {
      const totalQuestions =
        participant.total_questions - participant.unanswered;
      const correctsPercentage =
        totalQuestions !== 0
          ? (participant.corrects * 100) / totalQuestions
          : 0;
      const incorrectsPercentage =
        totalQuestions !== 0
          ? (participant.incorrects * 100) / totalQuestions
          : 0;
      const unansweredPercentage =
        totalQuestions !== 0
          ? (participant.unanswered * 100) / totalQuestions
          : 0;

      return {
        displayName: participant.name,
        mark: `${participant.marks}`,
        corrects: `${participant.corrects}/${participant.total_questions}  (${
          isNaN(parseInt(correctsPercentage.toString()))
            ? "0%"
            : parseInt(correctsPercentage.toString())
        }%)`,
        incorrects: `${participant.incorrects}/${
          participant.total_questions
        } (${
          isNaN(parseInt(incorrectsPercentage.toString()))
            ? "0%"
            : parseInt(incorrectsPercentage.toString())
        }%)`,
        unanswered: `${participant.unanswered}/${
          participant.total_questions
        } (${
          isNaN(parseInt(unansweredPercentage.toString()))
            ? "0%"
            : parseInt(unansweredPercentage.toString())
        }%)`,
        questions: participant.questions,
      };
    });
  };

  const historyParticipantsDetailItems = mapParticipantsToDetailItems(data);

  const renderCellContent = (
    columnKey: string,
    rowData: any,
    rowIndex: number
  ) => {
    switch (columnKey) {
      case "type":
        return convertQuestionType(String(rowData[columnKey]));
      case "order":
        return String(rowIndex + 1);
      case "is_correct":
        return convertIsCorrect(rowData[columnKey]);
      case "use_time":
        return String(rowData[columnKey] / 10);
      case "content":
        return (
          <div className="px-2">
            {String(rowData[columnKey]).replace(/\|><\|/g, " _ ")}
          </div>
        );
      case "answer":
        return <div className="px-2">{String(rowData[columnKey])}</div>;
      default:
        return String(rowData[columnKey]);
    }
  };

  return (
    <div>
      <Flex className="pl-2 justify-around border-b border-pastel-orange">
        {participantColumns?.map((column) => (
          <span key={column.key} style={{ width: column.width }}>
            {column.header}
            <button onClick={() => handleSort(column.key)}>
              {renderSortIcon(column.key)}
            </button>
          </span>
        ))}
      </Flex>
      <Flex className="flex-col">
        {historyParticipantsDetailItems === null ||
        historyParticipantsDetailItems.length === 0 ? (
          <Flex className="pt-5 justify-center">
            <p className="font-semibold">Data not found.</p>
          </Flex>
        ) : (
          historyParticipantsDetailItems?.map((row, index) => (
            <Flex className="flex-col rounded-lg bg-light-gray my-2 ">
              <div
                key={index}
                className="flex rounded-lg bg-peach pl-2 border-2 border-transparent hover:border-pastel-orange"
                style={{ cursor: onRowClick ? "pointer" : "default" }}
                onClick={() => {
                  onRowClick && onRowClick(row, index);
                  toggleRow(index);
                }}
              >
                {participantColumns?.map((column) => (
                  <div
                    key={column.key}
                    className={`py-6`}
                    style={{ width: column.width }}
                  >
                    {String(row[column.key])}
                  </div>
                ))}
              </div>
              {expandedRows[index] && (
                <div className=" border-2 border-pastel-orange rounded-lg">
                  <Flex className="pl-4 py-2 bg-pastel-orange">
                    {questionColumns?.map((column) => (
                      <span key={column.key} style={{ width: column.width }}>
                        {column.header}
                      </span>
                    ))}
                  </Flex>
                  <Flex className="flex-col">
                    {row.questions?.map((rowData, rowIndex) => (
                      <Flex
                        key={rowIndex}
                        className={`pl-4 flex-col ${
                          rowIndex % 2 === 0 ? "bg-light-gray" : "bg-white"
                        }`}
                      >
                        <div className="flex">
                          {questionColumns?.map((column) => (
                            <div
                              key={column.key}
                              className={`py-6 break-words`}
                              style={{ width: column.width }}
                            >
                              {renderCellContent(column.key, rowData, rowIndex)}
                            </div>
                          ))}
                        </div>
                      </Flex>
                    ))}
                  </Flex>
                </div>
              )}
            </Flex>
          ))
        )}
      </Flex>
    </div>
  );
};

export default CustomParticipantsDashboardTable;
