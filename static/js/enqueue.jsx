
"use strict";

function Enqueue() {

  const [showForm, setShowForm] = React.useState(false);


  const toggleModal = () => {
    setShowForm( ! showForm ) // bool ? true case : false case
  }
  if (showForm){
    return (
      <React.Fragment>
        <div className="modal" onClick={toggleModal} />
        {/* <button onClick={toggleModal}>Enter the Queue</button> */}
        <div className="modal-main">
          <EnqueueForm toggleModal={toggleModal} />
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <div>
        <button onClick={toggleModal}>Enter the Queue</button>
      </div>
    )
  }

}