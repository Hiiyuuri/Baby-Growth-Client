// import CreateForm from "../components/CreateForm";
import PieChart from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCombinedData,
  useDataRT,
  watchlist,
  allUsers,
  useConverter
} from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Navigation from "../components/Navigation";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import WatchlistRow from "../components/WatchlistRow";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchRTData } = useDataRT();
  const { islandConverter } = useConverter();

  useEffect(() => {
    dispatch(fetchCombinedData());
    dispatch(watchlist());
    dispatch(allUsers());
  }, []);

  const isLoading = useSelector(state => state.chart.isLoading);
  const combinedData = useSelector(state => state.chart.combinedData);
  const numRT = useSelector(state => state.chart.dataByRT);
  const kurang = useSelector(state => state.statistic.kurang);
  const cukup = useSelector(state => state.statistic.cukup);
  const berlebih = useSelector(state => state.statistic.berlebih);
  const pregnantMother = useSelector(state => state.statistic.pregnantMother);
  const watchList = useSelector(state => state.list.watchList);
  const users = useSelector(state => state.user.allUsers);

  let rtKurang = "";
  let rtCukup = "";
  let rtBerlebih = "";

  if (
    (isLoading === false && kurang.length !== 0) ||
    (isLoading === false && cukup.length !== 0) ||
    (isLoading === false && berlebih.length !== 0)
  ) {
    for (let k = 0; k < kurang.length; k++) {
      const el = kurang[k];
      if (kurang.length === 1) {
        rtKurang += `${islandConverter(el)}.`;
      } else if (kurang.length > 1 && k === kurang.length - 1) {
        rtKurang += `& ${islandConverter(el)}.`;
      } else {
        rtKurang += `${islandConverter(el)}, `;
      }
    }

    for (let c = 0; c < cukup.length; c++) {
      const el = cukup[c];
      if (cukup.length === 1) {
        rtCukup += `${islandConverter(el)}.`;
      } else if (cukup.length > 1 && c === cukup.length - 1) {
        rtCukup += `& ${islandConverter(el)}.`;
      } else {
        rtCukup += `${islandConverter(el)}, `;
      }
    }

    for (let b = 0; b < berlebih.length; b++) {
      const el = berlebih[b];
      if (berlebih.length === 1) {
        rtBerlebih += `${islandConverter(el)}.`;
      } else if (berlebih.length > 1 && b === berlebih.length - 1) {
        rtBerlebih += `& ${islandConverter(el)}.`;
      } else {
        rtBerlebih += `${islandConverter(el)}, `;
      }
    }
  }

  let title = <div style={{ textAlign: "left" }}>Data Seluruh Pulau</div>;

  if (numRT !== 0) {
    title = (
      <Row>
        <Col md="4">
          {islandConverter(numRT)}
        </Col>
        <br />
        <Col md="8">
          <Button
            variant="info"
            onClick={() => {
              navigate(`/rt/${numRT}`);
            }}
          >
            Detail
          </Button>
        </Col>
      </Row>
    );
  }

  let pieChart = (
    <PieChart dataValue={combinedData} style={{ height: "100px" }} />
  );

  if (isLoading) {
    pieChart = (
      <Container>
        <img
          src="https://cdn.dribbble.com/users/194846/screenshots/1452453/loadingspinner.gif"
          style={{ width: "500px" }}
        />
      </Container>
    );
    combinedData[0] = "Loading...";
    combinedData[1] = "Loading...";
    combinedData[2] = "Loading...";
    rtKurang = "Loading...";
    rtCukup = "Loading...";
    rtBerlebih = "Loading...";
  }

  return (
    <div>
      <Navigation />
      <Container style={{ marginBottom: "25px" }}>
        <Row md="12" style={{ marginTop: "25px" }}>
          <Col
            md="6"
            className="border"
            style={{ height: "600px", padding: "5px" }}
          >
            {pieChart}
          </Col>
          <Stack md="6" className="col-md-5 mx-auto border">
            <Container>
              <Row>
                <DropdownButton
                  id="dropdown-item-button"
                  title="Filter Berdasarkan Pulau"
                  align="end"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Dropdown.Item
                    onClick={e => {
                      e.preventDefault(dispatch(fetchCombinedData()));
                    }}
                  >
                    Seluruh Pulau
                  </Dropdown.Item>
                  {users.map(el => {
                    return (
                      <Dropdown.Item
                        as="button"
                        onClick={e => {
                          e.preventDefault(fetchRTData(el.noRT));
                        }}
                        key={el.noRT}
                      >
                        {islandConverter(el.noRT)}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <Col>
                  <div style={{ padding: "20px" }}>
                    <h6>
                      {title}
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
            <div>
              <h5>Jumlah Bayi Berdasarkan Kecukupan Gizi</h5>
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
                  Jumlah Ibu Hamil : <b>{pregnantMother}</b>
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "left" }}>
              <ul>
                <li>
                  Pulau Dengan Gizi Kurang Terbanyak : <b>{rtKurang}</b>
                </li>
                <li>
                  Pulau Dengan Gizi Cukup Terbanyak : <b>{rtCukup}</b>
                </li>
                <li>
                  Pulau Dengan Gizi Berlebih Terbanyak : <b>{rtBerlebih}</b>{" "}
                </li>
              </ul>
            </div>

            <Table striped bordered hover responsive>
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
