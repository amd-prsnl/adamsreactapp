import React from 'react';
import Edit from './EditPage';
import { useEffect, useState } from 'react';

function RequestTable(props) {
    //const initialRequest = {"RequestID":0, "RequestName":"", "Requestor":"", "Assigned": "", "Priority":"", "Status":""};
    //const [request, setRequest] = useState(initialRequest); <Edit request={request} />
    //function editRequest(i) {
      //setRequest(requests.find((request) => request.RequestID == i));
    //}
    return (<div>
        <table className="mainTable">
            <thead>
                <tr><th></th><th>Request ID</th><th>Request Name</th><th>Requestor</th><th>Assigned</th><th>Priority</th><th>Status</th></tr>
            </thead>
            <tbody>
            {
                props.requests.map(function(request, i) {
                    return (
                    <tr key={i}>
                        <td>
                            <button onClick={() => {
                                //editRequest(request.RequestID);
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
                            {request.assigned}
                        </td>
                        <td>
                            {request.priority}
                        </td>
                        <td>
                            {request.status}
                        </td>
                    </tr>); 
                })
            }
            </tbody>
        </table>      
        <div>
        </div>
    </div>);
}

export default RequestTable;

//https://github.com/MicrosoftDocs/mslearn-react/blob/main/code/3-state-events/end/src/App.jsx
//https://www.taniarascia.com/getting-started-with-react/