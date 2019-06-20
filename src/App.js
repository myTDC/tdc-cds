import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
//import { CSSTransition } from 'react-transition-group';
import { Dashboard, Creator, Navbar, ReaderNavigator } from './components/index';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses);

	const [isFetchingCourses, toggleFetchingCourses] = useState(true);
	useEffect(() => {
		dispatch({ type: 'DATA_SET_COURSES' });
	}, [dispatch]);

	useEffect(() => {
		if (courses !== null && courses !== undefined)
			setTimeout(() => toggleFetchingCourses(false), 1000);
	}, [courses]);

	return (
		<div className='App'>
			{isFetchingCourses ? (
				<p> Loading </p>
			) : (
				<>
					<Navbar />
					<Router>
						<Dashboard courses={courses} path='/dashboard' />
						<ReaderNavigator path='/reader/:course/:module' />
						<Creator path='/contentCreator' />
					</Router>{' '}
				</>
			)}
		</div>
	);
}

export default App;
