import FilledButton from "@/common/components/buttons/FilledButton";
import SearchBar from "@/common/components/inputs/SearchBar";
import QuizCard from "@/features/library/components/main/QuizCard";
import usePrivateFetch from "@/common/hooks/usePrivateFetch";
import { FormEvent, useEffect, useState } from "react";
import Topbar from "@/common/layouts/main/components/Topbar";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Library() {
  const http = usePrivateFetch();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let q: Quiz[] = [];
        const { data } = await http.get("/quizzes");
        data.map(
          (quiz: {
            id: string;
            title: string;
            description: string;
            creator_id: string;
            cover_image: string;
            questions: any;
          }) => {
            q.push({
              id: quiz.id,
              title: quiz.title,
              description: quiz.description,
              creatorId: quiz.creator_id,
              coverImg: quiz.cover_image,
              questions: quiz.questions,
            });
          }
        );
        setQuizzes(q);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleOnCreateQuiz(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newUuid = uuid();
    navigate(`/library/quiz/${newUuid}`);
  }

  return (
    <Topbar>
      <div className="space-y-4">
        <p className="font-serif text-header-1">Library</p>
        <div className="flex justify-between">
          <FilledButton
            onClick={handleOnCreateQuiz}
            className="bg-pastel-orange"
          >
            &#43; Create Quiz
          </FilledButton>
          <SearchBar className="" keyword={search} setKeyword={setSearch} />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-12 border-b-2 border-b-pastel-orange">
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
