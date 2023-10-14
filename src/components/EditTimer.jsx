import { useState, useEffect } from "react";

function EditTimerSection({
  timer,
  setTimer,
  isWorkMode,
  handleEditSave,
  renderInputFields,
}) {
  return (
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
        (e) => setTimer({ ...timer, breakMinutes: parseInt(e.target.value) })
      )}
      <button
        onClick={handleEditSave}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
}
