import React from 'react';
import { Link } from '@reach/router';

const Navbar = () => {
	return (
		<header className='App-header'>
			<nav>
				<Link to='/'>Home</Link> <Link to='/dashboard'> Dashboard</Link>{' '}
			</nav>
		</header>
	);
};

export default Navbar;
