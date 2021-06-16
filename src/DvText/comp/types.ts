import { CSSProperties } from "react";

export interface DvTextProps {
  text: string;
  onClick: () => void
  edit?: boolean;
  fontSize: number;
  color: string;
  font: any;
  style?: CSSProperties;
}
