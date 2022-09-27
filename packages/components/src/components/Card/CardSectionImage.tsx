import React from "react";
import Card from "./Card";
import CardSection from "./CardSection";

const CardSectionImage = (props: Omit<Card, "ref">) => (
  <CardSection className="card__section--image" isFilling {...props} />
);

CardSectionImage.displayName = "CardSectionImage";

export default CardSectionImage;