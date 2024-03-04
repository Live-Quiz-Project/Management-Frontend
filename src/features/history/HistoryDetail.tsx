import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import QuestionItem from "./components/QuestionItem";

export default function HistoryDetail() {
  const filterTypes = [
    { key: "1", label: "Questions" },
    { key: "2", label: "Paticipants" },
  ];

  const sortingFilter = [
    { key: "1", label: "Asc" },
    { key: "2", label: "Dsc" },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-2xl">Parabola Quiz</p>
      <div className="flex">
        <div className="pr-2">
          <SearchField onSearch={() => {}} />
        </div>
        <div className="pr-2">
          <AppDropdown items={filterTypes} indexSelected={1} minWidth={130} />
        </div>
        <div className="pr-2">
          <AppDropdown items={sortingFilter} indexSelected={1} minWidth={100} />
        </div>
      </div>
      <QuestionItem title="What is the capital city of Thailand" data={[]} />
    </div>
  );
}
