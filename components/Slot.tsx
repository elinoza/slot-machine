import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Confetti from "react-confetti";
import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🔔"];
  const [spinColumnNumber, setSpinColumnNumber] = useState<any>(3);
  const initialIntervalIds = [undefined, undefined, undefined];
  const initialIndexes = [2, 3, 4];
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
  const [pressed, setPressed] = useState<boolean>(false);

  const calcRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const spin = (index: number) => {
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
      newIndexes[index] = 0;
      return newIndexes;
    });
  };

  const initializeRemainingTime = (index: number) => {
    const randomRemainingTime = calcRandomNumber(5, 15);
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
      if (newWinnerSymbols.every((index) => index !== null)) {
      }
      return newWinnerSymbols;
    });
  };

  useEffect(() => {
    const handleRemainingTime = (index: number) => {
      if (remainingTime[index] === 0) {
        initializeRemainingTime(index);
        initialiazeIntervalIds(index);
      }
    };
    Array.from({ length: spinColumnNumber }, (_, i) => handleRemainingTime(i));
  }, [remainingTime, spinColumnNumber]);

  useEffect(() => {
    Array.from({ length: spinColumnNumber }, (_, i) => {
      if (indexes[i] === symbols.length - 1) {
        initializeIndex(i);
      }
    });
  }, [indexes, spinColumnNumber, symbols.length]);

  const handleSpin = () => {
    setWin(false);
    Array.from({ length: spinColumnNumber }, (_, i) => {
      initialiazeIntervalIds(i);
      initialiazeIntervalIds(i);
      initializeWinnerIndexes(i);
      spin(i);
    });
    setTimeout(() => {
      setPressed(false);
    }, 1002);
  };

  return (
    <>
      <div className="absolute w-10 h-20 -right-10 md:w-16 md:h-40 md:-right-16 bottom-16 mechanism  ">
        {" "}
        <div
          className={clsx(
            pressed && "pressed",
            "holder absolute w-6 h-8 md:w-10 md:h-12 rounded-r-sm  bg-metal-gradient-horizontal shadow-metal bottom-0"
          )}
        ></div>
        <button
          onClick={() => {
            setPressed(true);
            handleSpin();
          }}
          className={clsx(
            pressed && "pressed",
            "arm absolute w-2 md:w-3  h-12 md:h-28 bg-metal-gradient-vertical shadow-metal rounded-b-sm  bottom-7 md:bottom-10 left-3 md:left-5 before:w-5 before:h-5 before:top-[-1.1rem] before:left-[-0.35rem] before:md:top-[-1rem] before:md:left-[-0.5rem] before:md:w-7 before:md:h-7 before:bg-circle-gradient before:shadow:metal before:rounded-full "
          )}
        ></button>
      </div>
      <div className=" bg-black shadow-metal relative mr-16 w-frame-small md:w-frame-medium h-frame-small md:h-frame-medium ">
        <div className=" wrapper relative flex items-center justify-center w-full h-full  ">
          {" "}
          {Array.from({ length: spinColumnNumber }, (_, i) => (
            <SpinItem
              key={i}
              spinColumnIndex={i}
              symbols={symbols}
              index={indexes[i]}
              active={intervalIds[i]}
              win={win}
              handleWinnerIndex={handleWinnerIndex}
            />
          ))}
        </div>{" "}
      </div>
      {win && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
};
export default Slot;
