"use strict";

function Archive(props) {
  
  const makeMinis = () => {

    const minis = props.miniCardData.filter(datum => !datum.isActive)
                            .map(datum => <MiniCard title={ datum.title } />);
    return minis;
  }

  return (
    <div className="archive-container">
      {makeMinis()}
    </div>
  )
}