import React /*useState, useEffect*/ from 'react';
import { Link } from '@reach/router';
//import { courses } from '../res/demo/res';

const ModuleCard = (props) => {
	const modules = [...Object.values(props.course)];

	return (
		<div className='main'>
			<ul>
				{modules.map((mod, i) => (
					<li key={i}>
						<Link to={`/reader/${props.courseTitle}/${i + 1}`}>{mod.heading}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ModuleCard;
