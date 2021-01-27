"use strict";

function Enqueue() {

    const makeAlert = () => {
        alert('Woot!');
    }

    return(
        <div>
            <button onClick={makeAlert}>Enter the Queue</button>
            <EnqueueForm />
        </div>
    )
}