import BarChart from "../components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailData } from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../components/Navigation";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function MothersPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [key, setKey] = useState("pregnancy");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetailData(id));
  }, []);

  const isLoading = useSelector(state => state.chart.isLoading);
  const pregnancyData = useSelector(state => state.chart.pregnancyData);
  const babyData = useSelector(state => state.chart.babyData);
  const motherData = useSelector(state => state.detail.motherData);
  const motherProfile = useSelector(state => state.detail.motherProfile);
  const motherPregnancy = useSelector(state => state.detail.motherPregnancy);

  let rtLocation = motherProfile.UserId - 1;

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

  if (isLoading) {
    motherProfile.name = `Loading...`;
    motherProfile.NIK = `Loading...`;
    motherProfile.address = `Loading...`;
    motherData.name = `Loading...`;
    motherPregnancy.beratAwal = `Loading...`;
    motherPregnancy.tanggalDicatat = `Loading...`;
    pregnancyNull = (
      <Container>
        <img
          src="https://cdn.dribbble.com/users/194846/screenshots/1452453/loadingspinner.gif"
          style={{ width: "500px" }}
        />
      </Container>
    );

    babyNull = (
      <Container>
        <img
          src="https://cdn.dribbble.com/users/194846/screenshots/1452453/loadingspinner.gif"
          style={{ width: "500px" }}
        />
      </Container>
    );
  } else {
    if (pregnancyData.length !== 0) {
      pregnancyNull = pregnancyBar;
    }

    if (babyData.length !== 0) {
      babyNull = babyBar;
    }
  }

  return (
    <div>
      <Navigation />
      <Container style={{ marginTop: "25px" }}>
        <Row>
          <Col md="1">
            <Button
              variant="info"
              onClick={() => {
                navigate(`/rt/${rtLocation}`);
              }}
            >
              Back to List
            </Button>
          </Col>
          <Col md="11">
            <h3>
              <b>
                {motherData.name}
              </b>
            </h3>
          </Col>
        </Row>
      </Container>
      <Container>
        <Stack style={{ marginTop: "25px" }}>
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
          <Col style={{ marginBottom: "25px" }}>
            <Row md="12" style={{ marginTop: "25px" }}>
              <Col md="6">
                <Card>
                  <Card.Header>Data Ibu</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col style={{ textAlign: "left" }}>
                          <ul>
                            <li>Nama</li>
                            <li>NIK</li>
                            <li>Alamat</li>
                          </ul>
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                          <div>
                            : {motherProfile.name}
                          </div>
                          <div>
                            : {motherProfile.NIK}
                          </div>
                          <div>
                            : {motherProfile.address}
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="6">
                <Card>
                  <Card.Header>Data Kehamilan</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col style={{ textAlign: "left" }}>
                          <ul>
                            <li>Berat Awal</li>
                            <li>Status Kelahiran</li>
                            <li>Tanggal Dicatat</li>
                          </ul>
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                          <div>
                            : {motherPregnancy.beratAwal}{" "}
                            <span hidden={isLoading === true ? true : false}>
                              Kg
                            </span>
                          </div>
                          <div>
                            :{" "}
                            {isLoading === true
                              ? `Loading...`
                              : motherData.sudahLahir === true
                                ? "Sudah Lahir"
                                : "Belum Lahir"}
                          </div>
                          <div>
                            : {motherPregnancy.tanggalDicatat}
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Stack>
      </Container>
    </div>
  );
}
