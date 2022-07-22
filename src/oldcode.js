const firestore = firebase.firestore();

function DefinitionList({ dlimit, cAmount }) { 
  

  const _messagesRef = firestore.collection('padertionary');
  const _query = _messagesRef.orderBy('date_added', 'desc')
  let [_definitions] = useCollectionData(_query, {idField: 'id'});
  console.log(_definitions);

  try {
    cAmount(_definitions.length)
  } catch(err) {
    
  }

  const messagesRef = firestore.collection('padertionary');
  const query = messagesRef.orderBy('date_added', 'desc').limit(dlimit);
  let [definitions] = useCollectionData(query, {idField: 'id'});
  
  return (
    <>
      {definitions && definitions.slice(dlimit-15, dlimit).map(msg => <Defintionbox title={msg.id} type={msg.type.slice(2,-2)} definitions={msg.definitions} date={'Added on ' + msg.date_added}/>)}
    </>
  )
}