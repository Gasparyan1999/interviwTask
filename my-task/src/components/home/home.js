import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../item/item";
import CreateItem from "../createItem/createItem";

import "./home.css";

export default function Home() {
  const tableData = useSelector((state) => state.tableData);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      localStorage.setItem("id", 101);
    }
  }, []);

  return (
    <div className="App">
      {openCreateModal && (
        <CreateItem isOpen={openCreateModal} setIsOpen={setOpenCreateModal} />
      )}
      <div
        className="addButton"
        onClick={() => setOpenCreateModal((prev) => !prev)}
      >
        +
      </div>
      <div className="content">
        {tableData.map((item) => {
          return (
            <Item
              parentId={item.parentId}
              id={item.id}
              text={item.text}
              key={item.id}
              arrow={item.childrens && item.childrens.length}
            />
          );
        })}
      </div>
    </div>
  );
}
