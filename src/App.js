import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Welcome from "./components/Welcome";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Question from "./components/Question";
import Button from "./components/Button";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import Result from "./components/Result";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  status: "loading",
  errorMsg: null,
  questions: null,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return { ...state, status: "error", errorMsg: action.payload };
    case "ready":
      return { ...state, status: "ready", questions: action.payload };
    case "start":
      return {
        ...state,
        status: "start",
        secsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case "tick":
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        status: state.secsRemaining === 0 ? "completed" : state.status,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
        highScore:
          state.points + question.points > state.highScore
            ? state.points + question.points
            : state.highScore,
      };
    case "nextQuestion":
      if (state.index >= state.questions.length) return state;
      return { ...state, index: state.index + 1, answer: null };
    case "completed":
      return {
        ...state,
        status: "completed",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [
    {
      status,
      errorMsg,
      questions,
      index,
      answer,
      points,
      highScore,
      secsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok)
          return dispatch({
            type: "error",
            payload:
              "Error occured in fetching the questions, please try again after sometime.",
          });
        const data = await res.json();
        if (data === null || data.length === 0)
          return dispatch({
            type: "error",
            payload: "No data found",
          });

        dispatch({ type: "ready", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }

    fetchData();
  }, []);

  const noq = questions?.length;
  const totalPoints = questions?.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const question = questions?.[index];

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error>{errorMsg}</Error>}
        {status === "ready" && <Welcome noq={noq} dispatch={dispatch} />}
        {status === "start" && (
          <>
            <MainHeader
              noq={noq}
              index={index}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={question}
              answer={answer}
              index={index}
              dispatch={dispatch}
            />
            <MainFooter>
              <Timer
                timeLeft={secsRemaining}
                handleTimer={() =>
                  dispatch({
                    type: "tick",
                  })
                }
              />
              {answer !== null && (
                <Button
                  handleClick={() =>
                    dispatch({
                      type: index === noq - 1 ? "completed" : "nextQuestion",
                    })
                  }
                  style={`app-main__footer-btn`}
                >
                  {index === noq - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </MainFooter>
          </>
        )}
        {status === "completed" && (
          <Result
            msg={`${
              secsRemaining === -1 ? "TIME OUT!" : ""
            } Thank you for taking the assessment`}
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
