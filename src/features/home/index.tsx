import FilledButton from "@/common/components/buttons/FilledButton";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import Topbar from "@/common/layouts/main/components/Topbar";
import { Flex } from "antd";
import { v4 as uuid } from "uuid";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurPage, setMode, setQuiz } from "../library/store/slice";
import { privateHttp as http } from "@/common/services/axios";
import Visibility from "../library/utils/enums/visibility";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MyQuizCard from "./RecentQuizCard";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const [greeting, setGreeting] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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

  useEffect(() => {
    (async () => {
      const q: Quiz[] = [];
      const { data } = await http.get("/quizzes");
      data.map(
        (quiz: {
          id: string;
          title: string;
          description: string;
          creator_id: string;
          creator_name: string;
          cover_image: string;
          case_sensitive: boolean;
          font_size: number;
          mark: number;
          select_up_to: number;
          have_time_factor: boolean;
          time_factor: number;
          time_limit: number;
          visibility: string;
          questions: any;
        }) => {
          q.push({
            id: quiz.id,
            versionId: "",
            title: quiz.title,
            description: quiz.description,
            creatorId: quiz.creator_id,
            creatorName: quiz.creator_name,
            coverImg: quiz.cover_image,
            caseSensitive: quiz.case_sensitive,
            fontSize: quiz.font_size,
            mark: quiz.mark.toString(),
            haveTimeFactor: quiz.have_time_factor,
            timeFactor: quiz.time_factor.toString(),
            timeLimit: quiz.time_limit.toString(),
            visibility: quiz.visibility,
            questions: quiz.questions,
          });
        }
      );
      console.log("quiz: ", q);
      setQuizzes(q);
    })();
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

  const buildMyQuizes = () => {
    return (
      <div className="mt-6">
        <p className="font-sans-serif text-xl">My quizes</p>
        <div className="flex flex-nowrap overflow-x-auto space-x-4 scrollbar-hide mt-2">
          {quizzes.map((quiz) => (
            <div className="shrink-0" key={quiz.id}>
              <MyQuizCard quiz={quiz} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Topbar title={`${greeting}, ${auth.value.user.name}!`}>
      <Flex className="rounded-xl flex-col h-full">
        <div className="flex justify-around">
          <FilledButton
            className="w-1/2 bg-denim transform transition duration-500 
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
            className="w-1/2 bg-koromiko transform transition duration-500 
              hover:scale-110 drop-shadow-lg"
          >
            <AddBoxOutlinedIcon className="mb-2" style={{ fontSize: 32 }} />
            {"  "}
            <span className="text-3xl">Create Quiz</span>
          </FilledButton>
        </div>
        {buildMyQuizes()}
      </Flex>
    </Topbar>
  );
}
