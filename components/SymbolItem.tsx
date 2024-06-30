import clsx from "clsx";

type SymbolItemProps = {
  symbol: string;
  active: boolean;
  win: boolean;
  i: number;
  length: number;
};

const SymbolItem = ({ i, symbol, active, win, length }: SymbolItemProps) => {
  return (
    <div
      className={clsx(
        i === Math.floor(length / 2) - 1 && "slidingAbove",
        i === Math.floor(length / 2) + 1 && "slidingBelow",
        i === Math.floor(length / 2) && win && "bg-red-500",
        "symbol-item flex items-center justify-center relative w-full h-symbol-small md:h-symbol-medium  "
      )}
    >
      <div
        className={clsx(
          active && "active",
          " absolute z-10 w-full h-full spin-item flex items-center justify-center"
        )}
      >
        {symbol}
      </div>
    </div>
  );
};
export default SymbolItem;
