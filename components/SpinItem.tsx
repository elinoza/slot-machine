import { motion } from "framer-motion";

type SpinItemProps = {
  symbols: any;
  index: number;
};

const SpinItem = ({ symbols, index }: SpinItemProps) => {
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center text-7xl bg-white">
        <div className="overflow-hidden p-5  relative w-[150px] h-[150px]">
          <motion.div
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            className="absolute "
          >
            {symbols[index - 2]}
          </motion.div>
        </div>
        <div className="overflow-hidden p-5 bg-rose-300 relative w-[150px] h-[150px]">
          <motion.div
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            className="absolute "
          >
            {symbols[index - 1]}
          </motion.div>
        </div>
        <div className="overflow-hidden p-5 relative w-[150px] h-[150px]">
          <motion.div
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            className="absolute  "
          >
            {symbols[index]}
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default SpinItem;
