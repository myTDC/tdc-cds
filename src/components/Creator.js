import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Creator.css';
import Reader from './Reader';

const Section = (props) => {
	const [editorState, setEditorState] = useState('');
	return (
		<React.Fragment>
			<h5>Section {props.sno}</h5>
			<div className='section-grid'>
				<div>
					<ReactQuill value={editorState} onChange={setEditorState} />
				</div>
				<div>
					<ReactQuill value={editorState} onChange={setEditorState} />
				</div>
			</div>
		</React.Fragment>
	);
};

const Creator = (props) => {
	let count = 0;
	const [children, setChildren] = useState([0]);
	const addSection = () => {
		setChildren([...children, ++count]);
	};
	return (
		<div className='main-grid'>
			{children.map((id) => (
				<Section key={id} sno={++count} />
			))}
			<button onClick={addSection}>Add</button>
		</div>
	);
};

export default Creator;
