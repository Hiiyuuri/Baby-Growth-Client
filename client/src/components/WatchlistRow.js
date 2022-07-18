import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function WatchlistRow({ watchlist }) {
  const navigate = useNavigate();

  let status = (
    <td className="bg-warning">
      {watchlist.status}
    </td>
  );

  if (watchlist.status === "Critical") {
    status = (
      <td className="bg-danger text-white">
        {watchlist.status}
      </td>
    );
  }

  let num = `RT ${watchlist.noRT}`;

  if (watchlist.noRT < 10) {
    num = `RT 0${watchlist.noRT}`;
  }

  return (
    <tr>
      <td>
        {num}
      </td>
      {status}
      <td>
        <Button
          className="bg-info"
          onClick={() => {
            navigate(`/rt/${watchlist.noRT}`);
          }}
        >
          Detail
        </Button>
      </td>
    </tr>
  );
}
