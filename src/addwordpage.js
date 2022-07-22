import React from 'react'
import ReactDom from 'react-dom'
import closebutton from './images/close-button.png'
import uploadicon from './images/upload-icon.png'
import restarticon from './images/restart.png'
import strftime from './strftime'

const AddWordPage = ({ show, closeModal, tempDefList, changeTempDefList, allowedState, changeAllowedState, changeTempInputDefList, tempInputDefList, title, changeTitle, type, changeType, firestore }) => {
    if (!show) return null;
    let allowButton;


    function validateInput() {
        if (title && type && (tempDefList !== [])) {
            // {now.strftime("%B")} {now.strftime("%d")} at {now.strftime("%I")}:{now.strftime("%M")} {now.strftime("%p")}
            const docRef = firestore.collection('padertionary').doc(title);
            docRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    docRef.get().then((qs) => {
                        let prev = qs.data()
                        prev.definitions = [...prev.definitions, ...tempDefList];
                        prev.last_updated = strftime("%B %d at %I:%M %p");
                        docRef.set(prev);
                    });
                    
                } else {
                    docRef.set({date_added: strftime("%B %d at %I:%M %p"), definitions: tempDefList, type:`**${type}**`}) // create the document
                }
            });
            // return {date_added: strftime("%B %d at %I:%M %p"), definitions: tempDefList, type:`**${type}**`}
        } else {
            alert('You need to fill all of the forms up!');
        }
    }
    
    if (allowedState) {
        allowButton = 'allowedButton';
    } else {
        allowButton = '';
    }

    if (tempInputDefList) {
        changeAllowedState(true);
    } else {
        changeAllowedState(false);
    }

    function changeTheCumFuck(cum) {
        if (tempDefList.length > 4) return;
        if (cum === '') return;

        changeTempDefList([...tempDefList, cum]);
    }

    return ReactDom.createPortal(
        <>
            <div className="dimback"></div>
            <div className="aboutback">
                <img src={closebutton} className="aboutClose" alt="close window" onClick={() => closeModal(false)}/>
                <h1 className="addaword">Add a word</h1>
                <div className="wordPreview">
                    <form autocomplete="off">
                        <label htmlFor="title" className="wordTitle"></label>
                        <input className="wordTitle" type="text" id="title" name="title" placeholder="Input a title here!" value={title} onChange={(e) => changeTitle(e.target.value)}/>
                        <input className="wordType" type="text" name="wordType" id="wordType" placeholder="Type of word (verb? noun?)" value={type} onChange={(e) => changeType(e.target.value)}/>
                    </form>

                <ol>
                    {tempDefList.map((e, index) => <li key={index}>{e}</li> )}
                </ol>

                <div className="addDefDiv">
                    <form autocomplete="off">
                        <input type="text" name="addDef" id="addDef" className="addDef" placeholder="Add a definition here" value={tempInputDefList} onChange={event => changeTempInputDefList(event.target.value)}/>
                    </form>
                    <button className={`addDefButton ${allowButton}`} onClick={() => {changeTheCumFuck(tempInputDefList); changeTempInputDefList('')}}>Add definition</button>
                </div>
                    
                </div>

                <div className="controlpaneladdword">
                    <img className="restarticon" src={uploadicon} alt="Upload button" onClick={() => console.log(validateInput())}/>
                    <img className="restarticon" src={restarticon} alt="Restart button" onClick={() => {changeTempDefList([]); changeTitle(''); changeType(''); changeTempInputDefList('')}}/>
                </div>
            </div>
            
        </>, document.getElementById("about")
    )
    
}

export default AddWordPage
