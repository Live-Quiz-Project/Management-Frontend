import React, { useState } from "react";

interface HistoryItemProps {
    image: string
    name: string
    creator: string
    lastEdit: string
}

const HistoryItem: React.FC<HistoryItemProps> = ({image, name, creator, lastEdit }) => {


  return (
    <div className="flex justify-around">
        <div>
            <p>Image</p>
        </div>
        <div>
            <p>Kittiphon Singchom</p>
        </div>
        <div>
            <p>You</p>
        </div>
        <div>
            <p>10 days ago.</p>
        </div>
    </div>
  );
};

export default HistoryItem;
