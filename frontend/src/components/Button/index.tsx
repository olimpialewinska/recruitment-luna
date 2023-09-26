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
      className={
        props.available
          ? "bg-green-400 hover:bg-green-300 font-bold py-2 px-4 rounded ease-in-out transition-all uppercase cursor-pointer"
          : "bg-slate-300 font-bold py-2 px-4 rounded uppercase cursor-not-allowed"
      }
    >
      {props.text ? props.text : "Edit"}
    </button>
  );
};
