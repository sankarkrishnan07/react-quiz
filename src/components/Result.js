import Button from "./Button";

export default function Result({
  msg,
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  return (
    <div className="app-result__wrap">
      <p className="app-result__info">{msg}</p>
      <p className="app-result">
        You socred {points} out of {totalPoints} (
        {((points / totalPoints) * 100).toFixed(0)}%)
      </p>
      <p className="app-result__highscore">(Highscore: {highScore} points)</p>
      <Button handleClick={() => dispatch({ type: "restart" })}>
        Start Over
      </Button>
    </div>
  );
}
