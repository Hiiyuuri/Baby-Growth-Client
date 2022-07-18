import BarChart from "../components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { motherListByRT } from "../store/actions/actionCreator";
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
import { useNavigate } from "react-router-dom";

export default function WatchlistRow({ watchlist }) {
  const navigate = useNavigate();

  //   const RTdetail = id => {
  //     console.log(id);
  //     motherListByRT(id);
  //     // navigate(`/rt/${id}`);
  //   };
  let status = (
    <td className="bg-warning">
      {watchlist.status}
    </td>
  );

  if (watchlist.status === "Critical") {
    status = (
      <td className="bg-danger text-white">
        {watchlist.status}
      </td>
    );
  }

  let num = `RT ${watchlist.noRT}`;

  if (watchlist.noRT < 10) {
    num = `RT 0${watchlist.noRT}`;
  }

  return (
    <tr>
      <td>
        {num}
      </td>
      {status}
      <td>
        <Button
          className="bg-info"
          onClick={() => {
            navigate(`/rt/${watchlist.noRT}`);
          }}
        >
          Detail
        </Button>
      </td>
    </tr>
  );
}
