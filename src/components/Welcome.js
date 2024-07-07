import Button from "./Button";

export default function Welcome({ noq, dispatch }) {
  return (
    <div className="app-welcome">
      <h3 className="app-welcome__title">Welcome to the React Quiz!</h3>
      <p className="app-welcome__para">
        {noq} questions to test your React Mastery
      </p>
      <Button handleClick={() => dispatch({ type: "start" })}>
        Let's Begin!
      </Button>
    </div>
  );
}
