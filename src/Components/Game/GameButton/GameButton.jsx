
import './gameButton.css'
function GameButton(props){
    function makeClass(){
        let res = "gameBtn";
        if(props.enabled){
            res += " animate"
        }
        return res;
    }

    return (
        <div className={makeClass()} onClick={()=>{
            props.buttonHandler(props.bno);
            }}>
            {/* {
                props.enabled && 
                <p> {props.children} </p>
            } */}
            <div className='front'>
            </div>
            <div className='back'>
                <img src={props.fruits[props.children]} width="100%" style={{borderRadius:"inherit"}}></img>
            </div>
        </div>
    )
}

export default GameButton;