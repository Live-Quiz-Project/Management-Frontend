import React, { useState } from "react";

interface HistoryItemProps {
  image: string;
  name: string;
  creator: string;
  lastEdit: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  image,
  name,
  creator,
  lastEdit,
}) => {
  return (
    <div className="rounded-xl bg-peach p-4 mb-2 mt-2">
      <div className="flex justify-between pl-2 pr-6">
        <div>
          <p>
            <img
              className="object-cover h-24 w-36 rounded-xl border-2 border-pastel-orange"
              src={image}
            />
          </p>
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{creator}</p>
        </div>
        <div>
          <p>{lastEdit}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
