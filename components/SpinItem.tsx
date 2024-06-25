import { motion } from "framer-motion";

import SymbolItem from "./SymbolItem";

type SpinItemProps = {
  symbols: any;
  index: number;
  active: number | NodeJS.Timeout | undefined;
};

const SpinItem = ({ symbols, index, active }: SpinItemProps) => {
  const notActive = !active;
  console.log(notActive);
  const symbolIndexesToShow = [
    index - 3,
    index - 2,
    index - 1,
    index,
    index + 1,
    index + 2,
    index + 3,
  ];
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center text-7xl  bg-white overflow-hidden relative ">
        {symbolIndexesToShow.map((symbolIndex, i) => (
          <SymbolItem
            key={i}
            i={i}
            symbol={symbols[symbolIndex]}
            active={!notActive}
          />
        ))}
      </div>
    </>
  );
};
export default SpinItem;
