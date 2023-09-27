import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Close from "../../assets/close.svg";

interface IModalProps {
  open: boolean;
  data: IFormInput | undefined;
  onClose: (data: IFormInput | undefined) => void;
}

interface IFormInput {
  name: string;
  description: string;
  targetTemperature: number;
}

export const Modal = (props: IModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: props.data,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    reset(data);
    props.onClose(data);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      reset();
      props.onClose(undefined);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-screen h-screen flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: props.open ? "flex" : "none",
      }}
      data-testid="modal-body"
      onClick={(e) => handleOverlayClick(e)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-8 flex flex-col gap-4 w-96 relative"
        id="modal-body"
      >
        <img
          src={Close}
          alt="close"
          width={24}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleOverlayClick}
        />
        <h1 className="text-xl font-bold">Edit Module</h1>
        <div className="flex flex-col">
          <label
            className={`text-sm font-bold ${errors.name ? "text-red-400" : ""}`}
            htmlFor="name"
          >
            {errors.name ? "Name is required" : "Name"}
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            className="border-2 border-gray-400 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label
            className={`text-sm font-bold ${
              errors.description ? "text-red-400" : ""
            }`}
            htmlFor="description"
          >
            {errors.description ? "Description is required" : "Description"}
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            placeholder="Description"
            rows={5}
            className="border-2 border-gray-400 rounded-md p-2 resize-y"
          />
        </div>
        <div className="flex flex-col">
          <label
            className={`text-sm font-bold ${
              errors.targetTemperature ? "text-red-400" : ""
            }`}
            htmlFor="targetTemperature"
          >
            {errors.targetTemperature
              ? "Target Temperature must be between 0 and 40"
              : "Target Temperature"}
          </label>
          <input
            id="targetTemperature"
            type="number"
            {...register("targetTemperature", {
              required: true,
              min: 0,
              max: 40,
              valueAsNumber: true,
            })}
            placeholder="Target Temperature"
            className="border-2 border-gray-400 rounded-md p-2"
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="bg-green-400 hover:bg-green-300 font-bold py-2 px-4 rounded ease-in-out transition-all uppercase cursor-pointer"
        />
      </form>
    </div>
  );
};
