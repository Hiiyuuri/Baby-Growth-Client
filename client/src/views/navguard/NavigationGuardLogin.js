import { Navigate } from "react-router-dom";

export default function NavigationGuardLogin(props) {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to={"/"} />;
  }
  return props.children;
}
