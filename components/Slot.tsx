import React, { useEffect, useState } from "react";

import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols = ["⭐", "🔔", "🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🔔"];
  const initialIntervalIds = [undefined, undefined, undefined];
  const [spinColumnNumber, setSpinColumnNumber] = useState<any>(3);
  const initialIndexes = [2, 4, 6];
  const [indexes, setIndexes] = useState(initialIndexes);
  const [remainingTime, setRemainingTime] = useState([2, 4, 6]);
  const [intervalIds, setIntervalIds] =
    useState<(number | NodeJS.Timeout | undefined)[]>(initialIntervalIds);
  const calcRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  //   const initialIndexes = Array.from({ length: spinColumnNumber }, () =>
  //     calcRandomNumber(2, symbols.length - 3)
  //   );

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
  };

  const initiliazeIndex = (index: number) => {
    console.log("get init index:", index, "to be index", initialIndexes[index]);
    setIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = 2;
      return newIndexes;
    });
  };
  const initiliazeRemainingTime = (index: number) => {
    setRemainingTime((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index] = 10;
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
    if (remainingTime[0] === 0) {
      initiliazeRemainingTime(0);
      initialiazeIntervalIds(0);
    }
    if (remainingTime[1] === 0) {
      initiliazeRemainingTime(1);
      initialiazeIntervalIds(1);
    }
    if (remainingTime[2] === 0) {
      initiliazeRemainingTime(2);
      initialiazeIntervalIds(2);
    }
    console.log(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (indexes[0] === symbols.length - 1) {
      initiliazeIndex(0);
    }
    if (indexes[1] === symbols.length - 1) {
      initiliazeIndex(1);
    }
    if (indexes[2] === symbols.length - 1) {
      initiliazeIndex(2);
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
      <button className="z-50" onClick={handleSpin}>
        {" "}
        Start
      </button>
      <input
        type="select"
        value={spinColumnNumber}
        onChange={(e) => setSpinColumnNumber(e.target.value)}
      />
      <div className="bg-stone-300">
        <div className=" wrapper relative flex items-center justify-center overflow-hidden m-5 w-[450px] h-[350px] p-5 ">
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
    </>
  );
};
export default Slot;
