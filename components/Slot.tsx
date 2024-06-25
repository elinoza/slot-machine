import React, { useEffect, useState } from "react";

import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols = ["⭐", "🔔", "🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🔔"];
  const [spinColumnNumber, setSpinColumnNumber] = useState<any>(3);
  const initialIntervalIds = [undefined, undefined, undefined];
  const initialIndexes = [2, 4, 6];
  const [indexes, setIndexes] = useState(initialIndexes);
  const [winnerIndexes, setWinnerIndexes] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [remainingTime, setRemainingTime] = useState([2, 6, 8]);
  const [intervalIds, setIntervalIds] =
    useState<(number | NodeJS.Timeout | undefined)[]>(initialIntervalIds);
  const [win, setWin] = useState<boolean>(false);
  const calcRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const spin = (index: number) => {
    // const randomNumber = calcRandomNumber(15, 200);
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
    }, 170);

    setIntervalIds((prevIds) => {
      const newIds = [...prevIds];
      newIds[index] = newIntervalId;
      return newIds;
    });
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
  const initializeWinnerIndexes = (index: number) => {
    setWinnerIndexes((prevWinnerIndexes) => {
      const newWinnerIndex = [...prevWinnerIndexes];
      newWinnerIndex[index] = null;
      return newWinnerIndex;
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

  const handleWinnerIndex = (index: number, winnerSymbol: string) => {
    setWinnerIndexes((prevWinnerSymbols) => {
      const newWinnerSymbols = [...prevWinnerSymbols];
      newWinnerSymbols[index] = winnerSymbol;
      const isAllEqual = newWinnerSymbols.every(
        (index) => index === newWinnerSymbols[0]
      );

      if (newWinnerSymbols.every((index) => index) && isAllEqual) {
        setWin(true);
      }
      return newWinnerSymbols;
    });
  };

  const handleRemainingTime = (index: number) => {
    if (remainingTime[index] === 0) {
      const winnerIndex = indexes[index];
      const winnerSymbol = symbols[winnerIndex];
      handleWinnerIndex(index, winnerSymbol);
      initializeRemainingTime(index);
      initialiazeIntervalIds(index);
    }
  };

  useEffect(() => {
    Array.from({ length: spinColumnNumber }, (_, i) => handleRemainingTime(i));
  }, [remainingTime]);

  useEffect(() => {
    Array.from({ length: spinColumnNumber }, (_, i) => {
      if (indexes[i] === symbols.length - 1) {
        initializeIndex(i);
      }
    });
  }, [indexes]);

  const handleSpin = () => {
    setWin(false);
    Array.from({ length: spinColumnNumber }, (_, i) => {
      initialiazeIntervalIds(i);
      initialiazeIntervalIds(i);
      initializeWinnerIndexes(i);
      spin(i);
    });
  };

  return (
    <>
      <div className="bg-stone-300">
        <div className=" wrapper overflow-hidden relative flex items-center justify-center  m-5 w-[450px] h-[350px] p-5  ">
          {Array.from({ length: spinColumnNumber }, (_, i) => (
            <SpinItem
              key={i}
              symbols={symbols}
              index={indexes[i]}
              active={intervalIds[i]}
              win={win}
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
