import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { ICardInfo } from "../types";

const CardInfo: React.FC<ICardInfo> = ({
  title,
  description,
  additionalInfo,
  additionalSize,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 200,
        margin: "0 auto 20px",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography variant={additionalSize ?? "h4"} color="primary">
          {additionalInfo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
