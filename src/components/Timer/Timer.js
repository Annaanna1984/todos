import React, { useContext } from "react";
import { Context } from "../TodoApp";
import PropTypes from "prop-types";

const Timer = (props) => {
  const { id, time } = props;
  const { onTimerToggle } = useContext(Context);

  const formatTime = () => {
    let min = Math.floor(time / 60);
    let sec = time - min * 60;

    if (min < 10 && min >= 0) min = `0${min}`;
    if (sec < 10 && sec >= 0) sec = `0${sec}`;

    return `${min}:${sec}`;
  };
  return (
    <span className="description">
      <button
        className="icon icon-play"
        onClick={() => {
          onTimerToggle(id, false);
        }}
      ></button>
      <button
        className="icon icon-pause"
        onClick={() => {
          onTimerToggle(id, true);
        }}
      ></button>
      <span className="new-todo-form__timer">{formatTime()}</span>
    </span>
  );
};

export default Timer;

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
