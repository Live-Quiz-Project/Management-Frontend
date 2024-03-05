import FilledButton from "@/common/components/buttons/FilledButton";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import Topbar from "@/common/layouts/main/components/Topbar";
import { Flex } from "antd";
import { v4 as uuid } from "uuid";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurPage, setMode, setQuiz } from "../library/store/slice";
import Visibility from "../library/utils/enums/visibility";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (auth.value.token) {
      console.log("token exists");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const currentHour = new Date().getUTCHours() + 7;
    let newGreeting = "";
    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = "Good Afternoon";
    } else {
      newGreeting = "Good Evening";
    }
    setGreeting(newGreeting);
  }, []);

  function onCreateQuiz(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newUuid = uuid();
    dispatch(setMode("create"));
    dispatch(setCurPage(0));
    dispatch(
      setQuiz({
        id: newUuid,
        creatorId: auth.value.user.id,
        title: "Untitled Quiz",
        description: "",
        coverImg: "",
        visibility: Visibility.PRIVATE,
        timeLimit: "60",
        haveTimeFactor: true,
        timeFactor: "1",
        mark: "1",
        caseSensitive: false,
        fontSize: 2,
        questions: [],
      })
    );
    navigate(`/library/quiz/${newUuid}`);
  }

  return (
    <Topbar title={`${greeting}, ${auth.value.user.name}!`}>
      <Flex className="flex-col h-full justify-between">
        <div></div>
        <div className="flex justify-around">
          <FilledButton
            className="w-fit bg-denim transform transition duration-500 
            hover:scale-110 drop-shadow-lg"
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${
                  auth.value.token
                }`
              )
            }
          >
            <span className="text-white text-3xl">Join</span>
          </FilledButton>
          <FilledButton
            onClick={onCreateQuiz}
            className="w-5/12 bg-koromiko transform transition duration-500 
              hover:scale-110 drop-shadow-lg"
          >
            <AddBoxOutlinedIcon className="mb-2" style={{ fontSize: 32 }} />
            {"  "}
            <span className="text-3xl">Create Quiz</span>
          </FilledButton>
        </div>
        <div></div>
      </Flex>
    </Topbar>
  );
}
