import { useEffect } from "react";
import SymbolItem from "./SymbolItem";

type SpinItemProps = {
  symbols: any;
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

  // const halfLength = Math.floor(symbols.length / 2);
  // const newSymbolArray = [
  //   ...symbols.slice(index - halfLength + 1, index),
  //   ...symbols.slice(index),
  //   ...symbols.slice(0, index - halfLength + 1),
  // ];
  const newSymbolArray = [...symbols.slice(index), ...symbols.slice(0, index)];

  useEffect(() => {
    const winnerI = Math.floor(symbols.length / 2);
    if (notActive) handleWinnerIndex(spinColumnIndex, newSymbolArray[winnerI]);
  }, [active]);
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center bg-white text-7xl  overflow-hidden relative m-3 ">
        {newSymbolArray.map((symbol: string, i: number) => (
          <SymbolItem
            key={i}
            i={i}
            index={index}
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
