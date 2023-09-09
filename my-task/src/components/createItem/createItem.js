import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, edit } from "../../redux/tableData/tableData.slice";
import "./createItem.css";

export default function CreateItem({
  setIsOpen,
  elementId = null,
  isEdit = false,
  parentId = null,
  defaultValue = "",
}) {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.tableData);
  const [text, setText] = useState(isEdit ? defaultValue : "");

  const handleSave = () => {
    if (isEdit) {
      const functionProps = {
        type: tableData.find((elem) => elem.id === elementId)
          ? "parent"
          : "childrn",
        id: elementId,
        text,
      };
      dispatch(edit({ ...functionProps }));
    } else {
      const functionProps = {
        type: parentId ? "children" : "parent",
        text,
        parentId,
      };
      dispatch(add({ ...functionProps }));
    }
    setIsOpen(false)
  };

  return (
    <div className="inputContainer">
      <input
        placeholder="Write the text"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button" onClick={handleSave}>
        Save
      </div>
      <div
        className="button"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Close
      </div>
    </div>
  );
}
