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
      <Flex>
        <FilledButton
          className="w-fit bg-koromiko"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${auth.value.token}`
            )
          }
        >
          Join
        </FilledButton>
        <p className="font-serif pt-1 px-4">or</p>
        <FilledButton onClick={onCreateQuiz} className="bg-koromiko">
          &#43; Create Quiz
        </FilledButton>
      </Flex>
      <div className="rounded-xl bg-white px-4 py-6 h-full">
        <div className="">
          <p className="font-serif text-xl pb-2">Recent lives</p>
          <Flex className="justify-around rounded-xl bg-peach px-4 py-4">
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1211589257601355827/article_210424_0.png?ex=65eebf6d&is=65dc4a6d&hm=d917db439475b278b0380848d9ff138a145c26b65539bc074d1fcc0bf1b7b571&=&format=webp&quality=lossless&width=1210&height=712"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1211589402606964797/1000_F_451252677_NYrDRHhFQ8bGqCukaHjcvnP7tzhLCfxL.png?ex=65eebf8f&is=65dc4a8f&hm=5b80ca5094251c764fa1480ad5d5c4f8671f6ff22b8caf0f08b16ceedc70ce0d&=&format=webp&quality=lossless&width=1210&height=745"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1211589324391448586/main-qimg-d526ae7e6659634754593e815acf764a-lq.png?ex=65eebf7d&is=65dc4a7d&hm=5066edbc09a27fa1ea91fd12a314011f239787fbef0f599a3f504dfcd44bef93&=&format=webp&quality=lossless&width=1324&height=882"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1211589324391448586/main-qimg-d526ae7e6659634754593e815acf764a-lq.png?ex=65eebf7d&is=65dc4a7d&hm=5066edbc09a27fa1ea91fd12a314011f239787fbef0f599a3f504dfcd44bef93&=&format=webp&quality=lossless&width=1324&height=882"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
          </Flex>
        </div>
        <div className="pt-8 ">
          <p className="font-serif text-xl pb-2">My Quizes</p>
          <Flex className="justify-around rounded-xl bg-peach px-4 py-4">
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1211589257601355827/article_210424_0.png?ex=65eebf6d&is=65dc4a6d&hm=d917db439475b278b0380848d9ff138a145c26b65539bc074d1fcc0bf1b7b571&=&format=webp&quality=lossless&width=1210&height=712"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1205172567317422140/math-102023-1281244731-01.png?ex=65e9dc6b&is=65d7676b&hm=f659b1905ae896142058c562b2bec9e378a95afb7c311f5ae1c701d60f33fafa&=&format=webp&quality=lossless&width=1150&height=770"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1205172679750197340/1000_F_280126582_Ig4OLIbbSryXwe2S63aBu2TKY0Bj9WjH.png?ex=65e9dc85&is=65d76785&hm=c25265f67d8a0573daa80b06bfb0618016b940b1283d6994ed2da51f662bcbff&=&format=webp&quality=lossless&width=1157&height=770"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover mr-4 cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
            <img
              src="https://media.discordapp.net/attachments/988486551275200573/1205172750059175998/20231222_cpub_bii_header-1703185204173.png?ex=65e9dc96&is=65d76796&hm=e1f6bcba4113e7cdd1831c41d2ed1156b366c54ad4ff01439d0ef9de549b2e89&=&format=webp&quality=lossless&width=1163&height=770"
              alt="Image"
              className="h-40 w-screen rounded-xl border-2 border-regent-gray object-cover cursor-pointer hover:border-pastel-orange transform transition duration-500 
              hover:scale-110"
            />
          </Flex>
        </div>
      </div>
    </Topbar>
  );
}
