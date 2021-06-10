"use strict";

function EnqueueForm({toggleModal, setNeedsRefetch}){
  const [issueTitle, setIssueTitle] = React.useState('');
  // const [formData, setFormData] = React.useState({ // WIP TODO QUESTION HALP
  //   'title': '',
  //   'desiredOutcome': '',
  //   'description': '',
  //   'background': '',
  //   'furtherInfo': '', 
  //   'efforts': ''
  // })
  const [desiredOutcome, setDesiredOutcome] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [background, setBackground] = React.useState('');
  const [furtherInfo, setFurtherInfo] = React.useState('');
  const [efforts, setEfforts] = React.useState('');
  
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(issueTitle)
    toggleModal()

    const options = {
      method: 'POST', 
      body: JSON.stringify({
        title: issueTitle,
        desiredOutcome: desiredOutcome,
        description: description,
        background: background,
        furtherInfo: furtherInfo,
        efforts: efforts
      }),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    fetch("/enqueue-submit", options)
    .then(response => response.json())
    .then((result) => result)
    .then(data => {
      console.log("from the server", data);
      setNeedsRefetch(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // TODO: FIXME: can have a single event handler for every input field! 
  // will need to give all the inputs a name field
  // TODO: labels
  return (<form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input 
      type="text" 
      name="title"
      placeholder="title for mini card" 
      value={issueTitle} 
      onChange={e => setIssueTitle(e.target.value)}
    />
    <label htmlFor="description">Description</label>
    <input 
      type="text"
      name="description"
      placeholder="more involved description" 
      value={description} 
      onChange={e => setDescription(e.target.value)}
    />
    <label htmlFor="desired-outcome">Desired outcome?</label>
    <input 
      type="text"
      name="desired-outcome"
      placeholder="what you want to happen" 
      value={desiredOutcome} 
      onChange={e => setDesiredOutcome(e.target.value)}
    />
    <label htmlFor="efforts">What have you tried so far?</label>
    <input 
      type="text"
      name="efforts"
      placeholder="things I've tried" 
      value={efforts} 
      onChange={e => setEfforts(e.target.value)}
    />
    <label htmlFor="reproduce">Steps to reproduce</label>
    <input 
      type="text"
      name="reproduce"
      placeholder="how I got here (steps to reproduce)" 
      value={background} 
      onChange={e => setBackground(e.target.value)}
    />
    <label htmlFor="details">Further details:</label>
    <input 
      type="text"
      name="details"
      placeholder="other details you want to share" 
      value={furtherInfo} 
      onChange={e => setFurtherInfo(e.target.value)}
    />
    <input type="submit" />
  </form>)

}


// function handleAll(evt) {
//   // TODO QUESTION: const vs function?
//   updateForm({ ...form, evt.target.name: evt.target.value})
//   // object spreading: copies in the old form
//   // form = { a: 1, b: 2 }
//   // { a: 1, b: 2, b: 3 }
//   // -> { a: 1, b: 3 }

// }

// // const updateForm(dictionary of fields/values, new key/value to update)