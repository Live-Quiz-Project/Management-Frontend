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
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

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

  const buildChartBackground = () => {
    return (
      <div className="mt-16 flex-col h-full justify-between">
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <button
            className="bg-chart-pallete10 mb-2 h-12 w-2/12 rounded-r-lg flex pt-2 justify-center cursor-pointer transform transition duration-500 
              hover:scale-110"
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${
                  auth.value.token
                }`
              )
            }
          >
            <LoginOutlinedIcon className="mt-1 mr-2" style={{ fontSize: 24 }} />
            <span className="text-2xl font-sans-serif font-semibold">Join</span>
          </button>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete9 mb-2 h-12 w-3/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete8 mb-2 h-12 w-4/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete7 mb-2 h-12 w-8/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <button
            className="bg-chart-pallete6 mb-2 h-12 w-5/12 rounded-r-lg flex pt-2 justify-center cursor-pointer transform transition duration-500 
              hover:scale-110"
            onClick={onCreateQuiz}
          >
            <AddBoxOutlinedIcon className="mb-2" style={{ fontSize: 32 }} />
            <span className="text-2xl font-sans-serif font-semibold">
              Create Quiz
            </span>
          </button>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete5 mb-2 h-12 w-6/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete5 mb-2 h-12 w-9/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete3 mb-2 h-12 w-8/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete2 mb-2 h-12 w-10/12 rounded-r-lg"></div>
        </div>
        <div className="bg-light-gray mb-2 h-12 w-full rounded-r-lg z-[-1]">
          <div className="bg-chart-pallete1 mb-2 h-12 w-7/12 rounded-r-lg"></div>
        </div>
        <div className="x-axis-labels flex justify-between mt-2">
          <span className="text-base font-semibold">K</span>
          <span className="text-base font-semibold">M</span>
          <span className="text-base font-semibold">I</span>
          <span className="text-base font-semibold">T</span>
          <span className="text-base font-semibold">L</span>
        </div>
      </div>
    );
  };

  return (
    <Topbar title={`${greeting}, ${auth.value.user.name}!`}>
      <Flex className="rounded-xl flex-col h-full justify-between">
        <div></div>
        {buildChartBackground()}
        <div className="flex justify-around">
          {/* <FilledButton
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
          </FilledButton> */}
        </div>
        <div></div>
      </Flex>
    </Topbar>
  );
}
