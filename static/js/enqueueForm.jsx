"use strict";

function EnqueueForm(){
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
    .then(data => alert(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // TODO: FIXME: can have a single event handler for every input field! 
  // will need to give all the inputs a name field
  // TODO: labels
  return (<form onSubmit={handleSubmit}>
    <input 
      type="text" 
      name="title"
      placeholder="title for mini card" 
      value={issueTitle} 
      onChange={e => setIssueTitle(e.target.value)}
    />
    <input 
      type="text" 
      placeholder="more involved description" 
      value={description} 
      onChange={e => setDescription(e.target.value)}
    />
    <input 
      type="text" 
      placeholder="what you want to happen" 
      value={desiredOutcome} 
      onChange={e => setDesiredOutcome(e.target.value)}
    />
    <input 
      type="text" 
      placeholder="things I've tried" 
      value={efforts} 
      onChange={e => setEfforts(e.target.value)}
    />
    <input 
      type="text" 
      placeholder="how I got here (steps to reproduce)" 
      value={background} 
      onChange={e => setBackground(e.target.value)}
    />
    <input 
      type="text" 
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