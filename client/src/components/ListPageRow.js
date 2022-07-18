import Dropdown from "react-bootstrap/Dropdown";

export default function ListPageRow({ data }) {
  return (
    <tr>
      <td>
        {data.name}
      </td>
      <td>
        {data.NIK}
      </td>
      <td>
        {data.address}
      </td>
      <td>
        <Dropdown className="col-6 container">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Pilih
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {data.Pregnancies.map(el => {
              return (
                <Dropdown.Item href="#/action-1">
                  {el.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}
