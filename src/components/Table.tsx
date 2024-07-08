import { useState } from "react";
import useStorage from "./Storage";
import { TableData } from "./Storage";
import deleteSvg from "../images/delete.svg";
import plusSvg from "../images/plus.svg";

enum ObjectDataKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  EMAIL = "email",
  RACE = "race",
  IP_ADDRESS = "ip_address",
}

const initialRowData = {
  first_name: "",
  last_name: "",
  email: "",
  race: "",
  ip_address: "",
};

const TableHeaders = ["Vārds", "Uzvārds", "E-pasts", "Rase", "IP adrese"];

function Table(data: TableData[]) {
  const { editTableRow, addNewRow, removeRow } = useStorage("data");
  const [searchTerm, setSearchTerm] = useState("");
  const [editableData, setEditableData] = useState(data);
  const [editing, setEditing] = useState({ row: 0, column: "" });
  const [newRowData, setNewRowData] = useState(initialRowData);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = editableData.filter((data: TableData) =>
    Object.values(data).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangeItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  };

  function isLastPage() {
    if (pageNumber === Math.ceil(filteredData.length / itemsPerPage)) {
      return true;
    }
    return false;
  }

  const handlePageNumberAdd = (pageNumber: number) => {
    if (!isLastPage()) {
      setPageNumber(pageNumber);
    }
  };

  const handlePageNumberSubtract = (pageNumber: number) => {
    if (!(pageNumber < 1)) {
      setPageNumber(pageNumber);
    }
  };

  const handleNewRowDataChange = (dataType: string, data: string) => {
    setNewRowData({ ...newRowData, [dataType]: data });
  };

  const handleNewRowSubmit = () => {
    if (Object.values(newRowData).some((value) => value === "")) {
      alert("Visi lauki nav aizpildīti");
    } else {
      setEditableData([...editableData, newRowData]);
      addNewRow(newRowData);
      setNewRowData(initialRowData);
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const handleRemoveRow = (rowkey: number) => {
    const updatedData = editableData.filter(
      (_: TableData, key: number) => key !== rowkey
    );
    removeRow(rowkey);
    setEditableData(updatedData);
  };

  const handleEdit = (rowIndex: number, columnKey: string) => {
    setEditing({ row: rowIndex, column: columnKey });
  };

  const handleChange = (rowIndex: number, columnKey: string, value: string) => {
    const updatedData = editableData.map((data: TableData, index: number) =>
      index === rowIndex ? { ...data, [columnKey]: value } : data
    );
    setEditableData(updatedData);
    editTableRow(rowIndex, value, columnKey);
  };

  const handleBlur = () => {
    setEditing({ row: 0, column: "" });
  };

  return (
    <div>
      <div className="inline-flex justify-between w-full">
        <input
          className="border border-primary bg-secondary h-8 w-40 p-4 text-xl rounded-md self-end"
          type="text"
          placeholder="Meklēt..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          <input
            className="border border-primary bg-secondary h-8 w-40 mr-2 p-4 text-xl rounded-md"
            value={newRowData.first_name}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.FIRST_NAME, e.target.value)
            }
            placeholder="Vārds"
          />
          <input
            className="border border-primary bg-secondary h-8 w-40 mr-2 p-4 text-xl rounded-md"
            value={newRowData.last_name}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.LAST_NAME, e.target.value)
            }
            placeholder="Uzvārds"
          ></input>
          <input
            className="border border-primary bg-secondary h-8 w-40 mr-2 p-4 text-xl rounded-md"
            value={newRowData.email}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.EMAIL, e.target.value)
            }
            placeholder="E-pasts"
          />
          <input
            className="border border-primary bg-secondary h-8 w-40 mr-2 p-4 text-xl rounded-md"
            value={newRowData.race}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.RACE, e.target.value)
            }
            placeholder="Rase"
          />
          <input
            className="border border-primary bg-secondary h-8 w-40 mr-2 p-4 text-xl rounded-md"
            value={newRowData.ip_address}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.IP_ADDRESS, e.target.value)
            }
            placeholder="IP adrese"
          />
          <button
            className="inline-flex mt-1 p-4 mr-8 items-center bg-green h-8 w-30 mr-2 text-2xl text-white rounded-md self-end"
            onClick={() => handleNewRowSubmit()}
          >
            <span>Pievienot</span>
            <img className="w-6 ml-4" alt="Add" src={plusSvg} />
          </button>
        </div>
      </div>
      <table className="mt-2">
        <thead>
          <tr>
            {TableHeaders.map((header: string, key: number) => (
              <th
                key={key}
                className="w-80 text-start bg-primary text-white border-grey border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data: TableData, rowKey: number) => (
            <tr key={rowKey}>
              {Object.entries(data).map(([key, value]) => (
                <td
                  key={key}
                  onClick={() => handleEdit(indexOfFirstItem + rowKey, key)}
                  className="bg-secondary border-grey border-b"
                >
                  {editing.row === indexOfFirstItem + rowKey &&
                  editing.column === key ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleChange(
                          indexOfFirstItem + rowKey,
                          key,
                          e.target.value
                        )
                      }
                      onBlur={handleBlur}
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td className="w-8">
                <img
                  alt="Delete"
                  src={deleteSvg}
                  onClick={() => handleRemoveRow(indexOfFirstItem + rowKey)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full justify-center mt-4">
        <div className="text-xl">
          <button onClick={() => handlePageNumberSubtract(pageNumber - 1)}>
            {"<"}
          </button>
          <span className="mx-4 underline">{pageNumber}</span>
          <button onClick={() => handlePageNumberAdd(pageNumber + 1)}>
            {">"}
          </button>
        </div>
        <input
          className="border border-primary bg-secondary h-6 w-8 ml-4 p-2 text-md rounded-md"
          value={itemsPerPage}
          onChange={handleChangeItemsPerPage}
        />
      </div>
    </div>
  );
}

export default Table;
