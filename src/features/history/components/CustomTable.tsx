import { Flex } from "antd";
import React, { ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface CustomizableTableProps {
  columns: { key: string; header: string }[];
  data: { [key: string]: ReactNode }[];
  onRowClick?: (
    rowData: { [key: string]: ReactNode },
    rowIndex: number
  ) => void;
  sortName?: () => void;
  sortCreator?: () => void;
  sortLastEdited?: () => void;
  currentSortColumn: string;
  isNameAscending: boolean;
  isCreatorAscending: boolean;
  isLastEditedAscending: boolean;
}

const CustomizableTable: React.FC<CustomizableTableProps> = ({
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
            className="flex rounded-xl bg-peach my-2 border-2 border-transparent hover:border-pastel-orange"
            style={{ cursor: onRowClick ? "pointer" : "default" }}
            onClick={() => onRowClick && onRowClick(row, index)}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={`p-4 ${column.key === "image" ? null : "pt-12"}`}
                style={{ width: column.width }}
              >
                {column.key === "image" ? (
                  <img
                    src={row["image"]}
                    alt="Image"
                    className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange "
                  />
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

export default CustomizableTable;
