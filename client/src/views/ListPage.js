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
import ListPageRow from "../components/ListPageRow";
import { useParams } from "react-router-dom";

export default function ListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(motherListByRT());
  }, []);

  const motherListData = useSelector(state => state.list.motherList);

  console.log(motherListData);

  const { id } = useParams();
  let title = id;

  if (title < 10) {
    title = `Daftar Ibu Hamil dan Bayi RT 0${id}`;
  } else {
    title = `Daftar Ibu Hamil dan Bayi RT ${id}`;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div style={{ marginTop: "75px" }}>
          <h3>
            {title}
          </h3>
        </div>
      </Container>
      <Container>
        <Table>
          <thead>
            <th>Nama</th>
            <th>NIK</th>
            <th>Alamat</th>
            <th>Data Bayi & Kehamilan</th>
          </thead>
          <tbody>
            {motherListData.map(data => {
              return <ListPageRow data={data} key={data.id} />;
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
