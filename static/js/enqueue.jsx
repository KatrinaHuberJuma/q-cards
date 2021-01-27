"use strict";

function Enqueue() {

    const makeAlert = () => {
        alert('Woot!');
    }

    return(
        <div>
            <button onClick={makeAlert}>I'm just hanging out</button>
            <EnqueueForm />
        </div>
    )
}