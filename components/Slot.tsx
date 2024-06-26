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
        setPressed(false);
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
  };

  return (
    <>
      <div className="bg-metal-gradient-vertical shadow-metal relative mr-16 ">
        <div className="absolute w-16 h-40 -right-16 bottom-16 mechanism  ">
          {" "}
          <div
            className={clsx(
              pressed && "pressed",
              "holder absolute w-14  h-8 rounded-r-sm  bg-metal-gradient-horizontal shadow-metal bottom-0"
            )}
          >
            <button
              onClick={() => {
                setPressed(true);
                handleSpin();
              }}
              className={clsx(
                pressed && "pressed",
                "arm absolute w-3 h-28 bg-metal-gradient-vertical shadow-metal rounded-b-sm bottom-6 left-10   before:w-7 before:h-7 before:bg-circle-gradient before:shadow:metal before:rounded-full "
              )}
            ></button>
          </div>
        </div>
        <div className=" wrapper overflow-hidden relative flex items-center justify-center m-5 w-frame-small md:w-frame-medium h-frame-small md:h-frame-medium p-5  ">
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
        </div>
      </div>
      {win && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
};
export default Slot;
