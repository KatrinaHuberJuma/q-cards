"use strict";

function Archive(props) {
  
  const makeMinis = () => {
    return props.miniCardData.filter(datum => !datum.isActive)
                             .map(datum => <MiniCard title={ datum.title } />);
  }

  return (
    <div className="archive-container">
      {makeMinis()}
    </div>
  )
}