import React from "react";
import { Container, Button, Row, CardGroup, Col } from "react-bootstrap";

import Contact from "./Contact";
import ContactForm from "./ContactForm";
import { userApi } from '../API/url';
import Header from "./Header"

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showAddform: false,
      lastId: 10,
      lastDeletedIndex: -1,
    };
  }
  componentDidMount() {
    fetch(userApi)
      .then((res) => res.json())
      .then((users) => {
        console.log(users);

        this.setState({
          users: users,
        });
      });
  }

  //show/hide add form
  toggleAddForm = (val) => {
    this.setState({
      showAddform: val,
    });
  };

  // handling adding new contact
  handleformSubmit = (user) => {
    const { users } = this.state;
    // correct the id of user
    user.id = this.state.lastId + 1;
    let newArray = [...users];
    newArray.push(user);
    this.setState({
      showAddform: false,
      lastId: user.id,
      users: [...newArray],
    });
    // scroll to the bottom
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };

  //handle update contact
  handleUpdateContact = (user) => {
    const { users, lastDeletedIndex } = this.state;
    user.id = user.userId;
    let newArray = [...users];
    let length = newArray.length;
    let { lastId } = this.state;
    let diff = lastId - length;
    if (user.id <= lastDeletedIndex) {
      newArray[user.id - 1] = user;
    } else {
      newArray[user.id - diff - 1] = user;
    }
    console.log(newArray);
    this.setState({
      users: newArray,
    });
  };

  // handle delete contact
  handleDeleteContact = (userId) => {
    const { users } = this.state;

    const filteredItems = users.filter((item) => item.id !== userId);

    //update users array
    this.setState({
      users: filteredItems,
      lastDeletedIndex: userId - 1,
    });
  };
  render() {
    const { users, showAddform } = this.state;
    console.log(users);
    return (
      <>
        <Container>
          <Row>
            {" "}
            <Header />
          </Row>
    
            <Button
              variant="primary"
              size="lg"
              className="text-center"
              onClick={() => this.toggleAddForm(!showAddform)}
            >
             Add New Contact
            </Button>
          {/* </Row> */}
          <Row className="mb-3">
            {showAddform ? (
              <ContactForm formSubmit={this.handleformSubmit} />
            ) : null}
          </Row>

          <Row className="d-flex justify-content-center">
            {users.map((user) => (
              <Col>
                <CardGroup>
                  <Contact
                    key={user}
                    user={user}
                    deleteContact={this.handleDeleteContact}
                    editContact={this.handleUpdateContact}
                  />
                </CardGroup>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}
export default ContactList;
