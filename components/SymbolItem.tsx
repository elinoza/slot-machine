import clsx from "clsx";
import { useState } from "react";
type SymbolItemProps = {
  symbol: string;
  i: number;
  active: boolean;
};

const SymbolItem = ({ symbol, i, active }: SymbolItemProps) => {
  return (
    <div
      className={clsx(
        i === 3 && "bg-rose-200",
        " p-5 flex items-center relative w-[150px] h-[150px]   "
      )}
    >
      <div className={clsx(active && "active", "absolute  spin-item")}>
        {symbol}
      </div>
    </div>
  );
};
export default SymbolItem;
