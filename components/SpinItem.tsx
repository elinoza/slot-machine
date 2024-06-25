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
      <div className="sin-column flex flex-col items-center justify-center bg-white text-7xl  overflow-hidden relative m-3 ">
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
