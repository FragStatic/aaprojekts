// import InitialData from "@/data/InitialData.json";
import data from "../../data/InitialData.json";

export default function Home() {
  window.sessionStorage.setItem("data", JSON.stringify(data));

  const test = window.sessionStorage.getItem("data");

  console.log(JSON.parse(test || ""));

  function updateCell(newValue: string) {}
  return (
    <main>
      <section>
        <div className="w-screen h-screen p-40">
          <table>
            <tr className="items-start">
              <th className="w-80 text-start">First Name</th>
              <th className="w-80 text-start">Last Name</th>
              <th className="w-80 text-start">E-mail</th>
              <th className="w-80 text-start">Race</th>
              <th className="w-80 text-start">IP address</th>
            </tr>

            {data.map((value) => {
              return (
                <tr>
                  <td>
                    <input placeholder={value.first_name}></input>
                  </td>
                  <td>{value.last_name}</td>
                  <td>{value.email}</td>
                  <td>{value.race}</td>
                  <td>{value.ip_address}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    </main>
  );
}
