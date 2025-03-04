import './gameModeSelector.css'
function GameModeSelector(props){
    let sendGameMode = function(event){
        props.fn(event.target.value);
        return;
    }
    return (
        <section>
            <p className='modeText'>Select Game Mode  </p> 
            <button className="modeBtn" onClick={sendGameMode} value={"Easy"}> Easy </button>
            <button className="modeBtn" onClick={sendGameMode} value={"Medium"}> Medium </button>
            <button className="modeBtn" onClick={sendGameMode} value={"Hard"}> Hard </button>
        </section>
    )
}

export default GameModeSelector