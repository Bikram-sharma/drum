import React, { useCallback, useState } from 'react'
import '../App.css'

function DrumMachine() {

    const pads = [
        {
            id:'Heater 1',
            text:'Q',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
        },

        {
            id:'Heater 2',
            text:'W',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
        },

        {
            id:'Heater 3',
            text:'E',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
        },

        {
            id:'Heater 4',
            text:'A',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
        },

        {
            id:'Clap',
            text:'S',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
        },

        {
            id:'Open-HH',
            text:'D',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
        },

        {
            id:"Kick-n'-Hat",
            text:'Z',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
        },

        {
            id:'Kick',
            text:'X',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
        },

        {
            id:'Closed-HH',
            text:'C',
            url:'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
        },

    ]

    const [Power, setPower] = useState(true);
    const [volume, setvolume] = useState(0.3)


    function togglePower(){
        
         

        const position = document.querySelector('.switch-bord').style.justifyContent;

        if(position == 'end'){

            document.querySelector('.switch-bord').style.justifyContent = 'start';
            document.querySelector('.switch-bord').style.background='red' 
            setPower(false)

        }else{
            document.querySelector('.switch-bord').style.justifyContent = 'end';
            document.querySelector('.switch-bord').style.background='' 
            setPower(true)
        }
    }

    function screenDisplayer(text){

        document.getElementById('screen').textContent = text

    }


    function sound(event){

        if(Power){

            document.getElementById(event.target.textContent).volume=volume
            document.getElementById(event.target.textContent).play()

            event.target.style.background='orange'
    
            setTimeout(()=>{
                 event.target.style.background=''
            },100);
    
            screenDisplayer(event.target.id)

        }

        

    }

    function volumeControl(event){


     screenDisplayer(`Volume:${(event.target.value)*100}`)
     setTimeout(screenDisplayer,1000,'')
     setvolume(event.target.value)


    }

    useCallback(

        document.addEventListener('keypress', (e)=>{

            const id = e.key.toUpperCase();
            const target = document.getElementById(id);
            const pad = target.parentElement;
           
            if(Power){

                  target.volume=volume
                  target.play()
                  pad.style.backgroundColor='orange'
      
      
                  screenDisplayer(pad.id)
      
          
              setTimeout(()=>{
                  document.getElementById(id).parentElement.style.backgroundColor=''
              },100)

            };
          
      
        })
    )

    

   

   



    
  


  return (
    <div id='drum-machine'>
        
        <div id='drum-pads'>{pads.map((pad)=> <div className='drum-pad' id={pad.id} onClick={(e)=>sound(e)}>{pad.text}<audio id={pad.text} src={pad.url} className='clip'></audio></div>)}</div>
        <div id='display'>
            <div className='power'>
                <label>Power</label>
                <div className='switch-bord' onClick={togglePower}>
                    <div className='switch' id='switch'></div>
                </div>
            </div>
            <div className='screen' id='screen'></div>
            <input type='range' min={0} max={1}  value={volume} step={0.01} className='volume' onChange={(e)=>volumeControl(e)}></input>
            <div className='bank'>
            <label>Bank</label>
                <div className='switch-bord'>
                    <div className='switch'></div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default DrumMachine