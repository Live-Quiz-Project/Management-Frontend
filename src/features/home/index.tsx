import { useTypedSelector } from "@/common/hooks/useTypedSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const auth = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (auth.value.token) {
      console.log("token exists");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="">
      <h1 className="">Home</h1>
    </div>
  );
}
