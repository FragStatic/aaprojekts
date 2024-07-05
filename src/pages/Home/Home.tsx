// import InitialData from "@/data/InitialData.json";
import initialData from "../../data/InitialData.json";

import useStorage from "../../components/Storage";
import { useState } from "react";

import Table from "../../components/Table";

export default function Home() {
  const { setStorage, getStorage, editTableRow, addNewRow, removeRow } =
    useStorage("data");

  const [tableData, setTableData] = useState(getStorage());

  if ("data" in localStorage) {
  } else {
    setStorage(initialData);
  }

  return (
    <main>
      <section>
        <div className="w-screen h-screen p-40">{Table(tableData)}</div>
      </section>
    </main>
  );
}
