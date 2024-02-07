import { Flex } from "antd";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { HistoryPaticipantsDetailTableColumn, IHistoryPaticipantsDetailItem } from "../HistoryDetail";

interface CustomParticipantsDashboardTableProps {
  columns: HistoryPaticipantsDetailTableColumn[];
  data: IHistoryPaticipantsDetailItem[];
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

const CustomParticipantsDashboardTable: React.FC<CustomParticipantsDashboardTableProps> = ({
  columns,
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

  return (
    <div>
      <Flex className="justify-around border-b border-pastel-orange">
        {columns.map((column) => (
          <span key={column.key} style={{ width: column.width }}>
            {column.header}
            <button onClick={() => handleSort(column.key)}>
              {renderSortIcon(column.key)}
            </button>
          </span>
        ))}
      </Flex>
      <Flex className="flex-col">
        {data.map((row, index) => (
          <div
            key={index}
            className="flex rounded-lg bg-peach my-2 border-2 border-transparent hover:border-pastel-orange"
            style={{ cursor: onRowClick ? "pointer" : "default" }}
            onClick={() => onRowClick && onRowClick(row, index)}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={`py-6`}
                style={{ width: column.width }}
              >
                {
                  row[column.key]
                }
              </div>
            ))}
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default CustomParticipantsDashboardTable;
