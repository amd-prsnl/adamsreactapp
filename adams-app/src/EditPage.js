import React from 'react';

function Edit(props) {
  console.log(props.request.RequestID);
    return (
      <section>
        <table>
          <thead>
            <tr><th colSpan="2">Please select a request to edit</th></tr>
          </thead>
          <tbody>
            <tr><td>Request Name</td><td>{props.request.RequestName}</td></tr>
            <tr><td>Requestor</td><td>{props.request.Requestor}</td></tr>
            <tr><td>Assigned</td><td>{props.request.Assigned}</td></tr>
            <tr><td>Priority</td><td>{props.request.Priority}</td></tr>
            <tr><td>Status</td><td>{props.request.Status}</td></tr>
          </tbody>
        </table>
      </section>
    );
  }

  export default Edit;