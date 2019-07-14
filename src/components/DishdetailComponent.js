import React from 'react'
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

import {Loading} from './LoadingComponent'

import {Card, CardTitle, CardText, CardImg, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Row, Label, Col, ModalBody, Button} from 'reactstrap'
import {LocalForm, Control, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


    class CommentForm extends React.Component{
        constructor(props){
            super(props)

            this.state = {
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }

        toggleModal(){
            this.setState(prevState =>{
                return {isModalOpen: !prevState.isModalOpen}
            })
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);        }

        render(){
            return( <div>
                        <button onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</button>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.state.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={this.handleSubmit}>
                                    
                                    <Row>
                                        <Label htmlFor='rating' md={12}>Rating</Label>
                                        <Col md={12}>
                                            <Control.select model='.rating' className='form-control' name='rating'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className='form-group'>
                                    <Label htmlFor='author' md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model='.author' id='author' name='author' placeholder='Your Name' className='form-control'
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                    </Col>
                                    </Row>

                                    <Row className='form-group'>
                                        <Label htmlFor='feedback' md={12}>Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea model='.comment'  id='comment' name='comment' rows='6' className='form-control' />
                                        </Col>
                                    </Row>

                                    <Row className='form-group'>
                                        <Col md={12}>
                                            <Button type='submit' color='primary'>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody> 
                        </Modal>
                    </div>
            )
        }
    }
    
    const RenderDish = ({dish}) =>{ 
        if (dish){
            return(
                <Card>
                       <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
         
    const RenderComments = ({comments, addComment, dishId}) =>{
        if (comments){
            return(
                <div>
                    <h4>Comments</h4>
                    {comments.map(comment => <ul key={comment.id} className='list-unstyled'>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>)}
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            )
        }
        return <div></div>
    }



    const DishDetail = (props) => {

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else if (props.dish != null){
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
                        <RenderComments comments={props.comments}  addComment={props.addComment}
                                        dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
            );
    }
        
}  
        
     
      
    


export default DishDetail