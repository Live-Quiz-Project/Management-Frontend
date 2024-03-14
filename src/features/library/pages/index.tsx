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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import QuestionTypesEnum from "../utils/enums/question-types";

export default function Library() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const q: Quiz[] = [];
      const { data } = await http.get("/quizzes");

      data.forEach((quiz: any) => {
        q.push({
          id: quiz.id,
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
          created_at: quiz.created_at,
          questions: quiz.questions
            ? quiz.questions.map((question: any) => ({
                id: question.id,
                isInPool: question.pool_order > -1,
                pool: question.pool_order,
                poolRequired: question.pool_required,
                type: question.type,
                order: question.order,
                content: question.content,
                note: question.note,
                mediaType: question.media_type,
                media: question.media,
                useTemplate: question.use_template,
                timeLimit: question.time_limit,
                haveTimeFactor: question.have_time_factor,
                timeFactor: question.time_factor,
                fontSize: question.font_size,
                layout: question.layout_idx,
                selectMin: question.select_min,
                selectMax: question.select_max,
                caseSensitive: question.case_sensitive,
                options: question.options
                  ? question.options.map((option: any) => {
                      if (
                        question.type === QuestionTypesEnum.CHOICE ||
                        question.type === QuestionTypesEnum.TRUE_FALSE
                      ) {
                        return {
                          id: option.id,
                          order: option.order,
                          color: option.color,
                          content: option.content,
                          mark: option.mark,
                          isCorrect: option.correct,
                        };
                      } else if (
                        question.type === QuestionTypesEnum.PARAGRAPH ||
                        question.type === QuestionTypesEnum.FILL_BLANK
                      ) {
                        return {
                          id: option.id,
                          order: option.order,
                          content: option.content,
                          mark: option.mark,
                          case_sensitive: option.case_sensitive,
                        };
                      } else if (question.type === QuestionTypesEnum.MATCHING) {
                        if (
                          (option as MatchingOption).type === "MATCHING_PROMPT"
                        ) {
                          return {
                            id: option.id,
                            type: "MATCHING_PROMPT",
                            content: option.content,
                            color: option.color,
                            order: option.order,
                            eliminate: option.eliminate,
                          };
                        } else if (
                          (option as MatchingOption).type === "MATCHING_OPTION"
                        ) {
                          return {
                            id: option.id,
                            type: "MATCHING_OPTION",
                            content: option.content,
                            color: option.color,
                            order: option.order,
                            eliminate: option.eliminate,
                          };
                        } else if (
                          (option as MatchingOption).type === "MATCHING_ANSWER"
                        ) {
                          return {
                            id: option.id,
                            type: "MATCHING_ANSWER",
                            prompt: option.prompt_id,
                            option: option.option_id,
                            mark: option.mark,
                          };
                        }
                      }
                    })
                  : [],
              }))
            : [],
        });
      });
      setQuizzes(q);
      setFilteredQuizzes(q);
    })();
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
        haveTimeFactor: true,
        timeFactor: "1",
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
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </Topbar>
  );
}
