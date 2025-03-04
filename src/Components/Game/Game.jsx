import ReadtDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react'
import './game.css'
import GameGrid from './GameGrid/GameGrid'
import GameModeSelector from './GameModeSelector/GameModeSelector'
import ResetButton from './GameButton/ResetButton'
let modesSettings = {
    'Easy' : {
        rows: 4,
        cols: 4,
    },
    'Medium' : {
        rows : 5,
        cols : 4,
    },
    'Hard' : {
        rows : 6,
        cols : 6
    }
}

function Game(){
    const [mode,updateMode] = useState("Medium")
    let [prev,updatePrev] = useState(-1);
    const [pos,updatePos] = useState(genreatePostion())
    const [status,updateStatus] = useState(genreateIntialStatus());
    const [foundCount,updateFoundCount] = useState(0);
    const [moveCount,updateMoveCount] = useState(0);
    const [reset,updateReset] = useState(false)
    function getGameMode(uMode){
        if(mode===uMode)
            return;
        else{
            updateMode(uMode)
        }  
    }
    function incFound(){
        let size = modesSettings[mode].rows * modesSettings[mode].cols;
        if(size/2-1==foundCount){
            console.log(foundCount)
            console.log("won")
        }
            updateFoundCount((prevS)=>{return prevS+1})
    }
    useEffect(()=>{
        updatePos(genreatePostion());
        updateStatus(genreateIntialStatus());
        updatePrev(-1);
        updateFoundCount(0);
        updateMoveCount(0)
    },[mode,reset])
    
    function genreateIntialStatus(){
        let size = modesSettings[mode].rows * modesSettings[mode].cols;
        return Array(size).fill(false);
    }
    function shuffleArray(arr){
        for(let i=arr.length-1; i>=0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [arr[i],arr[j]] = [arr[j],arr[i]];
        }
        return arr;
    }
    function genreatePostion(){
        let arr = []
        let size = modesSettings[mode].rows * modesSettings[mode].cols
        for(let i=0; i<size/2; i++){
            arr.push(i);
            arr.push(i);
        }
        return shuffleArray(arr);
    }
    function toggle(){
        updateReset(!reset)
    }
   
    return(
        <> 
            <GameModeSelector fn={getGameMode}></GameModeSelector>
            <div className='grid-container'>
            <GameGrid 
            mode={mode} 
            pos={pos} 
            status={status}
            cols={modesSettings[mode].cols}
            rows={modesSettings[mode].rows}
            updateStatus = {updateStatus}
            updateMoves = {updateMoveCount}
            incFound = {incFound}
            isComplete = {(modesSettings[mode].rows * modesSettings[mode].cols/2)  == foundCount}
            moves = {moveCount}
            toggle = {toggle}
            prev = {prev}
            updatePrev={updatePrev}
            ></GameGrid>
            </div>
            <div className='moveCounter'>Moves : {moveCount}</div>
            <ResetButton toggle={toggle}></ResetButton>
        </>
    )
}
export default Game;