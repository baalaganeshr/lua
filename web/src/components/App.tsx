import React, { useState, useEffect } from "react";
import "./transition.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  const [showNUI, setShowNUI] = useState(false);
  const [Transition, setTransition] = useState("");

  useEffect(() => {
    if (showNUI) {
      setTransition("fade-swipe-enter");
      setTimeout(() => {
        setTransition("fade-swipe-enter fade-swipe-enter-active");
      }, 10); // Small delay to ensure the transition is applied
      document.body.style.overflowY = "hidden"; // Hide vertical scrollbar
      document.body.style.overflowX = "hidden"; // Hide horizontal scrollbar
    } else {
      setTransition("fade-swipe-exit");
      setTimeout(() => {
        setTransition("");
        document.body.style.overflowY = "auto"; // Restore vertical scrollbar
        document.body.style.overflowX = "auto"; // Restore horizontal scrollbar
      }, 500); // Duration of the exit transition
    }
  }, [showNUI]);

  return (
    <>
      <div className={`flex ${Transition}`}>
        <div className="absolute left-[40%] top-[42%] w-[20%] h-[20%]">
          <div className="bg-blue-500 text-center text-2xl">
            <h1>Test</h1>
            <button onClick={() => setShowNUI(!showNUI)}>Close</button>
          </div>
          <div className="relative bg-gray-500 rounded-lg w-[100%]">
            <p>NUI content goes here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
