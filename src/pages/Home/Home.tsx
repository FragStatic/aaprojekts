// import InitialData from "@/data/InitialData.json";
import initialData from "../../data/InitialData.json";

import useStorage from "../../components/Storage";
import { useState } from "react";

import Table from "../../components/Table";

export default function Home() {
  const { setStorage, getStorage } = useStorage("data");

  const [tableData] = useState(getStorage());

  if ("data" in localStorage) {
  } else {
    setStorage(initialData);
  }

  return <section className="px-40 pt-16 pb-8">{Table(tableData)}</section>;
}
