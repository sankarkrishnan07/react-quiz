export default function Progress({max, value}) {
  return <progress className="progress" max={max} value={value}></progress>;
}
