import './App.css';
import RequestTable from './RequestTable';
import { useState } from 'react';
const url = "http://localhost:5022/request";
var initialRequests = await getRequests();
const priorities = await getPriorities();

var i = 0;
var maxVal = 2;

function App() {
  const[requests, setRequests] = useState(initialRequests)
  function createRequest() {
    var name = document.getElementById('newRequestName').value;
    var requestor = document.getElementById('newRequestor').value;
    var priority = document.getElementById('newPriority').value;
    var desc = document.getElementById('newDescription').value;

    if (name == '' || requestor == '' || priority == '' || desc == '') {
      alert('Please fill in all fields')
    }
    else {
      //const newRequests = {...requests};
      //requests.push()
      addRequest(name, requestor, priority, desc, setRequests);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Work Request Site</h1>
        Welcome to the Work Request Site. View all requests below, or create a new request.
      </header>
      <br />
          <RequestTable requests={requests} /> 
      <div>        
      <div className="App">
        <table>
          <thead>
            <tr><th colSpan="2">Please create a new request</th></tr>
          </thead>
          <tbody>
            <tr><td>Request Name</td><td><input type="text" id="newRequestName"></input></td></tr>
            <tr><td>Requestor</td><td><input type="text" id="newRequestor" /></td></tr>
            <tr><td>Priority</td><td><select id="newPriority">
              <option value="" disabled selected>Please Select</option>
              {
                priorities.map(function(priority, i) {
                  return (<option key={i} value={priority.priorityId}>{priority.priorityDescription}</option>);
                })
              }
              </select></td></tr>
            <tr><td>Problem Description</td><td><textarea id="newDescription" /></td></tr>
          </tbody>
        </table>
        <button onClick={() => {createRequest();}}>Create</button>
      </div>
      </div>
    </div>
  );
}

async function getRequests () {
  try {
    const response = await fetch(url, {   method:'GET',
      mode: 'cors',
      headers:{
          'Access-Control-Allow-Origin':'*'
      },
  });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function addRequest(name, requestor, priority, desc, setRequests) {
  const requestMetadata = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"requestId":0, 
      "requestName":name, 
      "requestor":requestor, 
      "assigned": null, 
      "priority":priority, 
      "status": 1,
      "dueDate": null,
      "lastModifiedDate": new Date(),
      "problemDescription": desc})
  };

  await fetch(url, requestMetadata)
      .then(res => res.json())
      .then(requests => {
          setRequests(requests);
          //this.setState({ requests });
      });
  //
  alert('Request added!');
  document.getElementById('newRequestName').value = '';
  document.getElementById('newRequestor').value = '';
  document.getElementById('newPriority').value = '';
  document.getElementById('newDescription').value = '';
}

async function getPriorities() {
  try {
    const response = await fetch(url.replace("request", "priority"));
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
}

export default App;