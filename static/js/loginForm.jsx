"use strict";

function LoginForm({handleLogin, declareStaff}) {
    
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [remembered, setRemembered] = React.useState(true)

const handleSubmit = (evt) => {
  evt.preventDefault();
  // console.log(`We call you ${userName}`);
  // console.log(`Secret code ${password}`);
  const options = {
    method : 'POST',
    body: JSON.stringify({
      'email': email,
      'password': password
    }),
    headers: {'Content-type': 'application/json; charset=UTF-8'}
  }

  fetch('/login', options)
  .then(response => {
    if (response.status === 200){  // Question: is this a thing that is good/bad/fine?
      return response.json();
    } else {
      console.error(`ERROR ${response.statusText}`)
    }
  })
  .then(data => {
    console.log('about to deal with some cool data', data)
    localStorage.setItem('jobTitle', data.job_title);

    console.log(`here is your snakey user_id ${data.user_id}`);
    console.log(`remember me???? ${remembered}`);
    remembered ? handleLogin(data.user_id) : handleLogin();

    if (data.is_staff){ // TODO: isStaff
      console.log('data.is_staff seems true....') // TODO: isStaff
      declareStaff();
    }
  })
  .catch(err => {console.error(`ERROR ${err}`)})

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">what is your eeeemail?</label>
      <input 
        id="email" 
        onChange={e=>{setEmail(e.target.value)}} 
      />
      
      <label htmlFor="password">Secret access code</label>
      <input 
        id="password" 
        onChange={e=>{setPassword(e.target.value)}} 
      />
      <label htmlFor="rememberMe">Remember me</label>
      <input type="checkbox" name="rememberMe" checked={remembered} onChange={ (evt) =>{
          console.log(evt.target.attributes); 
          console.log(remembered); 
          setRemembered(evt.target.checked); 
          console.log(remembered);
      }}></input>
      <input type="submit" />
    </form>
  )
}
