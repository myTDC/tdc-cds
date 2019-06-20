import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Creator.css';
//import Reader from './Reader';

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const Section = (props) => {
	const [editorState, setEditorState] = useState('');
	const handleOnChange = (input) => {
		setEditorState(input);
	};

	return (
		<React.Fragment>
			<h5>Section {props.sno}</h5>
			<div className='section-grid'>
				<div>
					<ReactQuill value={editorState} onChange={handleOnChange} />
				</div>
			</div>
		</React.Fragment>
	);
};

const Creator = (props) => {
	let [myArray, setMyArray] = useState([makeid(5)]);

	const handleAdd = () => {
		setMyArray([...myArray, makeid(5)]);
	};
	return (
		<div id='parent' className='main-grid'>
			{myArray.map((unique, id) => (
				<Section key={unique} sno={++id} />
			))}
			<button onClick={handleAdd}>Add</button>
		</div>
	);
};

export default Creator;
