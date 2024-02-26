import { Flex } from "antd";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  sortName?: () => void;
  sortCreator?: () => void;
  sortLastEdited?: () => void;
  isNameAscending: boolean;
  isCreatorAscending: boolean;
  isLastEditedAscending: boolean;
}

const CustomParticipantsDashboardTable: React.FC<
  CustomParticipantsDashboardTableProps
> = ({
  participantColumns,
  questionColumns,
  data,
  onRowClick,
  sortName,
  sortCreator,
  sortLastEdited,
  isNameAscending,
  isCreatorAscending,
  isLastEditedAscending,
}) => {
  const renderSortIcon = (columnKey: string) => {
    if (columnKey === "name") {
      return isNameAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "creator") {
      return isCreatorAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "lastEdited") {
      return isLastEditedAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    }
    return <KeyboardArrowDownIcon />;
  };

  const handleSort = (columnKey: string) => {
    switch (columnKey) {
      case "name":
        sortName && sortName();
        break;
      case "creator":
        sortCreator && sortCreator();
        break;
      case "lastEdited":
        sortLastEdited && sortLastEdited();
        break;
      default:
        break;
    }
  };

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
      questions: participant.questions,
    }));
  };

  const historyParticipantsDetailItems = mapParticipantsToDetailItems(data);

  return (
    <div>
      <Flex className="justify-around border-b border-pastel-orange">
        {participantColumns.map((column) => (
          <span key={column.key} style={{ width: column.width }}>
            {column.header}
            <button onClick={() => handleSort(column.key)}>
              {renderSortIcon(column.key)}
            </button>
          </span>
        ))}
      </Flex>
      <Flex className="flex-col">
        {historyParticipantsDetailItems.map((row, index) => (
          <Flex className="flex-col rounded-lg bg-quill-gray my-2 ">
            <div
              key={index}
              className="flex rounded-lg bg-peach pl-2 border-2 border-transparent hover:border-pastel-orange"
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              onClick={() => onRowClick && onRowClick(row, index)}
            >
              {participantColumns.map((column) => (
                <div
                  key={column.key}
                  className={`py-6`}
                  style={{ width: column.width }}
                >
                  {String(row[column.key])}
                </div>
              ))}
            </div>
            <Flex className="justify-center px-12">
              {questionColumns.map((column) => (
                <span key={column.key} style={{ width: column.width }}>
                  {column.header}
                </span>
              ))}
            </Flex>
            <Flex className="flex-col">
              {row["questions"].map((row, index) => (
                <Flex className="flex-col rounded-lg bg-quill-gray">
                  <div key={index} className="flex">
                    {questionColumns.map((column) => (
                      <div
                        key={column.key}
                        className={`py-6`}
                        style={{ width: column.width }}
                      >
                        {String(row[column.key])}
                      </div>
                    ))}
                  </div>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default CustomParticipantsDashboardTable;
