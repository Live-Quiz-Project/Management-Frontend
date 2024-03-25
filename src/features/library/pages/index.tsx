import FilledButton from "@/common/components/buttons/FilledButton";
import SearchBar from "@/common/components/inputs/SearchBar";
import QuizCard from "@/features/library/components/main/QuizCard";
import { FormEvent, useEffect, useState } from "react";
import Topbar from "@/common/layouts/main/components/Topbar";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { privateHttp as http } from "@/common/services/axios";
import { useDispatch } from "react-redux";
import {
  setCurPage,
  setError,
  setMode,
  setQuiz,
  setSavable,
} from "@/features/library/store/slice";
import Visibility from "@/features/library/utils/enums/visibility";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type DisplayQuiz = {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  coverImg: string;
  updatedAt: Date;
};

export default function Library() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);
  const auth = useTypedSelector((state) => state.auth);
  const [quizzes, setQuizzes] = useState<DisplayQuiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<DisplayQuiz[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchQuizzes() {
      const { data } = await http.get("/quizzes");
      const q: DisplayQuiz[] = data.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        creatorName: quiz.creator_name,
        coverImg: quiz.cover_image,
        updatedAt: new Date(quiz.updated_at),
      }));
      q.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

      setQuizzes(q);
      setFilteredQuizzes(q);
    }

    fetchQuizzes();
    dispatch(setError(null));

    if (editor.value.savable) {
      dispatch(setSavable(false));
      navigate(0);
    }
  }, []);

  useEffect(() => {
    const filteredQuizzes = quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredQuizzes(filteredQuizzes);
  }, [search]);

  function onCreateQuiz(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newQuizId = uuid();
    dispatch(setMode("create"));
    dispatch(setCurPage(0));
    dispatch(
      setQuiz({
        id: newQuizId,
        creatorId: auth.value.user.id,
        creatorName: "",
        title: "Untitled Quiz",
        description: "",
        coverImg: "",
        visibility: Visibility.PRIVATE,
        timeLimit: "60",
        haveTimeFactor: false,
        timeFactor: "0",
        mark: "1",
        caseSensitive: false,
        fontSize: 2,
        questions: [],
        created_at: "",
      })
    );
    navigate(`/library/quiz/${newQuizId}`);
  }

  return (
    <Topbar>
      <div className="space-y-4 font-sans-serif" style={{ maxHeight: "73vh" }}>
        <p className="font-serif text-header-1">Library</p>
        <div className="flex justify-between">
          <FilledButton onClick={onCreateQuiz} className="bg-koromiko">
            <AddBoxOutlinedIcon style={{ fontSize: 24 }} /> Create Quiz
          </FilledButton>
          <SearchBar className="" keyword={search} setKeyword={setSearch} />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[2fr_3fr_2fr_2fr] border-b-2 border-b-koromiko text-header-3">
            <p className="col-start-2">Title</p>
            <p>Creator</p>
            <p>Description</p>
          </div>
          <div className="space-y-2 pb-2">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={{
                  id: quiz.id!,
                  title: quiz.title,
                  description: quiz.description,
                  creatorName: quiz.creatorName,
                  coverImg: quiz.coverImg,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Topbar>
  );
}
