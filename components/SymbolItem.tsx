import clsx from "clsx";
import { useState } from "react";
type SymbolItemProps = {
  symbol: string;
  index: number;
  active: boolean;
  win: boolean;
  i: number;
};

const SymbolItem = ({ i, symbol, index, active, win }: SymbolItemProps) => {
  return (
    <div
      className={clsx(
        i === 4 && "bg-rose-200",
        i === 4 && win && "bg-red-500 animate-ping",
        " p-5 flex items-center justify-center relative w-[150px] h-[150px]   "
      )}
    >
      <div className={clsx(active && "active", "absolute z-10 spin-item")}>
        {symbol}
      </div>
    </div>
  );
};
export default SymbolItem;
