import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Reader.css';

function ReaderView(props) {
	const { heading, metaData, sectionData } = props.module;
	//Hook for page number
	const [page, setPage] = useState(1);

	/***************************************************************************************/
	/*--------------------component for reader text and media-----------------------------*/
	/*************************************************************************************/
	const Reader = () => {
		//Hook for CSS transition
		const [showData, setShowData] = useState(false);
		useEffect(() => {
			setShowData(true);
		}, [showData]);
		return (
			<CSSTransition in={showData} appear timeout={400} classNames='my-node'>
				<div className='reader maxHeight'>
					{showData ? (
						<div id='readerText' className='col readerText'>
							<h2 className='fontOswald'>
								{heading[0]} <span className='fontOswald highlight'>{heading[1]}</span>{' '}
							</h2>
							<p className='fontOswald metaData'>
								By {metaData[1]} &nbsp; &nbsp;<span className='date'>{metaData[0]}</span>
							</p>
							{/*<h3 className='subHeading'>{sectionData.subHeading[page]}</h3>*/}
							<div dangerouslySetInnerHTML={{ __html: sectionData.content[page - 1] }} />
							{/* sectionData.content[page].map((para, i) => (
								<p key={i}>{para}</p>
							)) */}
							<Control />
						</div>
					) : null}
					{showData ? (
						<div className='col readerMedia'>
							<img width='100%' src={sectionData.media[page - 1]} alt='' />
						</div>
					) : null}
				</div>
			</CSSTransition>
		);
	};

	/***********************************************************************************/
	/*--------------------component for reader control bar-----------------------------*/
	/***********************************************************************************/
	const size = sectionData.content.length;
	const Control = () => {
		//Hook for reader control bar
		let initialButton = { prev: true, next: false };
		const [isDisabled, setDisabled] = useState(initialButton);
		useEffect(() => {
			if (size === 1) setDisabled({ prev: true, next: true });
			else {
				if (page > 1) setDisabled({ ...initialButton, prev: false });
				if (page === 1) setDisabled({ ...initialButton, prev: true });
				if (page === size) setDisabled({ prev: false, next: true });
			}
		}, [initialButton, isDisabled]);

		//Hook for indicator form field
		const [inputPage, setInputPage] = useState(page);
		const handleChange = (e) => {
			setInputPage(e.target.value);
		};
		const handleSubmit = (e) => {
			e.preventDefault();
			if (inputPage <= size && inputPage > 1) setPage(parseInt(inputPage));
		};

		return (
			<div className='flex'>
				<div className='controls'>
					{isDisabled.prev ? (
						<button disabled onClick={() => setPage(page - 1)} className='button hidden'>
							◀
						</button>
					) : (
						<button onClick={() => setPage(page - 1)} className='button'>
							◀
						</button>
					)}
					<form onSubmit={handleSubmit}>
						<input className='indicator' onChange={(e) => handleChange(e)} value={inputPage} />{' '}
						<label className='label'>/ {size}</label>
					</form>
					{isDisabled.next ? (
						<button disabled onClick={() => setPage(page + 1)} className='button hidden'>
							▶
						</button>
					) : (
						<button onClick={() => setPage(page + 1)} className='button'>
							▶
						</button>
					)}
				</div>
			</div>
		);
	};

	/***********************************************************************************/
	/*---------------------------component forProgress Bar-----------------------------*/
	/***********************************************************************************/
	const ProgressBar = () => {
		//Hook for progressBar
		const [progress, setProgress] = useState(page / size);
		const [showProgress, setShowProgress] = useState(false);
		useEffect(() => {
			setProgress(page / size);
			setShowProgress(true);
		}, [progress, showProgress]);

		const styleProgress = {
			width: `calc(${progress}*100%)`,
			borderBottom: '0.25rem solid lightgreen',
		};
		return (
			<CSSTransition in={showProgress} appear classNames='progressTransition' timeout={400}>
				<div style={styleProgress} />
			</CSSTransition>
		);
	};

	return (
		<div className='App'>
			<ProgressBar />
			<Reader />
		</div>
	);
}
export default ReaderView;
