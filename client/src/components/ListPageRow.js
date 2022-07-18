import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";

export default function ListPageRow({ data }) {
  const navigate = useNavigate();

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
                <Dropdown.Item
                  onClick={() => {
                    navigate(`/mothers/${el.id}`);
                  }}
                >
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
