import React from "react";
import { Container, Row, Col, Jumbotron } from "reactstrap";

const IndexPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Welcome to Reservation System</h1>
            <p>
              This is a system that allows users to reserve items with specific
              locations. You can log in to reserve items, view item
              availability, and manage your profile.
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default IndexPage;
