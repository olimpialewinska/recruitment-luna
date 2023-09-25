interface IEditButtonProps {
  available: boolean;
  onClick: () => void;
}

export const EditButton = (props: IEditButtonProps) => {
  return (
    <button
      onClick={props.available ? props.onClick : () => {}}
      className={
        props.available
          ? "bg-green-400 hover:bg-green-300 font-bold py-2 px-4 rounded ease-in-out transition-all uppercase cursor-pointer"
          : "bg-slate-300 font-bold py-2 px-4 rounded uppercase cursor-not-allowed"
      }
    >
      Edit
    </button>
  );
};
