import "./styles.css";

export default function Loader() {
  return (
    <div className='lds-container'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
