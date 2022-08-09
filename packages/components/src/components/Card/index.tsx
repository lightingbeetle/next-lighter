import React from "react";

import Card from "./Card";
import CardSection from "./CardSection";
import CardTitle from "./CardTitle";
import CardAction from "./CardAction";

const CardImage = (props: Omit<Card, "ref">) => (
  <CardSection type="image" isFilling {...props} />
);

CardImage.displayName = "CardImage";

export { CardSection, CardImage, CardTitle, CardAction };
export default Card;
