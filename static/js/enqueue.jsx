
"use strict";

function Enqueue({setNeedsRefetch}) {

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
          <EnqueueForm toggleModal={toggleModal} setNeedsRefetch={setNeedsRefetch} />
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