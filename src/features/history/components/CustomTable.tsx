import { Flex } from 'antd';
import React, { ReactNode, CSSProperties } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CustomizableTableProps {
  columns: { key: string; header: string }[];
  data: { [key: string]: ReactNode }[];
  onRowClick?: (rowData: { [key: string]: ReactNode }, rowIndex: number) => void;
  sortName?: () => void;
  sortCreator?: () => void;
  sortLastEdited?: () => void;
}

const CustomizableTable: React.FC<CustomizableTableProps> = ({ columns, data, onRowClick, sortName, sortCreator, sortLastEdited }) => {
  return (
    <div>
      <Flex className='justify-around border-b border-pastel-orange'>
  {columns.map((column) => (
    <span key={column.key} style={{ width: column.width }}>
      {column.header}
      <button>
      {
        (column.key !== 'image' && column.key !== 'action')
        ? <KeyboardArrowDownIcon />
        : null}
      </button>
    </span>
  ))}
</Flex>
<Flex className='flex-col'>
  {data.map((row, index) => (
    <div key={index} className='flex rounded-xl bg-peach my-2 border-2 border-transparent hover:border-pastel-orange' style={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick && onRowClick(row, index)}>
      {columns.map((column) => (
        <div key={column.key} className={`p-4 ${column.key === 'image' ? null : "pt-12"}`} style={{ width: column.width }}>
          {column.key === 'image' ? (
                  <img src={row['image']} alt="Image" className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange " />
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

{/* <Flex className='flex-col'>
          {data.map((row, index) => (
          <div key={index} className='flex  rounded-xl bg-peach my-2' style={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick && onRowClick(row, index)}>
            {columns.map((column) => (
              <div key={column.key} className="p-4">
                {column.key === 'image' ? (
                  <img src={row['image']} alt="Image" className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange " />
                ) : (
                  row[column.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </Flex> */}


 // <table className="table-auto w-full border-separate bg-white border-spacing-y-2" style={styles}>
    //   <thead className='bg-white border-b border-pastel-orange'>
    //     <tr>
    //       {columns.map((column) => (
    //         <th key={column.key} className="p-2 text-left">
    //           {column.header}
    //         </th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((row, index) => (
    //       <tr key={index} className='border-2 rounded-xl bg-peach' style={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick && onRowClick(row, index)}>
    //         {columns.map((column) => (
    //           <td key={column.key} className="p-4">
    //             {column.key === 'image' ? (
    //               <img src={row['image']} alt="Image" className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange " />
    //             ) : (
    //               row[column.key]
    //             )}
    //           </td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>