import { FocusEventHandler, FormEvent } from "react";
import { EditableMathField, MathField, addStyles } from "react-mathquill";

type Props = {
  latex?: string;
  onChange?: (mf: MathField) => void;
  onBeforeInput?: (e: FormEvent<HTMLSpanElement>) => void;
  onBlur?: FocusEventHandler<HTMLSpanElement>;
};

addStyles();

export default function EquationInput(props: Props) {
  return <EditableMathField {...props} />;
}
