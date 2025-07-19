import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../redux/hooks";

type TProtectorProps = {
  children: ReactNode;
};

const PrivateProtector = ({ children }: TProtectorProps) => {
  const token = useAppSelector(state => state.auth.token)


  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null; // don't render protected content if not authenticated

  return <>{children}</>;
};

export default PrivateProtector;
