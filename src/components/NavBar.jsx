import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';



function NavBar() {

    const { userId } = useUser();
    return (

        <header id="navBar">
            <div>
                <NavLink to='/Info'>Info</NavLink>
                <NavLink to="/Todos">Todos</NavLink>
                <NavLink to="/Posts">Posts</NavLink>
                <NavLink to="/Albums">Albums</NavLink>
            </div>
            {!userId ? <NavLink to='/Login'>LogIn</NavLink> : <NavLink id='logOutButton' to="/">Logout</NavLink>}


        </header>
    );
}

export default NavBar;