import { useEffect, useRef, useState } from "react";

function SpeedTyping() {
  const [text, setText] = useState();
  const [timeRemaing, setTimeRemaing] = useState(8);
  const [isTime, setIstime] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef("");
  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }
  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== " ").length;
  }
  function StartGame() {
    setIstime(true);
    setTimeRemaing(8);
    setText("");
    setWordCount(0);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }
  function Endgame() {
    setIstime(false);
    const numWords = calculateWordCount(text);
    setWordCount(numWords);
  }
  useEffect(() => {
    if (isTime && timeRemaing > 0) {
      setTimeout(() => {
        setTimeRemaing((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaing === 0) {
      Endgame();
    }
  }, [timeRemaing, isTime]);

  return (
    <>
      <h2>Speed Typing </h2>
      <textarea
        ref={textBoxRef}
        rows="11"
        cols="55"
        onChange={handleChange}
        value={text}
        disabled={!isTime}
      />
      <h4>Time remainning:{timeRemaing} </h4>
      <button onClick={StartGame} disabled={isTime}>
        Start Game
      </button>
      <h1>Total Word Count:{wordCount} </h1>
    </>
  );
}
export default SpeedTyping;
