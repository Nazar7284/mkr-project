import { TypographyProps } from "@mui/material";

export interface ICardInfo {
  title: string;
  description: string;
  additionalInfo?: string;
  additionalSize?: TypographyProps["variant"];
}
