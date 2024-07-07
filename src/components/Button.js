export default function Button({ children, handleClick, style="", disabled }) {
  return (
    <button className={`btn ${style}`} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}
