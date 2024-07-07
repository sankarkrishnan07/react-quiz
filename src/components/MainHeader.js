import Progress from "./Progress";

export default function MainHeader({ noq, index, points, totalPoints }) {
  return (
    <div className="app-main__header-wrap">
      <Progress max={noq} value={index+1} />
      <div className="app-main__header">
        <p className="app-main__header-question">
          Question: {index + 1}/{noq}
        </p>
        <p className="app-main__header-points">
          {points}/{totalPoints} points
        </p>
      </div>
    </div>
  );
}
