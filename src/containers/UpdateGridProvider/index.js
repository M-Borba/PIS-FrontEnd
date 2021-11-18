import React, { useRef, createContext } from "react";
import propTypes from "prop-types";

export const UpdateGridContext = createContext();

UpdateGridProvider.propTypes = {
  children: propTypes.any,
};

export default function UpdateGridProvider(props) {
  const removeRow = useRef(undefined);
  const editRow = useRef(undefined);
  return (
    <UpdateGridContext.Provider value={[removeRow, editRow]}>
      {props.children}
    </UpdateGridContext.Provider>
  );
}
