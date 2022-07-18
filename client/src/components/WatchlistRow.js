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

export default function WatchlistRow({ watchlist }) {
  console.log(watchlist);

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

  return (
    <tr>
      <td>RT 01</td>
      {status}
      <td>
        <Button className="bg-info">Detail</Button>
      </td>
    </tr>
  );
}
