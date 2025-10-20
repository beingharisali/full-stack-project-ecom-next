import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent({title, desc, price, image, id}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} className='h-[200px]' />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {desc}
        </Card.Text>
        <Button variant="primary">${price}</Button>
      </Card.Body>
    </Card>
  )
}

export default CardComponent
