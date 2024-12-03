import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { useRef, useEffect, useState } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const time = useRef();
  const [trapsCount, setTrapsCount] = useState(
    useGame((state) => state.trapsCount)
  );

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  function setDifficulty(trapsCount) {
    useGame.setState({ trapsCount });
    setTrapsCount(trapsCount);
  }

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);
  return (
    <div className="interface">
      <div ref={time} className="time" />

      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          RESTART
        </div>
      )}

      {phase === "ready" && (
        <div className="difficulty">
          <p
            className={`${trapsCount == 50 ? "p-active" : ""}`}
            onClick={() => {
              setDifficulty(50);
            }}
          >
            EXTREME
          </p>
          <p
            className={`${trapsCount == 15 ? "p-active" : ""}`}
            onClick={() => setDifficulty(15)}
          >
            DEFAULT
          </p>
          <p
            className={`${trapsCount == 5 ? "p-active" : ""}`}
            onClick={() => setDifficulty(5)}
          >
            EASY
          </p>
        </div>
      )}

      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
