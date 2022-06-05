import React from 'react';
import { Button,Card,ListGroup,ListGroupItem,Row } from 'react-bootstrap';
import UpdateContact from './UpdateContact';
const divStyles = {
  // boxShadow: '1px 2px 9px #F4AAB9',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  width:'22rem'
};

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showUpdateForm:false,
            hideCard:false,
        };
    }

    //hide update from
    hideUpdateContactForm=()=>{
        this.setState({
            showUpdateForm:false,
            hideCard:false,
        });
    };

    handleContactEdit=()=>{
        this.setState({
            showUpdateForm:true,
            hideCard:true,
        });
    };

    handleDeleteContact=(userId)=>{
        let url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        fetch(url,{
            method:'DELETE',
        }).then((res)=>{
            if(res.status===200){
                this.props.deleteContact(userId);
            }
        });
    };

    render(){
        const { user,editContact } = this.props;
        const { id,name,email,phone,address }=user;
        const { showUpdateForm , hideCard } = this.state;
        const ColoredLine = ({ color }) =>(
            <hr 
              style={{
                  color:color,
                  backgroundColor:color,
                  height:5,
              }}
              />
        );

        return (
          <>
            <Row>
              {" "}
              {showUpdateForm ? (
                <UpdateContact
                  updateContact={editContact}
                  user={user}
                  hideForm={this.hideUpdateContactForm}
                />
              ) : null}
            </Row>
            {!hideCard && (
              <Row>
                <div
                  style={divStyles}
                  className="mt-3"
                  border="secondary"
                >
                  <Card.Body>
                    <Card.Title>Contact Card</Card.Title>
                  </Card.Body>
                  {/* <ColoredLine color="blue" /> */}
                 
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>User Id : {id}</ListGroupItem>
                    <ListGroupItem>User Name  : {name}</ListGroupItem>
                    <ListGroupItem>User Email  : {email}</ListGroupItem>
                    <ListGroupItem>User Phone  : {phone}</ListGroupItem>
                    <ListGroupItem>User Address  : {address.city}</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                  <Button variant="success" onClick={this.handleContactEdit}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => this.handleDeleteContact(id)}
                    >
                      Delete
                    </Button>
                    </Card.Body>
                </div>
              </Row>
            )}
          </>
        );
    }
}
export default Contact;