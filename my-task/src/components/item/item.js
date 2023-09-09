import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChildrens,
  remove,
  showChildrens,
} from "../../redux/tableData/tableData.slice";
import CreateItem from "../createItem/createItem";

import "./item.css";

export default function Item({ id, text, arrow = false }) {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.tableData);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openChildren, setOpenChildren] = useState(true);
  const [parentId, setParentId] = useState();

  const handleEdit = () => {
    setIsEdit(true);
    setOpenCreateModal(true);
  };

  const handleAdd = (id) => {
    setParentId(id);
    setIsEdit(false);
    setOpenCreateModal(true);
  };

  const handleShowChildren = (id) => {
    dispatch(showChildrens({ id }));
    setOpenChildren((prev) => !prev);
  };

  const handleCloseChildren = (id) => {
    dispatch(closeChildrens({ id }));
    setOpenChildren((prev) => !prev);
  };

  const handleRemove = () => {
    const functionProps = {
      type: tableData.find((elem) => elem.id === id) ? "parent" : "children",
      id,
    };
    dispatch(remove({ ...functionProps }));
  };
  return (
    <div className="tableItem">
      {openCreateModal && (
        <CreateItem
          isOpen={openCreateModal}
          setIsOpen={setOpenCreateModal}
          elementId={id}
          defaultValue={text}
          isEdit={isEdit}
          parentId={id}
        />
      )}
      <div className="contentBlock">
        {arrow && (
          <div
            onClick={() =>
              openChildren ? handleShowChildren(id) : handleCloseChildren(id)
            }
          >
            {openChildren ? "open" : "close"}
          </div>
        )}
        <div>{id}</div>
        <div>{text}</div>
      </div>
      <div className="buttons">
        <div className="button" onClick={handleEdit}>
          Edit
        </div>
        <div className="button" onClick={handleRemove}>
          Remove
        </div>
        <div className="button" onClick={handleAdd}>
          Add +
        </div>
      </div>
    </div>
  );
}
