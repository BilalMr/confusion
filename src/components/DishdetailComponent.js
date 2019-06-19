import React, {Component} from 'react'

import {Card, CardTitle, CardText, CardImg, CardBody} from 'reactstrap'

class DishDetail extends Component{

     DateConvert (date) {
        const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const year = date.slice(0,4)
        const month = monthList[date.slice(5,7)-1]
        const day = parseInt(date.slice(8,10)) + 1
        return `${month} ${day}, ${year}`
        }
    
    renderComments(comments){
        if (comments){
            return(
                <div>
                    <h4>Comments</h4>
    
                    {comments.map(comment => <ul key={comment.id} className='list-unstyled'>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>)}
                </div>
            )
        }
        return <div></div>
    
    }

    render(){
        const dish = this.props.dish
        
        if (dish){
            return(
                <div className='container'>
                      <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardImg width='100%' src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle heading = 'true' >{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>   
                        </Card> 
                    </div>

                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(dish.comments)}
                    </div>

                </div>
                </div>
              
            )
        }
        else{
            return <div></div>
        }
      
    }
}

export default DishDetail