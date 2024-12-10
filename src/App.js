import './App.css';
import Status from './Status';
import User from './User';
import Priority from './Priority';
import { useState } from 'react';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

const url = "https://adamsapimgmt.azure-api.net/request";
var initialRequests = await getRequests();
const priorities = await Priority();
const statuses = await Status();
const users = await User();

const initialRequest = {
  "requestId": 0,
  "requestName": null,
  "requestor": null,
  "assigned": null,
  "problemDescription": null,
  "priority": 0,
  "status": 0,
  "dueDate": null,
  "lastModifiedDate": null
};

var i = 0;
var maxVal = 2;

function App() {
  const [requests, setRequests] = useState(initialRequests)
  const [request, setRequest] = useState(initialRequest);
  const [startDate, setStartDate] = useState(new Date());
  const [editDate, setEditDate] = useState(new Date());
  
  function createRequest() {
    var name = document.getElementById('newRequestName').value;
    var requestor = document.getElementById('newRequestor').value;
    var priority = document.getElementById('newPriority').value;
    var desc = document.getElementById('newDescription').value;

    if (name == '' || requestor == '' || priority == '' || desc == '') {
      alert('Please fill in all fields')
    }
    else {
      addRequest(name, requestor, priority, desc, setRequests);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Work Request Site</h1>
        Welcome to the Work Request Site. View all requests below, or create a new request.
        <hr />
        <button onClick={() => {document.getElementById('createNewTab').style['display'] = 'block';}}>Create New</button>
      </header>
      <br />
      <div>
        <table className="mainTable">
            <thead>
                <tr><th></th><th>Request ID</th><th>Request Name</th><th>Requestor</th><th>Assigned</th><th>Priority</th><th>Status</th></tr>
            </thead>
            <tbody>
            {
                requests.map(function(request, i) {
                    return (
                    <tr key={i}>
                        <td>
                            <button onClick={() => {
                                document.getElementById('editTable').style['display'] = 'block';
                                setRequest(request);
                                document.getElementById('editAssigned').value = request.assigned == null ? '' : request.assigned;
                                document.getElementById('editPriority').value = request.priority;
                                document.getElementById('editStatus').value = request.status;
                                document.getElementById('editRequestName').value = request.requestName;
                                document.getElementById('editRequestor').value = request.requestor;
                                document.getElementById('editProblemDescription').value = request.problemDescription;
                            }}>Edit</button>
                        </td>
                        <td>
                            {request.requestId}
                        </td>
                        <td>
                            {request.requestName}
                        </td>
                        <td>
                            {request.requestor}
                        </td>
                        <td>
                            {getUser(request.assigned)}
                        </td>
                        <td>
                            {getPriority(request.priority)}
                        </td>
                        <td>
                            {getStatus(request.status)}
                        </td>
                    </tr>); 
                })
            }
            </tbody>
        </table>      
        <div>
        </div>
    </div>
      <section id="editTable" className="hiddenArea">
      <hr />
        <table >
          <thead>
            <tr><th colSpan="2">Modify Request #{request.requestId}</th></tr>
          </thead>
          <tbody>
            <tr><td>Request Name</td><td><input type="text" id="editRequestName" /></td></tr>
            <tr><td>Problem Description</td><textarea id="editProblemDescription" /></tr>
            <tr><td>Requestor</td><td><input type="text" id="editRequestor" /></td></tr>
            <tr><td>Status</td><td><select id="editStatus">
              <option value="" disabled selected>Please Select</option>
              {
                statuses.map(function(status, i) {
                  return (<option key={i} value={status.statusId}>{status.statusDescription}</option>);
                })
              }
              </select></td></tr>
            <tr><td>Priority</td><td><select id="editPriority">
              <option value="" disabled selected>Please Select</option>
              {
                priorities.map(function(priority, i) {
                  return (<option key={i} value={priority.priorityId}>{priority.priorityDescription}</option>);
                })
              }
              </select></td></tr>
            <tr><td>Assigned</td><td><select id="editAssigned">
              <option value="" disabled selected>Please Select</option>
              {
                users.map(function(assigned, i) {
                  return (<option key={i} value={assigned.userId}>{assigned.userName}</option>);
                })
              }
              </select></td></tr>
            <tr><td>Due Date</td><td><input type="text" value={request.dueDate} id="editDueDate" disabled /></td></tr>
            <tr><td><button onClick={() => editRequest(request, setRequests)}>Update</button></td><td><div id="editMessage" /></td></tr>
          </tbody>
        </table>
      </section>
      <div>        
      <div id='createNewTab' className="hiddenArea">
        <hr />
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
            <tr><td>Due Date</td><td></td></tr>
            <tr><td colSpan="2"><button onClick={() => {createRequest();}}>Create</button></td></tr>
          </tbody>
        </table>        
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
          alert('Request added!');
          document.getElementById('newRequestName').value = '';
          document.getElementById('newRequestor').value = '';
          document.getElementById('newPriority').value = '';
          document.getElementById('newDescription').value = '';
      });
}

async function editRequest(request, setRequests) {
  request.status = document.getElementById('editStatus').value;
  request.priority = document.getElementById('editPriority').value;
  request.assigned = document.getElementById('editAssigned').value == '' ? null : document.getElementById('editAssigned').value;
  request.requestName = document.getElementById('editRequestName').value;
  request.requestor = document.getElementById('editRequestor').value;
  request.problemDescription = document.getElementById('editProblemDescription').value;
  
  const requestMetadata = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  };

  await fetch(url, requestMetadata)
      .then(res => res.json())
      .then(requests => {
          setRequests(requests);
          document.getElementById('editMessage').innerHTML = 'Save successful';
          //document.getElementById('editTable').style['display'] = 'none';
      });
}


function getPriority(priority) {
  const temp = priorities.map(function (priorityVal, i) {
      if (priorityVal.priorityId == priority)
          return (
              <div key={i}>{priorityVal.priorityDescription}</div>
          );
      else
          return null;
  });
  return temp;
}

function getStatus(status) {
  const temp = statuses.map(function (statusVal, i) {
      if (statusVal.statusId == status)
          return (
              <div key={i}>{statusVal.statusDescription}</div>
          );
      else
          return null;
  });
  return temp;
}

function getUser(user) {
  const temp = users.map(function (userVal, i) {
      if (userVal.userId == user)
          return (
              <div key={i}>{userVal.userName}</div>
          );
      else
          return null;
  });
  return temp;
}

export default App;