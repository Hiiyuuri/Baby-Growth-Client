import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { React, useState } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";

export default function ListPageRow({ data }) {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("");

  const isLoading = useSelector((state) => state.chart.isLoading);

  if (isLoading) {
    data.name = `Loading...`;
    data.NIK = `Loading...`;
    data.address = `Loading...`;
  }

  let options = [];

  for (let i = 0; i < data.Pregnancies.length; i++) {
    const el = data.Pregnancies[i];
    let obj = {
      value: el.id,
      label: el.name,
    };

    options.push(obj);
  }

  const handleChange = (event) => {
    setSelectValue(event.value);
    navigate(`/mothers/${event.value}`);
  };

  const MyComponent = () => (
    <Select
      style={{ paddingTop: 10, marginTop: 10 }}
      options={options}
      onChange={handleChange}
      value={selectValue}
    />
  );

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.NIK}</td>
      <td>{data.address}</td>
      <td>
        <Select
          // style={{ paddingTop: 3, marginTop: 3 }}
          options={options}
          onChange={handleChange}
          value={selectValue}
        />
      </td>
      <td>
        <Button
          variant="info"
          style={{
            textAlign: "left",
          }}
          onClick={() => {
            navigate(`/register-pregnancy?motherId=${data.id}`);
          }}
        >
          Regist. Kehamilan Baru
        </Button>
      </td>
      <td />
    </tr>
  );
}
