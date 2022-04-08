import { Api } from "./api";

export const useApi = (
  accessToken?: string,
  errorHandler?: (message: string) => void
) => {
  const errorNotification = (message: string) => {
    console.log("Error notification", message);
  };

  const noAuthRedirection = (url: string) => {
    console.log(
      `Unauthorized on api call ${url} from page (${window.location.href})`
    );
  };

  return {
    api: new Api(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "/api/",
      errorHandler || errorNotification,
      noAuthRedirection,
      accessToken
    ),
  };
};
