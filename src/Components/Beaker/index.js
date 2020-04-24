import React from 'react';
import './styles.css';
import Draggable from 'react-draggable';
import useInterval from '../../Hooks/useInterval';


const Beaker = () => {
    const [defaultPos] = React.useState({x: 100, y: 220});
    const [deltaPosition, setDeltaPosition] = React.useState({x: 0, y:0});
    const [position, setPosition] = React.useState(null);
    const [beaker, setBeaker] = React.useState(null);
    const [rotation, setRotation] = React.useState(0);

    // React.useEffect(() => {
        
    //     setBeaker(document.getElementById('special-beaker'));

    //     return () => {
    //       //cleanup  
    //     };
    // }, []);
    
    const handleStop = (e) => {
        const currentPos = {x: deltaPosition.x + defaultPos.x, y: deltaPosition.y + defaultPos.y};
        //if manual position isn't null, beaker is falling
        setPosition(currentPos);
    }

    const applyGravity = () => {
        if(position !== null){
            setPosition({...position, y: position.y + 9.8});
            setRotation(45);

            //acts as floor, preventing falling through lab table
            if(position.y > 200){
                //resets height delta to 0
                setDeltaPosition({...deltaPosition, y:0})
                setPosition(null);
            }
        }
    }

    const handleDrag = (e, ui) => {
        setDeltaPosition({x: (deltaPosition.x + ui.deltaX), y: (deltaPosition.y + ui.deltaY)} );
    }

    useInterval(applyGravity, (position !== null) ? 10 : null);

    return (
        <Draggable defaultPosition={defaultPos}  position={position} onDrag={handleDrag} onStop={handleStop}>
            <div className="beaker-container">
                <div  className="beaker-container" style={{transform: `rotate(${rotation}deg)`}} >
                <div className="beaker"></div>
                </div>
                
            </div>
        </Draggable>
    )
}

export default Beaker;