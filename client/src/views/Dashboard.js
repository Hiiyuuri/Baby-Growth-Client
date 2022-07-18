// import CreateForm from "../components/CreateForm";
import PieChart from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCombinedData,
  useDataRT,
  watchlist,
  allUsers
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

  useEffect(() => {
    dispatch(fetchCombinedData());
    dispatch(watchlist());
    dispatch(allUsers());
  }, []);

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

  const numConverter = noRT => {
    if (noRT < 10) {
      return `RT 0${noRT}`;
    }
    return `RT ${noRT}`;
  };

  let title = <div style={{ textAlign: "left" }}>Data Seluruh RT</div>;

  if (numRT !== 0) {
    if (numRT < 10) {
      title = (
        <Row>
          <Col>
            Data RT 0{numRT}
          </Col>
          <Col>
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
    } else {
      title = (
        <Row>
          <Col>
            Data RT {numRT}
          </Col>
          <Col>
            <Button
              variant="info"
              onClick={() => {
                navigate(`/rt/${watchlist.noRT}`);
              }}
            >
              Detail
            </Button>
          </Col>
        </Row>
      );
    }
  }

  return (
    <div>
      <Navigation />
      <Container>
        <Row md="12" style={{ marginTop: "100px" }}>
          <Col md="6" className="border">
            <PieChart dataValue={combinedData} style={{ height: "100px" }} />
          </Col>
          <Stack md="6" className="col-md-5 mx-auto border">
            <Container>
              <Row>
                <DropdownButton
                  id="dropdown-item-button"
                  title="Filter by RT"
                  align="end"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Dropdown.Item
                    onClick={e => {
                      e.preventDefault(dispatch(fetchCombinedData()));
                    }}
                  >
                    Seluruh RT
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
                        {numConverter(el.noRT)}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <Col>
                  <div style={{ padding: "20px" }}>
                    <h5>
                      {title}
                    </h5>
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
