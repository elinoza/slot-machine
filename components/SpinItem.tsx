import SymbolItem from "./SymbolItem";

type SpinItemProps = {
  symbols: any;
  index: number;
  active: number | NodeJS.Timeout | undefined;
  win: boolean;
};

const SpinItem = ({ symbols, index, active, win }: SpinItemProps) => {
  const notActive = !active;
  const newSymbolArray = [...symbols.slice(index), ...symbols.slice(0, index)];
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
          />
        ))}
      </div>
    </>
  );
};
export default SpinItem;
