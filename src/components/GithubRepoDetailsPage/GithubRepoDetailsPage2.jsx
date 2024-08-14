import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, ListGroup, Button } from 'react-bootstrap';
import './GithubRepoDetailsPage.css';
import FavoriteButton from '../FavoriteButton'

const GithubRepoDetailsPage2 = () => {
    const { owner, repo } = useParams();
    const [repoDetails, setRepoDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
                setRepoDetails(response.data);
            } catch (err) {
                setError('Failed to fetch repository details');
            } finally {
                setLoading(false);
            }
        };

        fetchRepoDetails();
    }, [owner, repo]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <h4>{error}</h4>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0">
                        <Card.Body>
                            <Card.Title className="text-center">{repoDetails.full_name} <FavoriteButton repoId={repoDetails.id} /></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-center">{repoDetails.description}</Card.Subtitle>
                            <Row className="mb-3 text-center">
                                <Col>
                                    <Badge bg="primary" className="mx-2">Stars: {repoDetails.stargazers_count}</Badge>
                                </Col>
                                <Col>
                                    <Badge bg="success" className="mx-2">Forks: {repoDetails.forks_count}</Badge>
                                </Col>
                                <Col>
                                    <Badge bg="warning" className="mx-2">Issues: {repoDetails.open_issues_count}</Badge>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} className="text-center">
                                    <Card.Img src={repoDetails.owner.avatar_url} alt={repoDetails.owner.login} roundedcircle="true" className="mb-3" />
                                    <Card.Text>
                                        <strong>Owner:</strong> {repoDetails.owner.login}
                                    </Card.Text>
                                </Col>
                                <Col md={8}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <strong>Language:</strong> {repoDetails.language}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>License:</strong> {repoDetails.license?.name || 'No license'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Created At:</strong> {new Date(repoDetails.created_at).toLocaleDateString()}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Last Updated:</strong> {new Date(repoDetails.updated_at).toLocaleDateString()}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <div className="text-center mt-4">
                                <Button href={repoDetails.html_url} target="_blank" variant="primary">
                                    Visit Repository
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GithubRepoDetailsPage2;
