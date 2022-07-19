import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function WatchlistRow({ watchlist }) {
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.chart.isLoading);

  let status = (
    <td className="bg-warning">
      {watchlist.status}
    </td>
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
        <td className="bg-danger text-white">
          {watchlist.status}
        </td>
      );
    }

    if (watchlist.noRT < 10) {
      num = `RT 0${watchlist.noRT}`;
    }
  }

  return (
    <tr>
      <td>
        {num}
      </td>
      {status}
      <td>
        {button}
      </td>
    </tr>
  );
}
