import { createContext, useState, useEffect, useContext, useMemo } from "react";
import ItemBridge from "../bridges/ItemBridge";
import useAlert from "./AlertContext";
import { Item } from "@models/Item";
import PropTypes from "prop-types";
import { useAuthStore } from "../store/AuthStore";

const ItemContext = createContext();

export default () => {
  return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
  const { setAlert } = useAlert();
  const loged = useAuthStore((state) => state.loged);
  const [items, setItems] = useState([]);
  const [itemsReady, setItemsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCreateItem = async (item) => {
    try {
      const response = await ItemBridge.createItem(item);
      setItems([...items, response.data]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleUpdateItem = async (item) => {
    try {
      const response = await ItemBridge.updateItem(item);
      setItems((before) => [
        ...before.filter((it) => it._id !== response.data._id),
        response.data,
      ]);
      return response.data;
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      await ItemBridge.deleteItem(item._id);
      setItems((before) => [...before.filter((it) => it._id !== item._id)]);
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
    }
  };

  useEffect(() => {
    if (!loged) return;
    const timeout = setTimeout(async () => {
      try {
        const response = await ItemBridge.getItems();
        setItems(response.data);
        setTimeout(() => setItemsReady(true), 1000);
      } catch (error) {
        console.log(error);
        setAlert({ type: "error", msg: error.message });
        setItems([]);
      }

      // setLoading(false);
    }, 25);

    return () => clearTimeout(timeout);
  }, [loged]);

  const contextValue = useMemo(
    () => ({
      Item,
      items,
      itemsReady,
      handleCreateItem,
      handleUpdateItem,
      handleDeleteItem,
    }),
    [items, itemsReady]
  );

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};

ItemProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
