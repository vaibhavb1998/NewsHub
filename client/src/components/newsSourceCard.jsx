import React, { useState } from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const NewsSourceCard = (props) => {
  return (
    <div>
      <Card
        hoverable
      >
        <Meta title={props.name} description={props.description} />
      </Card>
    </div>
  );
}

export default NewsSourceCard;