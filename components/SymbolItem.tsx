import clsx from "clsx";
import { useState } from "react";
type SymbolItemProps = {
  symbol: string;
  i: number;
  active: boolean;
  win: boolean;
};

const SymbolItem = ({ symbol, i, active, win }: SymbolItemProps) => {
  return (
    <div
      className={clsx(
        i === 3 && "bg-rose-200",
        i === 3 && win && "bg-red-500 animate-ping",
        " p-5 flex items-center justify-center relative w-[150px] h-[150px]   "
      )}
    >
      <div className={clsx(active && "active", "absolute  spin-item")}>
        {symbol}
      </div>
    </div>
  );
};
export default SymbolItem;
