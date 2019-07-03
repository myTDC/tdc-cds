import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Creator.css';
//import ReaderNavigator from './ReaderNavigator';
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

let myModule = {
	heading: ['Main', 'Heading'],
	metaData: ['01/09/2109', 'Anonymous'],
	sectionData: {
		content: [''],
		media: ['https://cdn-images-1.medium.com/max/800/1*OEjZQSVvWnGgUF-dTrTS_w.jpeg'],
	},
};

const Section = (props) => {
	const [editorState, setEditorState] = useState(props.sectionData);
	const handleOnChange = (value) => {
		setEditorState(value);
		myModule.sectionData.content[props.sno - 1] = editorState;
	};
	return (
		<React.Fragment>
			<h5>Section {props.sno}</h5>
			<div className='section-grid'>
				<div>
					<ReactQuill className='quill' value={editorState} onChange={handleOnChange} />
				</div>
				<form>
					<h4>Section Heading : </h4> <input id='subHeading' placeholder='Title of this section' />
					<h4>Media : </h4> <input id='media' placeholder='Enter the URL of the slide' />
				</form>
			</div>
		</React.Fragment>
	);
};

const Creator = (props) => {
	const module = useSelector((state) => state.courses[props.course][props.module] || myModule);

	myModule.heading = [...module.heading];
	//console.log('this is module', myModule);
	let initialId = [];
	const [myArray, setMyArray] = useState(() => {
		module.sectionData.content.forEach(() => {
			initialId.push(makeid(5));
		});
		return initialId;
	});

	const [moduleData, setModuleData] = useState(myModule);
	const dispatch = useDispatch();

	const handleAdd = () => {
		setMyArray([...myArray, makeid(5)]);
	};

	const handleSubmit = () => {
		setModuleData(myModule);
		dispatch({
			type: 'DATA_UPDATE_COURSES',
			heading: moduleData.heading,
			author: moduleData.metaData[1],
			date: moduleData.metaData[0],
			media: moduleData.sectionData.media,
			content: moduleData.sectionData.content,
			course: props.course,
			module: props.module,
		});
	};
	return (
		<div id='parent' className='main-grid'>
			{myArray.map((unique, id) => (
				<Section key={unique} sno={id + 1} sectionData={module.sectionData.content[id]} />
			))}
			<button onClick={handleAdd}>Add</button>
			<button onClick={handleSubmit}>Save</button>
			<Link to={`/reader/${props.course}/${props.module}`}> Preview </Link>
		</div>
	);
};

export default Creator;
