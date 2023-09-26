import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen bg-slate-300"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{errorMessage}</p>
      <Link
        to="/"
        className="font-bold cursor-pointer hover:text-gray-600 transition-all ease-in-out"
      >
        Go back to the home page
      </Link>
    </div>
  );
}
