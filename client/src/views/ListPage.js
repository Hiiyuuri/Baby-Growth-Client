import { useDispatch, useSelector } from "react-redux";
import { motherListByRT } from "../store/actions/actionCreator";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../components/Navigation";
import Table from "react-bootstrap/Table";
import ListPageRow from "../components/ListPageRow";
import { useParams } from "react-router-dom";

export default function ListPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(motherListByRT(id));
  }, []);

  const motherListData = useSelector(state => state.list.motherList);
  const isLoading = useSelector(state => state.chart.isLoading);

  let title = id;

  if (title < 10) {
    title = `Daftar Ibu Hamil dan Bayi RT 0${id}`;
  } else {
    title = `Daftar Ibu Hamil dan Bayi RT ${id}`;
  }

  if (isLoading) {
    title = `Loading...`;
  }

  return (
    <div>
      <Navigation />
      <Container>
        <div style={{ marginTop: "25px" }}>
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
