import React, { useEffect, useState } from "react";

import SpinItem from "./SpinItem";

const Slot = () => {
  const symbols = ["⭐", "🔔", "🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🔔"];
  const initialIntervalIds = [undefined, undefined, undefined];
  const [spinColumnNumber, setSpinColumnNumber] = useState<any>(3);
  const [indexes, setIndexes] = useState([2, 4, 6]);
  const [remainingTime, setRemainingTime] = useState<number>(10);
  const [intervalIds, setIntervalIds] =
    useState<(number | NodeJS.Timeout | undefined)[]>(initialIntervalIds);
  const calcRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const initialIndexes = Array.from({ length: spinColumnNumber }, () =>
    calcRandomNumber(2, symbols.length - 3)
  );

  const spin = (index: number) => {
    const randomNumber = calcRandomNumber(50, 150);
    const newIntervalId = setInterval(() => {
      setRemainingTime((prev) => {
        return prev - 1;
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

  useEffect(() => {
    if (remainingTime === 0) {
      setIntervalIds(initialIntervalIds);
      clearInterval(intervalIds[0]);
      clearInterval(intervalIds[1]);
      clearInterval(intervalIds[2]);
      setRemainingTime(10);
    } else {
    }
  }, [remainingTime]);

  useEffect(() => {
    if (
      indexes[0] === symbols.length - 4 ||
      indexes[1] === symbols.length - 4 ||
      indexes[2] === symbols.length - 4
    ) {
      setIndexes([2, 4, 6]);
    }
  }, [indexes]);

  const handleSpin = () => {
    clearInterval(intervalIds[0]);
    clearInterval(intervalIds[1]);
    clearInterval(intervalIds[2]);
    Array.from({ length: spinColumnNumber }, (_, i) => spin(i));
  };

  return (
    <>
      <button onClick={handleSpin}> Start</button>
      <input
        type="select"
        value={spinColumnNumber}
        onChange={(e) => setSpinColumnNumber(e.target.value)}
      />
      <div className="flex items-center justify-center m-5">
        {Array.from({ length: spinColumnNumber }, (_, i) => (
          <SpinItem key={i} symbols={symbols} index={indexes[i]} />
        ))}
      </div>
    </>
  );
};
export default Slot;
