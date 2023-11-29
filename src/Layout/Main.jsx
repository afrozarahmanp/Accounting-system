import React from 'react';
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Col, Container, Row } from "react-bootstrap";
import LeftNav from '../Shared/Navbar/LeftNav';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <Row>
                    <Col sm={3}>
                        <LeftNav></LeftNav>
                    </Col>
                    <Col sm={9}>
                        <Outlet></Outlet>
                    </Col>
                    
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Main;