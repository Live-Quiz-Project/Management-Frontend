import AppDropdown from "@/common/layouts/main/components/AppDropdown";
import SearchField from "@/common/layouts/main/components/SearchField";
import QuestionItem from "./components/QuestionItem";
import { useMemo, useState } from "react";
import { MenuProps } from "antd";

export default function HistoryDetail() {
  const [viewTypeFiltered, setViewTypeFiltered] = useState(defaultViewTypeFiltered)
  const [sortingFiltered, setSortingFiltered] = useState(defaultSortingFilteredFiltered)

  const viewTypeDropdownData = useMemo<MenuProps['items']>(() => {
    const newRowDropdown = defaultViewType.map(item => ({
      key: item.id.toString(),
      label: <div className='text-sm '>{item.viewType}</div>,
      onClick: () => {
        handleViewTypeDropdownChange(item.id.toString(), 'viewTypeSelected')
      },
    }))

    return [...newRowDropdown]
  }, [defaultViewType])

  const handleViewTypeDropdownChange = (key: string, fieldName: string) => {
    setViewTypeFiltered(prevState => ({
      ...prevState,
      [fieldName]: Number.parseInt(key),
    }))
  }

  const sortingDropdownData = useMemo<MenuProps['items']>(() => {
    const newRowDropdown = defaultSorting.map(item => ({
      key: item.id.toString(),
      label: <div className='text-sm '>{item.viewType}</div>,
      onClick: () => {
        handleSortingDropdownChange(item.id.toString(), 'sortingSelected')
      },
    }))

    return [...newRowDropdown]
  }, [defaultViewType])

  const handleSortingDropdownChange = (key: string, fieldName: string) => {
    setSortingFiltered(prevState => ({
      ...prevState,
      [fieldName]: Number.parseInt(key),
    }))
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-serif">Parabola Quiz</p>
      <div className="flex">
        <div className="pr-2">
          <SearchField onSearch={() => {}} keyword={''} setKeyword={() => {}} />
        </div>
        <div className="pr-2">
          <AppDropdown items={viewTypeDropdownData} indexSelected={viewTypeFiltered.viewTypeSelected} minWidth={130} />
        </div>
        <div className="pr-2">
          <AppDropdown items={sortingDropdownData} indexSelected={sortingFiltered.sortingSelected} minWidth={100} />
        </div>
      </div>
      <QuestionItem 
      title="What is the capital city of Thailand"
      data={[]}
      />
    </div>
  );
}

interface IViewTypeFiltered {
  viewTypeText: string
  viewTypeSelected: number
}

const defaultViewTypeFiltered: IViewTypeFiltered = {
  viewTypeText: '',
  viewTypeSelected: 0,
}

interface IViewType {
  id: number
  viewType: string
}

const defaultViewType : IViewType[] = [
  {
    id: 0,
    viewType: "Questions",
  },
  {
    id: 1,
    viewType: "Paticipants",
  }
]

interface ISortingFiltered {
  sortingText: string
  sortingSelected: number
}

const defaultSortingFilteredFiltered: ISortingFiltered = {
  sortingText: '',
  sortingSelected: 0,
}

interface ISorting {
  id: number
  viewType: string
}

const defaultSorting : ISorting[] = [
  {
    id: 0,
    viewType: "Asc",
  },
  {
    id: 1,
    viewType: "Dsc",
  }
]