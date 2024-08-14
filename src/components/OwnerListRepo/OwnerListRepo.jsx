// src/OwnerListRepo.js
import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './OwnerListRepo.css'; // Import custom CSS for additional styling

const OwnerListRepo = () => {
    const { owner } = useParams();
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${owner}/repos`);
                setRepositories(response.data);
            } catch (err) {
                setError('Error fetching owner repositories');
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [owner]);

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
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Repositories by {owner}</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {repositories && repositories.length > 0 ? (repositories.map(repo => (
                        <tr key={repo.id}>
                            <td>
                                <Link to={`/repo/${repo.owner.login}/${repo.name}`} className="text-decoration-none text-dark">
                                    {repo.name}
                                </Link>
                            </td>
                            <td>{repo.description || 'No description available'}</td>
                            <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                        </tr>
                    ))) : (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default OwnerListRepo;
