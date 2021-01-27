"use strict";

function Enqueue() {

    const [showForm, setShowForm] = React.useState(false);


    const toggleModal = () => {
        setShowForm( ! showForm ) // bool ? true case : false case
    }
    if (showForm){
        return (
            <div>
                <button onClick={toggleModal}>Enter the Queue</button>
                <EnqueueForm />
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={toggleModal}>Enter the Queue</button>
            </div>
        )
    }

}