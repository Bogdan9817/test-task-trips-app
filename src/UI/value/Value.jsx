import "./styles.css";

export default function Value({ value, label }) {
  return (
    <span className='value-container'>
      {label}: <b>{value}</b>
      <br />
    </span>
  );
}
