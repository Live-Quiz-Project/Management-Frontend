import { Flex } from "antd";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { HistoryDetailTableColumn, IHistoryDetailItem } from "./QuestionItem";

interface CustomHistoryTableDetailProps {
  columns: HistoryDetailTableColumn[];
  data: IHistoryDetailItem[];
  onRowClick?: (
    rowData: IHistoryDetailItem,
    rowIndex: number
  ) => void;
  sortName?: () => void;
  sortCreator?: () => void;
  sortLastEdited?: () => void;
  isNameAscending: boolean;
  isCreatorAscending: boolean;
  isLastEditedAscending: boolean;
}

const CustomHistoryTableDetail: React.FC<CustomHistoryTableDetailProps> = ({
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
            className="flex rounded-lg bg-quill-gray my-2 border-2 border-transparent hover:border-pastel-orange"
            style={{ cursor: onRowClick ? "pointer" : "default" }}
            onClick={() => onRowClick && onRowClick(row, index)}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={`py-2 px-2`}
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

export default CustomHistoryTableDetail;
