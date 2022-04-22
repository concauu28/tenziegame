export default function Dice(props) {
  return (
    <div
      className={props.isHeld == true ? "dice-green" : "dice"}
      onClick={props.handleclick}
    >
      <h3 className="dice-num">{props.value}</h3>
    </div>
  );
}
