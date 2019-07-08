import React, { useState } from 'react';
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
		subHeading: [''],
		content: [''],
		media: [
			'https://images.unsplash.com/photo-1562356759-d42686d03a61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
		],
	},
};

const Section = (props) => {
	const [editorState, setEditorState] = useState(props.sectionData || '');
	const [form, setFormState] = useState({
		subheading: props.subheading,
		media:
			props.media ||
			'https://images.unsplash.com/photo-1562356759-d42686d03a61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
	});

	const handleOnChange = (value) => {
		setEditorState(value);
		setWordCounter(editorState.split(' ').length);
		myModule.sectionData.content[props.sno - 1] = editorState;
	};

	const handleSubheadingChange = (e) => {
		setFormState({ ...form, subheading: e.target.value });
		myModule.sectionData.subHeading[props.sno - 1] = form.subheading;
	};
	const handleMediaChange = (e) => {
		setFormState({ ...form, media: e.target.value });
		myModule.sectionData.media[props.sno - 1] = form.media;
	};

	const [wordCounter, setWordCounter] = useState(editorState.split(' ').length);

	return (
		<React.Fragment>
			<div className='section-grid'>
				<div>
					<form className='section-form'>
						<input
							className='subheading'
							onChange={handleSubheadingChange}
							value={form.subheading}
							id='subHeading'
							placeholder='Title of this section'
						/>
					</form>
					<ReactQuill
						className='quill'
						value={editorState}
						onChange={(value) => handleOnChange(value)}
					/>
				</div>

				<div className='section-media'>
					<form className='section-form'>
						<h4>Media : </h4>{' '}
						<input
							onChange={handleMediaChange}
							value={form.media}
							id='media'
							placeholder='Enter the URL of the slide'
						/>
					</form>
					<img src={form.media} alt='' width='600px' />
				</div>
			</div>
			<div className='divider'>
				<button onClick={() => props.handleDelete(props.sno - 1)}>-Delete-</button>
				<br />
				Section No. - {props.sno} | Word Count - {wordCounter}
			</div>
		</React.Fragment>
	);
};

const Creator = (props) => {
	const mod = {
		heading: [''],
		metaData: ['', ''],
		sectionData: {
			subHeading: [''],
			content: [''],
			media: [
				'https://images.unsplash.com/photo-1562356759-d42686d03a61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
			],
		},
	};
	const module = useSelector((state) => state.courses[props.course][props.module] || mod);
	myModule.heading = [...module.heading];
	myModule.metaData = [...module.metaData];
	myModule.sectionData.subHeading = [...module.sectionData.subHeading];
	myModule.sectionData.content = [...module.sectionData.content];
	myModule.sectionData.media = [...module.sectionData.media];

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

	const handleDelete = (id) => {
		const arr = [...myArray];
		setMyArray(arr.filter((element) => arr.indexOf(element) !== id));
		const newContent = myModule.sectionData.content.filter(
			(element) => myModule.sectionData.content.indexOf(element) !== id
		);
		const newMedia = myModule.sectionData.media.filter(
			(element) => myModule.sectionData.media.indexOf(element) !== id
		);
		const newSubHeading = myModule.sectionData.subHeading.filter(
			(element) => myModule.sectionData.subHeading.indexOf(element) !== id
		);

		dispatch({
			type: 'DATA_UPDATE_COURSES',
			heading: [
				headingForm.heading.slice(0, headingForm.heading.lastIndexOf(' ')),
				headingForm.heading.split(' ').splice(-1),
			],
			author: headingForm.author,
			date: headingForm.date,
			subHeading: newSubHeading,
			media: newMedia,
			content: newContent,
			course: props.course,
			module: props.module,
		});
	};

	const handleSubmit = () => {
		setModuleData(myModule);
		console.log(myModule);
		dispatch({
			type: 'DATA_UPDATE_COURSES',
			heading: [
				headingForm.heading.slice(0, headingForm.heading.lastIndexOf(' ')),
				headingForm.heading.split(' ').splice(-1),
			],
			author: headingForm.author,
			date: headingForm.date,
			subHeading: moduleData.sectionData.subHeading,
			media: moduleData.sectionData.media,
			content: moduleData.sectionData.content,
			course: props.course,
			module: props.module,
		});
	};

	const [headingForm, setHeadingForm] = useState({
		heading: module.heading.join(' '),
		author: module.metaData[1],
		date: module.metaData[0],
	});

	const handleHeadingChange = (e) => {
		setHeadingForm({ ...headingForm, heading: e.target.value });
	};

	const handleAuthorChange = (e) => {
		setHeadingForm({ ...headingForm, author: e.target.value });
	};

	const handleDateChange = (e) => {
		setHeadingForm({ ...headingForm, date: e.target.value });
	};

	return (
		<>
			<form className='heading-form'>
				<textarea
					className='header'
					value={headingForm.heading}
					onChange={handleHeadingChange}
					id='heading'
					placeholder='Module Title'
				/>
				<br />
				<input
					className='author'
					value={headingForm.author}
					onChange={handleAuthorChange}
					id='author'
					placeholder='Author'
				/>
				<input
					className='date'
					value={headingForm.date}
					onChange={handleDateChange}
					id='date'
					placeholder='Date'
				/>
			</form>
			<div id='parent' className='main-grid'>
				{myArray.map((unique, id) => (
					<Section
						key={unique}
						sno={id + 1}
						sectionData={module.sectionData.content[id]}
						subheading={module.sectionData.subHeading[id]}
						media={module.sectionData.media[id]}
						handleDelete={handleDelete}
					/>
				))}
				<div className='control'>
					<button onClick={handleAdd}>-Add-</button> <br />
					<button onClick={handleSubmit}>-Save-</button> <br />
					<Link className='linker' to={`/reader/${props.course}/${props.module}`}>
						Preview
					</Link>
				</div>
			</div>
		</>
	);
};

export default Creator;
