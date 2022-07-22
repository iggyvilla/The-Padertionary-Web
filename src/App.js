import './App.css';
import firebase from 'firebase/app'
import { useState, useEffect } from 'react';
import 'firebase/firestore'

import logo from './images/icon.png'
import rightarrow from './images/right-arrow.png'
import leftarrow from './images/left-arrow.png'
import Aboutmodal from './aboutmodal'
import Defintionbox from './definitionbox'
import Searchbar from './searchbar'
import AddWordPage from './addwordpage'

// import { useCollectionData } from 'react-firebase-hooks/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBIVdFzLq8JbAzh4u0vZCsZhJNq6WuKFTs",
    authDomain: "fuzzibot-py.firebaseapp.com",
    projectId: "fuzzibot-py",
    storageBucket: "fuzzibot-py.appspot.com",
    messagingSenderId: "548345115333",
    appId: "1:548345115333:web:838b40729bc9851887f6ac",
    measurementId: "G-XF12ENR118"
  });
} else {
  firebase.app(); // if already initialized, use that one
}


const firestore = firebase.firestore();

function DefinitionList({ dlimit, entries, searchBar }) { 
  // console.log(dlimit);
  // console.log(entries, entries.slice(dlimit-15, dlimit));

  let searchItem = searchBar ? new RegExp(searchBar, 'i') : /.*/;
  console.log(searchItem, searchItem === /.*/)
  return (
    <>
      {(String(searchItem) === '/.*/') ? 
        entries && entries.slice(dlimit-15, dlimit)
        .map(msg => <Defintionbox title={msg.id} type={msg.type.slice(2,-2)} definitions={msg.definitions} date={'Added on ' + msg.date_added} lastupdated={msg.last_updated} firestore={firestore}/>)
      : 
      
      entries && entries.filter((x) => {
        let search_arr = [];
        search_arr.push(searchItem.exec(x.id));
        x.definitions.forEach((d) => search_arr.push(searchItem.exec(d)));
        return search_arr.some((a) => a != null);
      })
      .map(msg => <Defintionbox title={msg.id} type={msg.type.slice(2,-2)} definitions={msg.definitions} date={'Added on ' + msg.date_added} lastupdated={msg.last_updated} firestore={firestore}/>)
    }
    </>
  )
}


function App() {

  // For the viewing of the holy padertionary

  const [limit, changeLimit] = useState(15);

  const [amount, changeAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [pader, setPader] = useState([]);

  const [curPage, addPage] = useState(1);

  // For pop-up pages

  const [aboutPage, changeAboutPage] = useState(false);

  // For the adding a word page

  const [addWordPage, changeAddWordPage] = useState(false);

  const [allowedToType, changeAllowedToType] = useState(false);

  const [tempDefList, changeTempDefList] = useState([]);

  const [tempInpDefList, changeTIDL] = useState();

  const [titleState, changeTitleState] = useState();

  const [wordType, changeWordType] = useState();

  const [searchBar, changeSearchBar] = useState('');

  const ref = firestore.collection("padertionary").orderBy('date_added', 'desc');

  function getPadertionary() {
    setLoading(true);
    ref.onSnapshot((qS) => {
      const items = [];
      qS.forEach((doc) => {
        items.push(Object.assign({ id: doc.id }, doc.data()));
      })
      setPader(items);
      changeAmount(items.length);
      setLoading(false);
    })
  }

  useEffect(() => {
    getPadertionary();
  }, []);

  const changePages = (camount) => {
    // console.log(camount < 15, camount > amount);
    // console.log(camount, amount);
    if (camount < 15) return;

    if (camount > amount+15) return;

    changeLimit(camount);
  }

  const maxPage = Math.ceil(amount/15);

  function changeCurrentPage(amount) {
    if (amount < 1) return;

    if (amount > maxPage) return;

    addPage(amount);
  }

  return (

    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Public Sans"/>
 
      <Aboutmodal show={aboutPage} closeModal={changeAboutPage} />
      {/* Thats so big, onii-chan! */}
      <AddWordPage show={addWordPage} closeModal={changeAddWordPage} tempDefList={tempDefList} changeTempDefList={changeTempDefList} 
      allowedState={allowedToType} changeAllowedState={changeAllowedToType} changeTempInputDefList={changeTIDL} 
      tempInputDefList={tempInpDefList} title={titleState} changeTitle={changeTitleState} type={wordType} 
      changeType={changeWordType} firestore={firestore} />


      <div className="title">
        <div>
          <img src={logo} alt="Logo"/>
          <span>The Padertionary</span>
        </div>
      </div>

      <div className="bottom">
        
        <div className="sidebar">
            <h3 id="sideButton" onClick={() => changeAboutPage(true)}>About</h3>
            <h3 id="sideButton" onClick={() => changeAddWordPage(true)}>Add word</h3>
            <h3 id="sideButton" onClick={() => alert('CJ')}>CJ Button</h3>
        </div>

        <div className="word-list">

          <Searchbar padertionary={pader} searchBar={searchBar} changeSearchBar={changeSearchBar}/>

          {loading ? (<h4>Loading entries...</h4>) : <DefinitionList entries={pader} dlimit={limit} cAmount={changeAmount} searchBar={searchBar}/>}
          
          <div className="bottom-margin">
            <img className="prevPage" onClick={() => { changePages(limit-15); changeCurrentPage(curPage - 1) }} src={leftarrow} alt="Left arrow"/>
            <img className="nextPage" onClick={() => { changePages(limit+15); changeCurrentPage(curPage + 1)}} src={rightarrow} alt="Right arrow"/>
            <br></br>
            <p>Page {curPage}/{maxPage}</p>
          </div>

        </div>
        
      </div> 

    </div>   
  );
}

export default App;
