import { FetchError } from "ofetch";

export default function useValibotErrorHandler(errorsState: Ref) {
  return (e: FetchError) => {
    errorsState.value = e.data.data.nested;
  };
}
