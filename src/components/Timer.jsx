import { useState, useEffect } from "react";

export default function Timer() {
  const [timer, setTimer] = useState({
    workHours: 0,
    workMinutes: 25,
    breakHours: 0,
    breakMinutes: 5,
  });

  const [timerState, setTimerState] = useState("stopped");
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [time, setTime] = useState(
    isWorkMode ? timer.workMinutes * 60 : timer.breakMinutes * 60
  );
  const [isEditing, setIsEditing] = useState(false);

  const toggleMode = () => {
    setIsWorkMode(!isWorkMode);
  };

  const updateTargetTime = () => {
    setTime(
      isWorkMode
        ? timer.workHours * 3600 + timer.workMinutes * 60
        : timer.breakHours * 3600 + timer.breakMinutes * 60
    );
  };

  const handleEditSave = () => {
    setIsEditing(false);
    updateTargetTime();
    setTimerState("running");
  };

  const renderInputFields = (
    label,
    hoursValue,
    minutesValue,
    onHoursChange,
    onMinutesChange
  ) => (
    <div className="flex items-center">
      <input
        type="number"
        placeholder="Hours"
        className="w-16 py-2 px-3 border rounded-md"
        value={hoursValue}
        onChange={onHoursChange}
      />
      hr
      <input
        type="number"
        placeholder="Minutes"
        className="w-16 ml-2 py-2 px-3 border rounded-md"
        value={minutesValue}
        onChange={onMinutesChange}
      />
      min
    </div>
  );

  useEffect(() => {
    let intervalId;

    if (timerState === "running" && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      toggleMode();
      updateTargetTime();
    }

    return () => clearInterval(intervalId);
  }, [timerState, time]);

  const formattedTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label>{isWorkMode ? "Focus Time" : "Break Time"}</label>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <label>Edit Time</label>
          {renderInputFields(
            "Focus",
            timer.workHours,
            timer.workMinutes,
            (e) => setTimer({ ...timer, workHours: parseInt(e.target.value) }),
            (e) => setTimer({ ...timer, workMinutes: parseInt(e.target.value) })
          )}
          {renderInputFields(
            "Break",
            timer.breakHours,
            timer.breakMinutes,
            (e) => setTimer({ ...timer, breakHours: parseInt(e.target.value) }),
            (e) =>
              setTimer({ ...timer, breakMinutes: parseInt(e.target.value) })
          )}
        </div>
      ) : null}

      {isEditing ? (
        <button
          onClick={handleEditSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      ) : (
        <div>
          <p>{`Countdown: ${formattedTime()}`}</p>
          <p>{`Upcoming ${isWorkMode ? "Break" : "Focus"} Time: ${
            isWorkMode
              ? timer.breakHours + "h " + timer.breakMinutes + "m"
              : timer.workHours + "h " + timer.workMinutes + "m"
          }`}</p>
          <div className="mb-4">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit Time
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        {timerState === "stopped" && !isEditing ? (
          <button
            onClick={() => {
              updateTargetTime();
              setTimerState("running");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setTimerState("stopped");
              setTime(
                isWorkMode ? timer.workMinutes * 60 : timer.breakMinutes * 60
              );
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
