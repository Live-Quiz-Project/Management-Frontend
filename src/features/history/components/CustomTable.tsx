// CustomizableTable.tsx

import React, { ReactNode, CSSProperties } from 'react';

interface CustomizableTableProps {
  columns: { key: string; header: string }[];
  data: { [key: string]: ReactNode }[];
  styles?: CSSProperties;
}

const CustomizableTable: React.FC<CustomizableTableProps> = ({ columns, data, styles }) => {
  return (
    <table className="table-auto w-full" style={styles}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="border border-gray-400 p-4 text-left">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key} className="border border-gray-400 p-4">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomizableTable;
