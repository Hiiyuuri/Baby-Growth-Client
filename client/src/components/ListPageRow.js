import BarChart from "../components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { motherList } from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "../components/Navbar";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";

export default function ListPageRow({ data }) {
  console.log(data.Pregnancies);
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
