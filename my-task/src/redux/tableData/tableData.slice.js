import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : [];

const tabelDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    add(state, { payload }) {
      const { type, text, parentId = null } = payload;

      if (type === "parent") {
        const id = +localStorage.getItem("id");
        state.push({
          text,
          id,
        });

        localStorage.setItem("id", `${id + 1}`);
        localStorage.setItem("state", JSON.stringify(state));
      } else {
        const item =
          state.find((elem) => elem.id === parentId) ??
          JSON.parse(localStorage.getItem(parentId.toString()));
        let newItem = {};
        if (!item.childrens) {
          newItem = {
            text,
            id: Number(`${parentId}1`),
            parentId,
          };
        } else {
          newItem = {
            text,
            id: item.childrens[item.childrens.length - 1] + 1,
            parentId,
          };
        }
        const newState = state.map((elem) => {
          if (elem.id === parentId) {
            return {
              ...elem,
              childrens: elem.childrens
                ? [...elem.childrens, newItem.id]
                : [newItem.id],
            };
          }
          return elem;
        });

        localStorage.setItem(
          newItem.id.toString(),
          JSON.stringify({ ...newItem, childrens: null })
        );
        localStorage.setItem("state", JSON.stringify(newState));
        return newState;
      }
    },
    remove(state, { payload }) {
      const { type, id } = payload;
      if (type === "parent") {
        const newState = state.filter((item) => item.id !== id);
        localStorage.setItem("state", JSON.stringify(state));
        return newState;
      } else {
        const newState = state.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              childrens: elem.childrens.filter((item) => item.id !== id),
            };
          }
          return elem;
        });
        localStorage.removeItem(id.toString());
        // localStorage.setItem("state", JSON.stringify(state));
        return newState;
      }
    },
    edit(state, { payload }) {
      const { type, id, text } = payload;
      if (type === "parent") {
        const newState = state.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              text,
            };
          }
          return elem;
        });
        localStorage.setItem("state", JSON.stringify(newState));
        return newState;
      } else {
        const editableItem = JSON.parse(localStorage.getItem(id.toString()));
        const newState = state.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              text,
            };
          }
          return elem;
        });

        localStorage.setItem(
          id.toString(),
          JSON.stringify({ ...editableItem, text })
        );
        return newState;
      }
    },
    showChildrens(state, { payload }) {
      const { id } = payload;
      const selectedItem = state.find((elem) => elem.id === id);
      const selectedItemIndex = state.findIndex((elem) => elem.id === id);
      const childrens = state[selectedItemIndex].childrens;
      const childrensData = childrens.map((item) => {
        return JSON.parse(localStorage.getItem(item.toString()));
      });
      const newState = [
        ...state.slice(0, selectedItemIndex),
        { ...selectedItem },
        ...childrensData,
        ...state.slice(selectedItemIndex + 1),
      ];
      return newState;
    },
    closeChildrens(state, { payload }) {
      const { id } = payload;
      const selectedItem = state.find((elem) => elem.id === id);

      const newState = state.filter(
        (elem) => !selectedItem.childrens.includes(elem.id)
      );
      return newState;
    },
  },
});

export const { add, remove, edit, showChildrens, closeChildrens } =
  tabelDataSlice.actions;
export default tabelDataSlice.reducer;
