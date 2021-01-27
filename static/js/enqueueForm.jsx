"use strict";

function EnqueueForm(){
    const [issueTitle, setIssueTitle] = React.useState("");


    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(issueTitle)

        const options = {
            method: "POST", 
            body: JSON.stringify({title: issueTitle}),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        }

        fetch("/enqueue-submit", options)
        .then(response => response.json())
        .then((result) => result)
        .then(data => alert(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (<form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="tell me about your issueTitle" 
            value={issueTitle} 
            onChange={e => setIssueTitle(e.target.value)}
        />
        <input type="submit" />
    </form>)

}
