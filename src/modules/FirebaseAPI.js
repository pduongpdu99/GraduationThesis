import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDxtpb1Bu-2P0Fkuwr9qVorSk3WK2i0R-4",
    authDomain: "nckh20-71d75.firebaseapp.com",
    databaseURL: "https://nckh20-71d75-default-rtdb.firebaseio.com",
    projectId: "nckh20-71d75",
    storageBucket: "nckh20-71d75.appspot.com",
    messagingSenderId: "658077030108",
    appId: "1:658077030108:web:824373f6002d820232c619",
    measurementId: "G-N9SWYK4TQ5"
}

firebase.initializeApp(config);

let firestore = firebase.firestore();

async function readAllCollection(collectionName) {
    let data = [];
    await firestore.collection(collectionName).get().then((snapshot) => {
        snapshot.forEach(doc => {
            data.push(doc.data());
        })
    });
    return data;
}

function setData(collection, dataset) {
    let xData = {};
    for(let index = 0; index < dataset.length; index++) 
    {
        let indexString = '0'.repeat(5-(index+"").length) + index;
        xData[`google-rule-${indexString}`] = dataset[index];
    }
    let keys = Object.keys(xData);    
    for(let i of keys) {
        firestore.collection(collection).doc(i).delete();
        setTimeout(()=>firestore.collection(collection).doc(i).set(xData[i]),1000);
    }
}

async function updateMember(data, index, collection='google-rule') {
    let dataset = await readAllCollection(collection);
    console.log(index)
    setTimeout(()=>{
        let keys = Object.keys(data);
        for(let key of keys)
        {
            if(dataset[index] !== undefined)
                dataset[index][key] = data[key];
        }
        
        setData(collection, dataset)
    }, 1000);
    
}

async function appendMember(data, collection='google-rule') {
    let dataset = await readAllCollection(collection);
    dataset.push(data);
    setTimeout(setData(collection, dataset), 1000);
}

async function removeMember( index, collection='google-rule') {
    let dataset = await readAllCollection(collection);
    let xData = {};
    for(let index = 0; index < dataset.length; index++) 
    {
        let indexString = '0'.repeat(5-(index+"").length) + index;
        xData[`google-rule-${indexString}`] = dataset[index];
    }
    let keys = Object.keys(xData);    
    for(let i of keys) {
        firestore.collection(collection).doc(i).delete();
    }
    
    let x = [];
    for(let i = 0;i<dataset.length;i++) {
        if(index !== i)
        {
            x.push(dataset[i]);
        }
    }
    setData(collection, x)
}

const FirebaseAPI = {
    collection: {
        readAll: readAllCollection,
        memberUpdate: updateMember,
        memberAppend: appendMember,
        memberRemove: removeMember
    }
};

export default FirebaseAPI;