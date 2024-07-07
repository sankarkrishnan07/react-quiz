import Button from "./Button";

export default function Question({ question, answer, index, dispatch }) {
  return (
    <div className="app-question__wrap">
      <p className="app-question">
        {`${index + 1}. `}
        {question.question}
      </p>
      <div className="app-answer__wrap">
        {question.options.map((option, i) => (
          <Button
            key={option}
            handleClick={() =>
              dispatch({
                type: "newAnswer",
                payload: i,
              })
            }
            style={`app-answer ${
              answer !== null
                ? i === question.correctOption
                  ? "correct"
                  : "incorrect"
                : ""
            } ${answer !== null && i === answer ? "active" : ""}`}
            disabled={answer!==null}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
