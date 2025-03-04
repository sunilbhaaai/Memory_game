import './gameGrid.css'
import GameButton from '../GameButton/GameButton';
import ResetButton from '../GameButton/ResetButton'
import { useEffect, useRef, useState } from 'react';

let fruits = [
    "../../public/apple.jpg",
    "../../public/avacado.jpg",
    "../../public/banana.jpg",
    "../../public/cherry.jpg",
    "../../public/coconut.jpg",
    "../../public/dragonfruit.jpg",
    "../../public/grapes.jpg",
    "../../public/kiwi.jpg",
    "../../public/lemon.jpg",
    "../../public/litchi.jpg",
    "../../public/mango.jpg",
    "../../public/melon.jpg",
    "../../public/pappaya.jpg",
    "../../public/pear.jpg",
    "../../public/pinapple.jpg",
    "../../public/pormgreneade.jpg",
    "../../public/strawberry.jpg",
    "../../public/watermelon.jpg",
]

function GameGrid(props){
    let prev = props.prev;
    let updatePrev = props.updatePrev;
    let g = useRef(null);
    function buttonHandler(bno){
        // let newStatus = [...props.status];
        // newStatus[bno] = !newStatus[bno];
        // props.updateStatus(newStatus)
        if(props.status[bno]){
            if(prev===-1)
                return;
            else{
                let newStatus = [...props.status];
                newStatus[prev] = false;
                updatePrev(-1);
                props.updateStatus(newStatus);
            }
        }
        else{
            let newStatus = [...props.status];
            if(prev==-1){
                newStatus[bno] = true;
                updatePrev(bno);
            }
            else{
                if(props.pos[prev]===props.pos[bno]){
                    newStatus[bno] = true;
                    updatePrev(-1);
                    props.incFound();
                }
                else{
                    newStatus[bno] = true;
                    // console.log(g.current)
                    g.current.style.pointerEvents = "none";
                    // setTimeout(()=>{
                        //     props.updateStatus((prevS)=>{
                            //         let updateStatus = [...prevS]
                            //         updateStatus[prev] = false;
                            //         updateStatus[bno] = false;
                            //         return updateStatus;
                            //     })
                            // },500)
                            // updatePrev(-1);
                            // When setTimeout runs, prev might still hold the old value
                    setTimeout(()=>{
                        // console.log(prev,"eh")
                        let cpyPrev = prev;
                        props.updateStatus((prevS)=>{
                            let updateStatus = [...prevS];
                            updateStatus[cpyPrev] = false; // will use previous prev that is not -1 cuz react schedule updates 
                            updateStatus[bno] = false
                            return updateStatus;
                        })
                        updatePrev(-1);
                        g.current.style.pointerEvents = "auto";
                    },800)
                }
                props.updateMoves((prevS)=>{return prevS+1})
            }
            props.updateStatus(newStatus);
        }
    } 
    
    function generateGrid(){
        return props.pos.map((x,idx)=>{
            return <GameButton 
            key={idx+1}
            bno={idx}
            enabled = {props.status[idx]}
            buttonHandler={buttonHandler}
            fruits={fruits}>
                {x}
            </GameButton>
        })
    }

    function getGridStyle(){

            return {
                gridTemplateColumns: `repeat(${props.cols},1fr)`,
                gridTemplateRows: `repeat(${props.rows},1fr)`   
            }
;
    }
    //  console.log(prev)
    function genrateCompleteMessage(){
        if(props.isComplete)
            return (
                <div className='win-message'>
                    <p>Completed in : {props.moves} Moves </p>
                    <p>Play Again</p>
                    <ResetButton toggle={props.toggle}></ResetButton>
                </div>
            )
        return false;
    }
    return (
        <div className='grid' style={getGridStyle()} ref={g}>
           {
             generateGrid()
           }
           {
              genrateCompleteMessage()
           }
        </div>
    )
}

export default GameGrid;