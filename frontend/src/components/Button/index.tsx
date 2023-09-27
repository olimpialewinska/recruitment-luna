interface IEditButtonProps {
  available: boolean;
  text?: string;
  onClick: () => void;
}

export const Button = (props: IEditButtonProps) => {
  return (
    <button
      onClick={props.available ? props.onClick : () => {}}
      disabled={!props.available}
      className={`font-bold py-2 px-4 rounded uppercase ${
        props.available
          ? "bg-green-400 hover:bg-green-300 ease-in-out transition-all cursor-pointer"
          : "bg-slate-300  cursor-not-allowed"
      }`}
    >
      {props.text ? props.text : "Edit"}
    </button>
  );
};
