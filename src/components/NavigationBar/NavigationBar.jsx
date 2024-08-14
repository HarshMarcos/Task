import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css'
import { useSelector } from 'react-redux';

const NavigationBar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const repoName = useSelector((state) => state.repoName.repoName);
    // const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('bg-dark', !darkMode);
        document.body.classList.toggle('text-light', !darkMode);
    };

    return (
        <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="custom-navbar">
            <Navbar.Brand href="/">GitHub Repos</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto d-flex align-items-center">
                    <Form inline="true" onSubmit={handleSearch} className="d-flex align-items-center form-search">
                        <FormControl
                            type="text"
                            placeholder="Search Repositories"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="primary" type="submit" className="search-button">Search</Button>
                    </Form>
                </Nav>
                <div className="ml-auto d-flex align-items-center">
                    <ToggleButtonGroup type="radio" name="darkMode" value={darkMode ? 1 : 0} onChange={handleToggleDarkMode} className="toggle-buttons">
                        <ToggleButton id="tbg-dark" value={1} variant="outline-secondary">
                            <FontAwesomeIcon icon={faMoon} />
                        </ToggleButton>
                        <ToggleButton id="tbg-light" value={0} variant="outline-secondary">
                            <FontAwesomeIcon icon={faSun} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
