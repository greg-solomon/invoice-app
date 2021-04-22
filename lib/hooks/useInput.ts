import React from "react";

type InputHandlers = {
  set: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  clear: () => void;
};

function useInput(initialState = ""): [string, InputHandlers] {
  const [value, setValue] = React.useState(initialState);

  const handlers = React.useMemo(
    () => ({
      set: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
      reset: () => {
        setValue(initialState);
      },
      clear: () => {
        setValue("");
      },
    }),
    [value, setValue]
  );

  return [value, handlers];
}

export { useInput };
