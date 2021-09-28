import React from 'react';
import ContentItem from './ContentItem';

const Content = ({ items }) => {
  return items.map((item, i) => <ContentItem key={i} {...item} />);
};

export default Content;
