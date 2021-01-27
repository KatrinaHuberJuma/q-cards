"use strict";

function EnqueueForm(){
    const [greatness, setGreatness] = React.useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(greatness)
    }

    return (<form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="tell me about your greatness" 
            value={greatness} 
            onChange={e => setGreatness(e.target.value)}
        />
        <input type="submit" />
    </form>)

}
