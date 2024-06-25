type SpinItemProps = {
  symbols: any;
  index: number;
};

const SpinItem = ({ symbols, index }: SpinItemProps) => {
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center text-7xl bg-white">
        <div className="p-5">{symbols[index - 2]}</div>
        <div className="p-5 bg-rose-300">{symbols[index - 1]}</div>
        <div className="p-5">{symbols[index]}</div>
      </div>
    </>
  );
};
export default SpinItem;
