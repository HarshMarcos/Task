import React from 'react'
import GithubRepos from './GithubRepoPage/GithubRepos'
import NavigationBar from './NavigationBar/NavigationBar'


const Home = () => {
    return (
        <>
            <NavigationBar />
            <GithubRepos />
        </>
    )
}

export default Home