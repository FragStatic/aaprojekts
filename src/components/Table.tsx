import { useState } from "react";
import useStorage from "./Storage";
import { TableData } from "./Storage";

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

function Table(data: TableData[]) {
  const { setStorage, getStorage, editTableRow, addNewRow, removeRow } =
    useStorage("data");
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
    console.log(Math.ceil(filteredData.length / itemsPerPage));
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
    console.log(newRowData);
  };

  const handleNewRowSubmit = () => {
    setEditableData([...editableData, newRowData]);
    addNewRow(newRowData);
    setNewRowData(initialRowData);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
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
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          <input
            value={newRowData.first_name}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.FIRST_NAME, e.target.value)
            }
            placeholder="First Name"
          />
          <input
            value={newRowData.last_name}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.LAST_NAME, e.target.value)
            }
            placeholder="Last Name"
          ></input>
          <input
            value={newRowData.email}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.EMAIL, e.target.value)
            }
            placeholder="E-mail"
          />
          <input
            value={newRowData.race}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.RACE, e.target.value)
            }
            placeholder="Race"
          />
          <input
            value={newRowData.ip_address}
            onChange={(e) =>
              handleNewRowDataChange(ObjectDataKeys.IP_ADDRESS, e.target.value)
            }
            placeholder="IP address"
          />
          <button onClick={() => handleNewRowSubmit()}>Add row</button>
        </div>
      </div>
      <div>
        <button onClick={() => handlePageNumberSubtract(pageNumber - 1)}>
          {"<"}
        </button>
        <span>{pageNumber}</span>
        <button onClick={() => handlePageNumberAdd(pageNumber + 1)}>
          {">"}
        </button>
        <input value={itemsPerPage} onChange={handleChangeItemsPerPage} />
      </div>
      <table>
        <thead>
          <tr>
            <th className="w-80 text-start">First Name</th>
            <th className="w-80 text-start">Last Name</th>
            <th className="w-80 text-start">E-mail</th>
            <th className="w-80 text-start">Race</th>
            <th className="w-80 text-start">IP address</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data: TableData, rowKey: number) => (
            <tr key={rowKey}>
              {Object.entries(data).map(([key, value]) => (
                <td key={key} onClick={() => handleEdit(rowKey, key)}>
                  {editing.row === rowKey && editing.column === key ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleChange(rowKey, key, e.target.value)
                      }
                      onBlur={handleBlur}
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => handleRemoveRow(rowKey)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
