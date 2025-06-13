import React from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../../components/Helmet/Meta';
import './FarmerStyle.css'

const FarmerScreen = () => {
    return (
        <div>
            <Meta
                title="Agroic | Farmers"
            />
            <Container className='farmerContainer'>
                <h1 className='title'>FARMER</h1>
                <h4 className="farmer-title">If you are a farmer then you are at perfect platfrom from where you can order all of your farming related products and you can sell your production also.</h4>
                {/* <Row className="row-one justify">
                    <CardDeck>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Purchase Seeds, Pesticides & Fertilizer</Card.Title>
                                <LinkContainer to="/farmers/purchaseSeeds">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Sell Your Producing Material through Us</Card.Title>
                                <LinkContainer to="/login?redirect=supplier">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Lend All of Heavy Machine And Tractros</Card.Title>
                                <LinkContainer to="/farmers/lendMachines">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row> */
                
                <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="card-titile text-center">
                        Purchase Seeds, Pesticides & Fertilizer
                        </Card.Title>
                        <LinkContainer to="/farmers/purchaseSeeds">
                        <Button className="btn-explore mt-auto">EXPLORE MORE</Button>
                        </LinkContainer>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="card-titile text-center">
                        Sell Your Producing Material through Us
                        </Card.Title>
                        <LinkContainer to="/login?redirect=supplier">
                        <Button className="btn-explore mt-auto">EXPLORE MORE</Button>
                        </LinkContainer>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="card-titile text-center">
                        Lend All of Heavy Machine And Tractros
                        </Card.Title>
                        <LinkContainer to="/farmers/lendMachines">
                        <Button className="btn-explore mt-auto">EXPLORE MORE</Button>
                        </LinkContainer>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>

                                
                
                
                }
            </Container>
        </div>
    )
}

export default FarmerScreen
