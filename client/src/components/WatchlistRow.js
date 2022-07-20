import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useConverter } from "../store/actions/actionCreator";

export default function WatchlistRow({ watchlist }) {
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.chart.isLoading);
  const { islandConverter } = useConverter();

  let status = (
    <Button variant="warning">
      {watchlist.status}
    </Button>
  );

  let num = `RT ${watchlist.noRT}`;

  let button = (
    <Button
      className="bg-info"
      onClick={() => {
        navigate(`/rt/${watchlist.noRT}`);
      }}
    >
      Detail
    </Button>
  );

  if (isLoading) {
    status = <td>Loading...</td>;

    num = `Loading...`;

    button = `Loading...`;
  } else {
    if (watchlist.status === "Critical") {
      status = (
        <Button variant="danger">
          {watchlist.status}
        </Button>
      );
    }

    if (watchlist.noRT < 10) {
      num = `${islandConverter(watchlist.noRT)}`;
    }
  }

  return (
    <tr>
      <td style={{ paddingTop: "10px" }}>
        {num}
      </td>
      <td>
        {status}
      </td>
      <td>
        {button}
      </td>
    </tr>
  );
}
