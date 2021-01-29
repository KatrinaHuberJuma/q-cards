"use strict";

function LoginForm(props) {
    
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(`We call you ${userName}`);
        // console.log(`Secret code ${password}`);
        const options = {
            method : 'POST',
            body: JSON.stringify({
                'userName': userName,
                'password': password
            }),
            headers: { 
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch('/login', options)
        .then(response => {
            if (response.status === 200){
                props.handleLogin()
                return response.json();
            } else {
                console.error(`ERROR ${response.statusText}`)
            }
        })
        .then(data => {
            console.log('about to deal with some cool data', data)
            if (data.isStaff){
                console.log('data.isStaff seems true....')
                props.declareStaff();
            }
        })
        .catch(err => {console.error(`ERROR ${err}`)})

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">What do we call you?</label>
            <input 
                id="userName" 
                onChange={e=>{setUserName(e.target.value)}} 
            />
            
            <label htmlFor="password">Secret access code</label>
            <input 
                id="password" 
                onChange={e=>{setPassword(e.target.value)}} 
            />
            <input type="submit" />
            {/* <button onClick={props.handleLogin}>I shall soon die</button> */}
        </form>
    )
}
