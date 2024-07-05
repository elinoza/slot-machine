import React, { useEffect, useState } from "react";
import clsx from "clsx";

import Confetti from "react-confetti";
import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols: string[] = ["❤️️", "🎓", "💵", "💪", "🍀", "🤝", "💼"];
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
    if (symbols.length % 2 === 0) {
      console.error(
        "Please provide one more symbol or delete one of the symbols.Symbols array must be an odd number"
      );
    }
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
    }, 1000);
  };

  return (
    <>
      <div className="shadow-metal bg-gold-gradient-horizontal relative led mr-10 md:mr-16 ">
        <div className="header overflow-hidden led absolute -top-36 w-full drop-shadow-md flex flex-col items-center justify-end rounded-t-full p-4 bg-red-700 h-36 left-0 right-0  md:text-4xl text-2xl  ">
          {" "}
          <div className="h-60 w-full flex items-center justify-center relative p-2">
            {" "}
            <span className=" absolute overflow-hidden flex flex-wrap items-center justify-between w-[50%] h-full gap-2 p-1">
              {" "}
              {Array.from({ length: 20 }, (_, i) => (
                <span
                  key={i}
                  className=" bg-red-400 w-1 h-1 rounded-full lamps"
                ></span>
              ))}
            </span>{" "}
          </div>
          <h1 className="bg-gradient-to-r drop-shadow-md from-[#B8860B] via-[#FFD700] to-[#B8860B] text-transparent bg-clip-text">
            LUCKY SPINS
          </h1>
        </div>
        <div className="flex items-center justify-around ">
          <span className="flex flex-col items-center  justify-between flex-wrap gap-3 p-2 ">
            {Array.from({ length: 4 }, (_, i) => (
              <span
                key={i}
                className=" bg-red-400 w-5 h-5 rounded-full lamps"
              ></span>
            ))}
          </span>{" "}
          <div className="wrapper rounded-3xl overflow-hidden mt-6  before:border-l-[12px] before:border-r-[12px] relative  w-frame-small  md:w-frame-medium h-frame-small md:h-frame-medium ">
            <span className="absolute w-[90%] h-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-body-gradient-horizontal overflow-hidden flex items-center justify-center shadow-[ 0 60px 60px rgba(0, 0, 0, 1), 0 -60px 60px rgba(0, 0, 0, 1)]">
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
            </span>
          </div>
          <span className="flex flex-col items-center  justify-between flex-wrap gap-3 p-2 ">
            {Array.from({ length: 4 }, (_, i) => (
              <span
                key={i}
                className=" bg-red-400 w-5 h-5 rounded-full lamps"
              ></span>
            ))}
          </span>{" "}
        </div>

        <div className="h-52 w-full flex items-center justify-center relative ">
          {" "}
          <span className=" absolute overflow-hidden  bottom-0 lamp-wrapper flex flex-wrap items-center justify-between w-[100%] h-[85%] gap-2 p-5">
            {" "}
            {Array.from({ length: 40 }, (_, i) => (
              <span
                key={i}
                className=" bg-red-400 w-1 h-1 rounded-full lamps"
              ></span>
            ))}
          </span>{" "}
        </div>

        <div className="mechanism absolute w-10 h-20 -right-10 md:w-16 md:h-40 md:-right-16 bottom-52">
          {" "}
          <div
            className={clsx(
              pressed && "pressed",
              "holder bg-metal-gradient-horizontal absolute w-6 h-12 md:w-10 md:h-12 rounded-r-sm  shadow-metal bottom-0"
            )}
          ></div>
          <button
            onClick={() => {
              setPressed(true);
              handleSpin();
            }}
            className={clsx(
              pressed && "pressed",
              "arm absolute w-2 md:w-3  h-36 bg-metal-gradient-vertical  shadow-metal rounded-b-sm  bottom-7 md:bottom-10 left-3 md:left-5 before:w-5 before:h-5 before:top-[-1.1rem] before:left-[-0.35rem] before:md:top-[-1rem] before:md:left-[-0.5rem] before:md:w-7 before:md:h-7 before:bg-circle-gradient before:shadow:metal before:rounded-full "
            )}
          ></button>
        </div>
      </div>
      {win && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
};
export default Slot;
