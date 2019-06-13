import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
//import logo from './logo.svg';
import './App.css';
import {courses} from './res/demo/res';


const styles = {
  disabled: {
    visibility: 'hidden'
  },
  enabled: {
    opacaity: 1
  }
}

function App() {
  //Hook for page number
  const [page, setPage] = useState(1); 

  //Hook for reader content
  let initialWorks = {1:{heading:"", metaData:["",""], sectionData:{subHeading:{1:"", 2:""}, media:{},content:{1:[""],2:[""]}}}};
  const [mod, setMod] = useState(initialWorks[1]);
  useEffect(() => {
    setMod(courses.design[1]);
    console.log(mod);
  },[mod]); 
  //component for reader content
  const Reader = () => {
    const [inProp, setInProp] = useState(false);
    useEffect(()=>{
      setInProp(true);
    },[inProp] )
    return(
      <CSSTransition in={inProp} appear timeout={400} classNames="my-node">
      <div className="reader maxHeight">
        {inProp ?
        <div id="readerText" className="col readerText"> 
          <h2 className="fontOswald">{mod.heading[0]} <span className="fontOswald highlight">{mod.heading[1]}</span> </h2> 
          <p className="fontOswald metaData">By {mod.metaData[1]} &nbsp; &nbsp;<span className="date">{mod.metaData[0]}</span></p> 
          <h3 className="subHeading">{page}. &nbsp;{mod.sectionData.subHeading[page]}</h3>
          {mod.sectionData.content[page].map((para, i) => <p key={i}>{para}</p>)}
          <Control/>
        </div>: 0}
        <div className="col readerMedia"><img width="100%" src={mod.sectionData.media[page]} alt=""/></div>
      </div>   
      </CSSTransition>
    );
  }
  
  //component for reader control bar
  const size = Object.keys(mod.sectionData.content).length;
  const Control = () => {
    //Hook for reader control bar
    let initialButton = {prev : true, next: false};
    const [isDisabled, setDisabled] = useState(initialButton);
    useEffect(() => {
      if(page>1)
        setDisabled({prev: false});
      if(page===1)
        setDisabled({prev: true});
      if(page===size)
        setDisabled({next:true});
    },[isDisabled]);
    //Hook for indicator form field
    const [inputPage, setInputPage] = useState(page);
    const handleChange = (e) => {
      setInputPage(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      setPage(parseInt(inputPage));
    }
    return(
      <div className="flex">
        <div className="controls">
          {isDisabled.prev ? <button disabled onClick ={() => setPage(page-1)} style={styles.disabled} className="button"> ◀ </button> : <button onClick ={() => setPage(page-1)} className="button"> ◀ </button>}
          <form onSubmit={handleSubmit}><input className="indicator" onChange={e => handleChange(e)} value={inputPage} /> <label className="label">/ {size}</label></form>
          {isDisabled.next ? <button disabled onClick ={() => setPage(page+1)} style={styles.disabled} className="button"> ▶ </button> : <button onClick ={() => setPage(page+1)}className="button"> ▶ </button> }
        </div>
      </div>
    );
  }
  
  //component for progress bar
  const ProgressBar = () => {
    //hook for progressBar
    const [progress, setProgress] = useState(page/size);
    useEffect(() => {
    setProgress(page/size);
    },[progress]);

    const styleProgress ={
      width: `calc(${progress}*100%)`,
      borderBottom: '0.25rem solid lightgreen'
    }
    return(<CSSTransition><div style={styleProgress}></div></CSSTransition>);
  }

  //component for Nav  
  const Navbar = () => {
    return(
      <header className="App-header"></header>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <ProgressBar />
      <Reader />
    </div>
  );
}

export default App;
