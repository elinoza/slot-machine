import { useEffect } from "react";
import SymbolItem from "./SymbolItem";

type SpinItemProps = {
  symbols: string[];
  index: number;
  active: number | NodeJS.Timeout | undefined;
  win: boolean;
  handleWinnerIndex: (index: number, symbol: string) => void;
  spinColumnIndex: number;
};

const SpinItem = ({
  symbols,
  index,
  active,
  win,
  handleWinnerIndex,
  spinColumnIndex,
}: SpinItemProps) => {
  const notActive = !active;
  const newSymbolArray = [...symbols.slice(index), ...symbols.slice(0, index)];

  useEffect(() => {
    const winnerI = Math.floor(symbols.length / 2);
    if (notActive) handleWinnerIndex(spinColumnIndex, newSymbolArray[winnerI]);
  }, [active]);

  return (
    <>
      {" "}
      <div className="spinItem flex flex-col items-center justify-center text-5xl md:text-7xl  overflow-hidden relative border border-black w-1/3  ">
        {newSymbolArray.map((symbol: string, i: number) => (
          <SymbolItem
            key={i}
            i={i}
            symbol={symbol}
            active={!notActive}
            win={win}
            length={symbols.length}
          />
        ))}
      </div>
    </>
  );
};
export default SpinItem;
