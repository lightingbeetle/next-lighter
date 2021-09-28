import React from 'react';

const ContentItem = ({ name, attributes, originalContent, innerBlocks }) => {
  switch (name) {
    case 'core/paragraph':
      return <p>{attributes.content}</p>;
    default:
      return <div dangerouslySetInnerHTML={{ __html: originalContent }} />;
  }
};

export default ContentItem;
