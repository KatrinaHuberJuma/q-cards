"use strict";

function Archive(props) {

    // const [minisData, setMinisData] = React.useState([]);

    // React.useEffect(()=> {
    //     fetch('/cards.json')
    //     .then(response => response.json())
    //     .then(data => setMinisData(data))
    //     .catch(err => {console.error(err)})
    // }, [])

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