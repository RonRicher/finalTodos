import { Route, Routes } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Albums from './Albums';
import Info from './Info';
import Login from './Login';
import NavBar from './NavBar';
import Posts from './Posts';
import Todos from './Todos';

function Header() {



    return (
        <>
            {true ? (
            <>
                <NavBar />
                <Routes>
                    <Route path='/' element={<h1>Home</h1>} />
                    <Route path='/login' element={<Login />} />
                    <Route path={`users/:id/`}>
                    
                    <Route path='Info' element={<Info />} />
                    <Route path='Todos' element={<Todos />} />
                    <Route path='Posts' element={<Posts />} />
                    <Route path='Albums' element={<Albums />} />
                    </Route>
                </Routes>
            </>
            ) : (
            <>
                <h1>dddddddd</h1>

            </>
            )}
        </>

    )

}

export default Header;