import clsx from "clsx";
import { useState } from "react";
type SymbolItemProps = {
  symbol: string;
  index: number;
  active: boolean;
  win: boolean;
  i: number;
  length: number;
};

const SymbolItem = ({
  i,
  symbol,
  index,
  active,
  win,
  length,
}: SymbolItemProps) => {
  return (
    <div
      className={clsx(
        i === Math.floor(length / 2) && "bg-rose-200",
        i === Math.floor(length / 2) && win && "bg-red-500 animate-ping",
        " flex items-center justify-center relative w-symbol-small md:w-symbol-medium h-symbol-small md:h-symbol-medium  "
      )}
    >
      <div className={clsx(active && "active", "absolute z-10 spin-item")}>
        {symbol}
      </div>
    </div>
  );
};
export default SymbolItem;
