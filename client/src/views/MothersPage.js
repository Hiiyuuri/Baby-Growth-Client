import BarChart from "../components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPregnancyData,
  fetchBabyData
} from "../store/actions/actionCreator";
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
import { useState } from "react";

export default function MothersPage() {
  const dispatch = useDispatch();
  const [key, setKey] = useState("pregnancy");

  useEffect(() => {
    dispatch(fetchPregnancyData());
  }, []);

  useEffect(() => {
    dispatch(fetchBabyData());
  }, []);

  const pregnancyData = useSelector(state => state.chart.pregnancyData);
  const babyData = useSelector(state => state.chart.babyData);

  let filter = {
    key: key
  };

  let pregnancyNull = (
    <div>
      <h1>No Data</h1>
    </div>
  );

  let babyNull = (
    <div>
      <h1>No Data</h1>
    </div>
  );

  const pregnancyBar = (
    <div>
      <BarChart dataValue={pregnancyData} select={filter} />
    </div>
  );

  const babyBar = (
    <div>
      <BarChart dataValue={babyData} select={filter} />
    </div>
  );

  if (pregnancyData.length !== 0) {
    pregnancyNull = pregnancyBar;
  }

  if (babyData.length !== 0) {
    babyNull = babyBar;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Stack style={{ marginTop: "75px" }}>
          {/* <Col className="border" style={{ marginBottom: "50px" }}> */}
          <Tabs
            className=" mb-3"
            justify
            style={{ marginBottom: "50px" }}
            activeKey={key}
            onSelect={k => setKey(k)}
          >
            <Tab eventKey="pregnancy" title="Pregnancy Data">
              {pregnancyNull}
            </Tab>
            <Tab eventKey="baby" title="Baby's Data">
              {babyNull}
            </Tab>
          </Tabs>
          {/* </Col> */}
          <Col>
            <Row md="12" style={{ marginTop: "25px" }}>
              <Col md="6" className="border">
                <h1>Info 1</h1>
              </Col>
              <Col md="6" className="border">
                <h1>Info 2</h1>
              </Col>
            </Row>
          </Col>
        </Stack>
      </Container>
    </div>
  );
}
