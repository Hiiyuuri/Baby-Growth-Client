import { useDispatch, useSelector } from "react-redux";
import { motherListByRT } from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../components/Navigation";
import Table from "react-bootstrap/Table";
import ListPageRow from "../components/ListPageRow";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useConverter } from "../store/actions/actionCreator";
import Footer from "../components/Footer";

export default function ListPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { islandConverter } = useConverter();

  useEffect(() => {
    dispatch(motherListByRT(id));
  }, []);

  const motherListData = useSelector(state => state.list.motherList);
  const isLoading = useSelector(state => state.chart.isLoading);

  console.log(motherListData);

  let title = `Daftar Ibu Hamil dan Bayi di ${islandConverter(+id)}`;

  if (isLoading) {
    title = `Loading...`;
  }

  return (
    <div
      className="h-full"
      style={{
        backgroundColor: "#eeee",
        minHeight: "100vh"
      }}
    >
      <Navigation />
      <Container>
        <Row>
          <Col md="2">
            <Button
              variant="info"
              style={{ textAlign: "left", marginTop: "25px" }}
              onClick={() => {
                navigate(`/dashboard`);
              }}
            >
              Back to Dashboard
            </Button>
          </Col>
          <Col md="8">
            <div style={{ marginTop: "25px" }}>
              <h3>
                {title}
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
      <Container
        className="bg-white border"
        style={{ marginTop: "25px", borderRadius: "10px" }}
      >
        <Table striped>
          <thead>
            <th>Nama</th>
            <th>NIK</th>
            <th>Alamat</th>
            <th>Data Bayi & Kehamilan</th>
            <th>Register Kehamilan Baru</th>
          </thead>
          <tbody>
            {motherListData.map(data => {
              return <ListPageRow data={data} key={data.id} />;
            })}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
}
