// import CreateForm from "../components/CreateForm";
import PieChart from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCombinedData,
  fetchRTData,
  watchlist
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
import WatchlistRow from "../components/WatchlistRow";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCombinedData());
  }, []);

  useEffect(() => {
    dispatch(watchlist());
  }, []);

  const combinedData = useSelector(state => state.chart.combinedData);
  const kurang = useSelector(state => state.statistic.kurang);
  const cukup = useSelector(state => state.statistic.cukup);
  const berlebih = useSelector(state => state.statistic.berlebih);
  const pregnantMother = useSelector(state => state.statistic.pregnantMother);
  const watchList = useSelector(state => state.list.watchList);

  let rtKurang = "";
  let rtCukup = "";
  let rtBerlebih = "";

  if (kurang.length !== 0) {
    kurang.forEach(el => {
      if (el < 10) {
        rtKurang += `RT 0${el} `;
      } else {
        rtKurang += `RT ${el} `;
      }
    });
  }
  if (cukup.length !== 0) {
    cukup.forEach(el => {
      if (el < 10) {
        rtCukup += `RT 0${el} `;
      } else {
        rtCukup += `RT ${el} `;
      }
    });
  }
  if (berlebih.length !== 0) {
    berlebih.forEach(el => {
      if (el < 10) {
        rtBerlebih += `RT 0${el} `;
      } else {
        rtBerlebih += `RT ${el} `;
      }
    });
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Row md="12" style={{ marginTop: "100px" }}>
          <Col md="6" className="border">
            <PieChart dataValue={combinedData} style={{ height: "100px" }} />
          </Col>
          <Stack md="6" className="col-md-5 mx-auto border">
            <div>
              <Dropdown
                onClick={() => {
                  fetchRTData(1);
                }}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Filter by RT
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">RT 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">RT 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">RT 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <Table striped bordered hover>
                <thead>
                  <th>Kurang</th>
                  <th>Cukup</th>
                  <th>Berlebih</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {combinedData[0]}
                    </td>
                    <td>
                      {combinedData[1]}
                    </td>
                    <td>
                      {combinedData[2]}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div style={{ textAlign: "left" }}>
              <ul>
                <li>
                  RT Dengan Gizi Kurang Terbanyak : <b>{rtKurang}</b>
                </li>
                <li>
                  RT Dengan Gizi Cukup Terbanyak : <b>{rtCukup}</b>
                </li>
                <li>
                  RT Dengan Gizi Berlebih Terbanyak : <b>{rtBerlebih}</b>{" "}
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "left" }}>
              <ul>
                <li>
                  Jumlah Ibu Hamil : <b>{pregnantMother}</b>
                </li>
              </ul>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Daftar Pengawasan</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {watchList.map(el => {
                  return <WatchlistRow watchlist={el} />;
                })}
              </tbody>
            </Table>
          </Stack>
        </Row>
      </Container>
    </div>
  );
}
