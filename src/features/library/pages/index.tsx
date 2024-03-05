import FilledButton from "@/common/components/buttons/FilledButton";
import SearchBar from "@/common/components/inputs/SearchBar";
import QuizCard from "@/features/library/components/main/QuizCard";
import { FormEvent, useEffect, useState } from "react";
import Topbar from "@/common/layouts/main/components/Topbar";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { privateHttp as http } from "@/common/services/axios";
import { useDispatch } from "react-redux";
import { setCurPage, setMode, setQuiz } from "@/features/library/store/slice";
import Visibility from "@/features/library/utils/enums/visibility";
import useTypedSelector from "@/common/hooks/useTypedSelector";

export default function Library() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");

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
      setQuizzes(q);
    })();
  }, []);

  function onCreateQuiz(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newQuizId = uuid();
    const newQuizVersionId = uuid();
    dispatch(setMode("create"));
    dispatch(setCurPage(0));
    dispatch(
      setQuiz({
        id: newQuizId,
        versionId: newQuizVersionId,
        creatorId: auth.value.user.id,
        creatorName: "",
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
    navigate(`/library/quiz/${newQuizId}`);
  }

  return (
    <Topbar>
      <div className="space-y-4" style={{ maxHeight: "73vh" }}>
        <p className="font-sans-serif text-header-1">Library</p>
        <div className="flex justify-between">
          <FilledButton onClick={onCreateQuiz} className="bg-koromiko">
            &#43; Create Quiz
          </FilledButton>
          <SearchBar className="" keyword={search} setKeyword={setSearch} />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-12 border-b-2 border-b-koromiko">
            <p className="col-span-4 col-start-3">Title</p>
            <p className="col-span-3">Creator</p>
            <p className="col-span-3">Description</p>
          </div>
          <div className="space-y-2">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </Topbar>
  );
}
