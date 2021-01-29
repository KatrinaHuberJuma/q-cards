"use strict";
function Main() {
    
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [isStaff, setIsStaff] = React.useState(false)

    const handleLogin = () => {
        setLoggedIn(!loggedIn);
    }

    const declareStaff = () => {
        alert("yup, staff")
        setIsStaff(true);
    }

    if (loggedIn && isStaff) {
        return (
            <React.Fragment>
                <h1>Bat cave access granted</h1>
                <Queue isStaff={isStaff} />
            </React.Fragment>
        )
    } else if (loggedIn) {
        return (
            <React.Fragment>
                <h1>Bat cave access granted</h1>
                <Enqueue />
                <Queue isStaff={isStaff} />
            </React.Fragment>
        )
    } else {
        return ( 
            <React.Fragment>
                <LoginForm handleLogin={handleLogin} declareStaff={declareStaff} />
            </React.Fragment>
        )
    }
}

