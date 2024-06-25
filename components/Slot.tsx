import React, { useEffect, useState } from "react";

import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols = ["⭐", "🔔", "🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🔔"];

  const [spinColumnNumber, setSpinColumnNumber] = useState<any>(3);
  const initialIntervalIds = [undefined, undefined, undefined];
  const initialIndexes = [2, 4, 6];
  const [indexes, setIndexes] = useState(initialIndexes);
  const [remainingTime, setRemainingTime] = useState([2, 6, 8]);
  const [intervalIds, setIntervalIds] =
    useState<(number | NodeJS.Timeout | undefined)[]>(initialIntervalIds);

  const calcRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const spin = (index: number) => {
    const randomNumber = calcRandomNumber(15, 200);
    const newIntervalId = setInterval(() => {
      setRemainingTime((prevTimes) => {
        const newTimes = [...prevTimes];
        newTimes[index] = newTimes[index] - 1;
        return newTimes;
      });
      setIndexes((prevIndexes) => {
        const newIndexes = [...prevIndexes];
        newIndexes[index] = newIndexes[index] + 1;
        return newIndexes;
      });
    }, randomNumber);

    setIntervalIds((prevIds) => {
      const newIds = [...prevIds];
      newIds[index] = newIntervalId;
      return newIds;
    });

    console.log("for index:,", index, randomNumber);
  };

  const initializeIndex = (index: number) => {
    setIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = 2;
      return newIndexes;
    });
  };
  const initializeRemainingTime = (index: number) => {
    const randomRemainingTime = calcRandomNumber(4, 10);
    setRemainingTime((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index] = randomRemainingTime;
      return newTimes;
    });
  };

  const initialiazeIntervalIds = (index: number) => {
    clearInterval(intervalIds[index]);
    setIntervalIds((prevIds) => {
      const newIds = [...prevIds];
      newIds[index] = undefined;
      return newIds;
    });
  };

  useEffect(() => {
    console.log(remainingTime);
    if (remainingTime[0] === 0) {
      initializeRemainingTime(0);
      initialiazeIntervalIds(0);
    }
    if (remainingTime[1] === 0) {
      initializeRemainingTime(1);
      initialiazeIntervalIds(1);
    }
    if (remainingTime[2] === 0) {
      initializeRemainingTime(2);
      initialiazeIntervalIds(2);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (indexes[0] === symbols.length - 1) {
      initializeIndex(0);
    }
    if (indexes[1] === symbols.length - 1) {
      initializeIndex(1);
    }
    if (indexes[2] === symbols.length - 1) {
      initializeIndex(2);
    }
  }, [indexes]);

  const handleSpin = () => {
    initialiazeIntervalIds(0);
    initialiazeIntervalIds(1);
    initialiazeIntervalIds(2);
    Array.from({ length: spinColumnNumber }, (_, i) => spin(i));
  };

  return (
    <>
      <div className="bg-stone-300">
        <div className=" wrapper overflow-hidden relative flex items-center justify-center  m-5 w-[450px] h-[350px] p-5 ">
          {Array.from({ length: spinColumnNumber }, (_, i) => (
            <SpinItem
              key={i}
              symbols={symbols}
              index={indexes[i]}
              active={intervalIds[i]}
            />
          ))}
        </div>
      </div>
      <button
        className=" m-3 py-3 px-6 text-xl bg-red-600  text-white shadow-2xl border-rose-600 border-2 cursor-pointer rounded-lg font-bold active:shadow-inner"
        onClick={handleSpin}
      >
        {" "}
        SPIN
      </button>
    </>
  );
};
export default Slot;
