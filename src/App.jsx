import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import OwnerListRepo from './components/OwnerListRepo/OwnerListRepo'
import GithubRepoDetailsPage2 from './components/GithubRepoDetailsPage/GithubRepoDetailsPage2'


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/repo/:owner/:repo' element={<GithubRepoDetailsPage2 />} />
          <Route path='owner/:owner' element={<OwnerListRepo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
