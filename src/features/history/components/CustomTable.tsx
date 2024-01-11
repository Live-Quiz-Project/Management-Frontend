import React, { ReactNode, CSSProperties } from 'react';

interface CustomizableTableProps {
  columns: { key: string; header: string }[];
  data: { [key: string]: ReactNode }[];
  styles?: CSSProperties;
  onRowClick?: (rowData: { [key: string]: ReactNode }, rowIndex: number) => void;
}

const CustomizableTable: React.FC<CustomizableTableProps> = ({ columns, data, styles, onRowClick }) => {
  return (
    <table className="table-auto w-full border-separate bg-white border-spacing-y-2" style={styles}>
      <thead className='bg-white border-b border-pastel-orange'>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="p-2 text-left">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='rounded-xl bg-peach' style={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick && onRowClick(row, index)}>
            {columns.map((column) => (
              <td key={column.key} className="p-4">
                {column.key === 'image' ? (
                  <img src={row['image']} alt="Image" className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange " />
                ) : (
                  row[column.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomizableTable;
