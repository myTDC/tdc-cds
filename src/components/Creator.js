import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Creator.css';

//Function to generate unique ids for sections
function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
const [content, media, subHeading] = ['content', 'media', 'subHeading'];
const dummyMedia =
	'https://images.unsplash.com/photo-1562356759-d42686d03a61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80';

/***********************************************************************************/
/*------------------------------component for Sections-----------------------------*/
/***********************************************************************************/
const Section = (props) => {
	const sno = props.sno;
	const sectionContent = props.sectionContent;
	const subheading = props.subheading;
	const defaultMedia = props.media;

	//Hook for Quill State
	const [editorState, setEditorState] = useState(sectionContent || '');

	//Hook for word count of section content
	const [wordCounter, setWordCounter] = useState(editorState.split(' ').length);

	//Hook for Heading and Media form fields
	const [form, setFormState] = useState({
		subheading: subheading,
		media: defaultMedia,
	});
	/*************************Event handlers for hooks of form and Quill State***************************/
	const handleOnChange = (value) => {
		setEditorState(value);
		setWordCounter(value.split(' ').length);
		props.modifyModuleData(sno - 1, content, value);
	};
	const handleSubheadingChange = (e) => {
		setFormState({ ...form, subheading: e.target.value });
		props.modifyModuleData(sno - 1, subHeading, e.target.value);
	};
	const handleMediaChange = (e) => {
		setFormState({ ...form, media: e.target.value });
		props.modifyModuleData(sno - 1, media, e.target.value);
	};

	return (
		<React.Fragment>
			<div className='section-grid'>
				<div>
					<form className='section-form'>
						<input
							className='form-subheading'
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
							className='form-media'
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
				<button className='green' onClick={() => props.handleAdd(props.sno)}>
					-Add-
				</button>
				<button className='red' onClick={() => props.handleDelete(props.sno - 1)}>
					-Delete-
				</button>
				<br />
				Section No. - {props.sno} | Word Count - {wordCounter}
			</div>
		</React.Fragment>
	);
};

/***********************************************************************************/
/*---------------------------component for Main Creator----------------------------*/
/***********************************************************************************/
const Creator = (props) => {
	const mod = {
		heading: [''],
		metaData: ['', ''],
		sectionData: {
			subHeading: [''],
			content: [''],
			media: [dummyMedia],
		},
	};
	const module = useSelector((state) => state.courses[props.course][props.module] || mod);

	//Hook for collection of sections
	const [myArray, setMyArray] = useState(() => {
		let initialId = [];
		module.sectionData.content.forEach(() => {
			initialId.push(makeid(5));
		});
		return initialId;
	});

	//Hook for Module Data
	const [moduleData, setModuleData] = useState(module);

	//Hook for heading form
	const [headingForm, setHeadingForm] = useState({
		heading: moduleData.heading.join(' '),
		author: moduleData.metaData[1],
		date: moduleData.metaData[0],
	});
	/*************************Event handlers for hooks of heading form***************************/
	const handleHeadingChange = (e) => {
		setHeadingForm({ ...headingForm, heading: e.target.value });
	};

	const handleAuthorChange = (e) => {
		setHeadingForm({ ...headingForm, author: e.target.value });
	};

	const handleDateChange = (e) => {
		setHeadingForm({ ...headingForm, date: e.target.value });
	};

	/********************Event handlers for Section Modification (ADD DELETE CHANGE)**************************/
	const handleAdd = (id) => {
		let newArray = [...myArray];
		newArray.splice(id, 0, makeid(5));
		setMyArray(newArray);

		let newContent = [...moduleData.sectionData.content];
		let newMedia = [...moduleData.sectionData.media];
		let newSubHeading = [...moduleData.sectionData.subHeading];

		newContent.splice(id, 0, '');
		newSubHeading.splice(id, 0, '');
		newMedia.splice(id, 0, dummyMedia);

		setModuleData({
			...moduleData,
			sectionData: {
				subHeading: [...newSubHeading],
				content: [...newContent],
				media: [...newMedia],
			},
		});
	};

	const modifyModuleData = (id, param, value) => {
		let newContent = [...moduleData.sectionData.content];
		let newMedia = [...moduleData.sectionData.media];
		let newSubHeading = [...moduleData.sectionData.subHeading];
		if (param === 'content') newContent[id] = value;
		if (param === 'media') newMedia[id] = value;
		if (param === 'subHeading') newSubHeading[id] = value;

		setModuleData({
			...moduleData,
			sectionData: {
				subHeading: [...newSubHeading],
				content: [...newContent],
				media: [...newMedia],
			},
		});
	};

	const handleDelete = (id) => {
		const arr = [...myArray];
		setMyArray(arr.filter((element) => arr.indexOf(element) !== id));
		const newContent = moduleData.sectionData.content.filter(
			(element) => moduleData.sectionData.content.indexOf(element) !== id
		);
		const newMedia = moduleData.sectionData.media.filter(
			(element) => moduleData.sectionData.media.indexOf(element) !== id
		);
		const newSubHeading = moduleData.sectionData.subHeading.filter(
			(element) => moduleData.sectionData.subHeading.indexOf(element) !== id
		);
		setModuleData({
			...moduleData,
			sectionData: {
				subHeading: [...newSubHeading],
				content: [...newContent],
				media: [...newMedia],
			},
		});
	};

	//EVENT HANDLE FOR COMMITING TO STATE USING REDUX
	const dispatch = useDispatch();
	const handleSubmit = () => {
		dispatch({
			type: 'DATA_UPDATE_COURSES',
			heading: [
				headingForm.heading.slice(0, headingForm.heading.lastIndexOf(' ')),
				...headingForm.heading.split(' ').splice(-1),
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
						sectionContent={moduleData.sectionData.content[id]}
						subheading={moduleData.sectionData.subHeading[id]}
						media={moduleData.sectionData.media[id]}
						handleDelete={handleDelete}
						handleAdd={handleAdd}
						modifyModuleData={modifyModuleData}
					/>
				))}
				<div className='control'>
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
