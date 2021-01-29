"use strict";
function Main() {
    
    const [loggedIn, setLoggedIn] = React.useState(false)

    const handleLogin = () => {
        setLoggedIn(!loggedIn);
    }

    if (loggedIn) {
        return (
            <h1>Bat cave access granted</h1>
        )
    }

    return ( <React.Fragment>
        <LoginForm handleLogin={handleLogin} />
        <Enqueue />
        <Queue />
    </React.Fragment>)
}

