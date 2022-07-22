import React from 'react'
import delcloudimg from './images/delete-cloud-button.png'

export const Definitionbox = ({ title, type, definitions, date, lastupdated, firestore }) => {
    var defs = [];
    for (var key in definitions) { 
        defs.push(definitions[key])
    }

    function sendDeletePoll() {
        if (window.confirm('Do you want to delete this item? (a poll will be sent in the Fuzzii Discord server)')) {
            const docRef = firestore.collection('notifier').doc('status');
            // let document;
            // docRef.get().then((e) => {document = e.data()});
            docRef.update({ sendPoll: true, toDelete: title });
            alert('Poll sent! Check #hangouts! If majority is in favor with you, this word will be deleted');
        }
        
    }

    return (
        <div className="word">
            <img src={delcloudimg} alt="Delete from cloud" onClick={() => {sendDeletePoll()}}/>
            <h2>{title}</h2>
            <h4>{type}</h4>
            <ol>
                {defs.map((def, index) => {
                    return <li key={index}>{def}</li>
                })}
            </ol>
            <h5>{date} {lastupdated && '| Last updated'} {lastupdated}</h5> 
        </div>
    )
}

export default Definitionbox

