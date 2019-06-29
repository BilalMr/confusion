import React from 'react'
import { Link } from 'react-router-dom';

import {Card, CardTitle, CardText, CardImg, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap'


    

    const RenderDish = ({dish}) =>{ 
        if (dish){
            return(
                <Card>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle heading = 'true' >{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>   
                </Card>
            )
        }
        else{
            return <div></div>
        }
    }
         
    const RenderComments = ({comments}) =>{
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


    const DishDetail = (props) => {
        if (props.dish){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
    }
        
}  
        
     
      
    


export default DishDetail