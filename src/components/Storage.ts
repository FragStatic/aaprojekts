import { useState } from "react";
import initialTableData from "../data/InitialData.json";

export type TableData = {
  first_name: string;
  last_name: string;
  email: string;
  race: string;
  ip_address: string;
};

export default function useStorage(key: string) {
  const [storedArray, setStoredArray] = useState<TableData[]>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  });

  function setStorage(value: Array<TableData>) {
    setStoredArray(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getStorage() {
    return storedArray;
  }

  function editTableRow(key: number, newValue: string, objectDataKey: string) {
    const updatedArray = storedArray.map((oldValue, arrayKey) =>
      arrayKey === key ? { ...oldValue, [objectDataKey]: newValue } : oldValue
    );
    setStorage(updatedArray);
  }

  function resetStorage() {
    localStorage.removeItem("key");
    setStorage(initialTableData);
  }

  function addNewRow(newValue: TableData) {
    storedArray.push(newValue);
    setStorage(storedArray);
  }

  function removeRow(key: number) {
    storedArray.splice(key, 1);
    setStorage(storedArray);
  }

  return {
    setStorage,
    getStorage,
    editTableRow,
    resetStorage,
    addNewRow,
    removeRow,
  };
}
