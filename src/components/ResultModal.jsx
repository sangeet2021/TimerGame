import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom"

const ResultModal = forwardRef(
  ({ onReset, targetTime, remainingTime }, ref) => {
    const dialog = useRef();
    console.log(remainingTime);
    const userLost = remainingTime <= 0;
    const formatRt = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });
    return createPortal(
      <dialog className="result-modal" ref={dialog} onClose={onReset}>
        {userLost && <h2>You lost</h2>}
        {!userLost && <h2>Your score {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds </strong>
        </p>
        <p>
          You stopped the timer with <strong> {formatRt} seconds left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
