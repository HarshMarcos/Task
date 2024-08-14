import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GithubRepos.css'
import Spinner from 'react-bootstrap/Spinner';
import FavoriteButton from '../FavoriteButton'

const GithubRepos = () => {
    const [githubRepositories, setGithubRepositories] = useState([]);

    useEffect(() => {
        axios.get('https://api.github.com/repositories')
            .then(response => setGithubRepositories(response.data))
            .catch(error => console.log("Something went wrong...", error));
    }, [])
    return (
        <Container className='container'>
            <h3>Repositories : </h3>
            {githubRepositories && githubRepositories.length > 0 ? (
                githubRepositories.map((repo) => (
                    <Stack gap={4} key={repo.id}>
                        <Card className="card">
                            <Card.Body>
                                <Card.Title>
                                    <strong>Repository Name : </strong>
                                    <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
                                    <FavoriteButton repoId={repo.id} />
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    <strong>Username : </strong>
                                    <Link to={`/owner/${repo.owner.login}`}>{repo.owner.login}</Link>
                                </Card.Subtitle>
                                <Card.Text>{repo.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Stack>
                ))
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </Container>
    )
}

export default GithubRepos