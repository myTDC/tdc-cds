import React from 'react';
import ModuleCard from './ModuleCard';

const Dashboard = (props) => {
	return (
		<div className='dash'>
			{Object.keys(props.courses).map((course, i) => (
				<React.Fragment key={i}>
					{' '}
					<h2 className='coverHeading'>
						{course} <span>module</span>{' '}
					</h2>
					<ModuleCard key={i} courseTitle={course} course={props.courses[course]} />{' '}
				</React.Fragment>
			))}
		</div>
	);
};

export default Dashboard;
