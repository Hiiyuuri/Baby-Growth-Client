// import CreateForm from "../components/CreateForm";
import PieChart from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCombinedData, fetchRTData } from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "../components/Navbar";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCombinedData());
  }, []);

  const combinedData = useSelector(state => state.chart.combinedData);

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
                  <tr>
                    <th>Kurang</th>
                    <th>Cukup</th>
                    <th>Berlebih</th>
                  </tr>
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
                  RT Dengan Gizi Kurang Terbanyak : <b>RT 04</b>
                </li>
                <li>
                  RT Dengan Gizi Cukup Terbanyak : <b>RT 07</b>
                </li>
                <li>
                  RT Dengan Gizi Berlebih Terbanyak : <b>RT 05</b>{" "}
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "left" }}>
              <ul>
                <li>
                  Jumlah Ibu Hamil : <b>5</b>
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
                <tr>
                  <td>RT 01</td>
                  <td className="bg-danger text-white">Critical</td>
                  <td>
                    <Button className="bg-info">Detail</Button>
                  </td>
                </tr>
                <tr>
                  <td>RT 04</td>
                  <td className="bg-danger text-white">Critical</td>
                  <td>
                    <Button className="bg-info">Detail</Button>
                  </td>
                </tr>
                <tr>
                  <td>RT 02</td>
                  <td className="bg-warning text-black">Warning</td>
                  <td>
                    <Button className="bg-info">Detail</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Stack>
        </Row>
      </Container>
    </div>
  );
}
