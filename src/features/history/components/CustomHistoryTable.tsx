import { Flex } from "antd";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IHistoryItem, HistoryTableColumn } from "..";

interface CustomHistoryTableProps {
  columns: HistoryTableColumn[];
  data: IHistoryItem[];
  onRowClick?: (rowData: IHistoryItem, rowIndex: number) => void;
  sortName?: () => void;
  sortDate?: () => void;
  sortTotalParticipants?: () => void;
  isNameAscending: boolean;
  isDateAscending: boolean;
  // isTotalParticipantsAscending: boolean;
}

const CustomHistoryTable: React.FC<CustomHistoryTableProps> = ({
  columns,
  data,
  onRowClick,
  sortName,
  sortDate,
  // sortTotalParticipants,
  isNameAscending,
  isDateAscending,
  // isTotalParticipantsAscending,
}) => {
  const renderSortIcon = (columnKey: string) => {
    if (columnKey === "name") {
      return isNameAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    } else if (columnKey === "date") {
      return isDateAscending ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    }
    // else if (columnKey === "totalParticipants") {
    //   return isTotalParticipantsAscending ? (
    //     <KeyboardArrowUpIcon />
    //   ) : (
    //     <KeyboardArrowDownIcon />
    //   );
    // }
    return <KeyboardArrowDownIcon />;
  };

  const handleSort = (columnKey: string) => {
    switch (columnKey) {
      case "name":
        sortName && sortName();
        break;
      case "date":
        sortDate && sortDate();
        break;
      // case "totalParticipants":
      //   sortTotalParticipants && sortTotalParticipants();
      //   break;
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
              {column.key !== "image" && column.key !== "action"
                ? renderSortIcon(column.key)
                : null}
            </button>
          </span>
        ))}
      </Flex>
      <Flex className="flex-col">
        {data.map((row, index) => (
          <div
            key={index}
            className="flex p-4 rounded-xl bg-peach my-2 border-2 border-transparent hover:border-pastel-orange"
            style={{ cursor: onRowClick ? "pointer" : "default" }}
            onClick={() => onRowClick && onRowClick(row, index)}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={` ${column.key === "image" ? null : "pt-9"}`}
                style={{ width: column.width }}
              >
                {column.key === "image" ? (
                  <img
                    src={`${
                      import.meta.env.VITE_FIREBASE_STORAGE_BASE_URL
                    }/${encodeURIComponent(row["image"])}?alt=media`}
                    alt="Image"
                    className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange"
                  />
                ) : column.key === "date" ? (
                  `${row[column.key]}`
                ) : (
                  row[column.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default CustomHistoryTable;
