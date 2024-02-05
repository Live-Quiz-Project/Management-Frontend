import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<StoreRootState> = useSelector;

export default useTypedSelector;
