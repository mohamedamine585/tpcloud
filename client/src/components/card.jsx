import "./card.css";
import FormDialog from "./dialog/dialog";
import axios from "axios";
import React from "react";

const Card = (props) => {
    const [open, setOpen] = React.useState(false);

    const cardOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteGame = () => {
        axios.delete(`http://publiclb-314884982.us-east-1.elb.amazonaws.com/api/games/${props.id}`)
            .then(() => alert("Game deleted successfully"))
            .catch((error) => console.error("Error deleting game:", error));
    };

    return (
        <>
            <FormDialog open={open} setOpen={setOpen} id={props.id} name={props.name} />
            <div className="game-card">
            
                <img 
              height="100"
              width="100"
              src="https://tpbucket25.s3.us-east-1.amazonaws.com/gameLogo.png" 
                    
                />
                <div className="info">
                    <h4>{props.name}</h4>
                    <p>${props.cost}</p>
                    <p>{props.category}</p>
                </div>
                
                <div className="actions">
                    <button className="edit" onClick={cardOpen}>Edit</button>
                    <button className="delete" onClick={handleDeleteGame}>Delete</button>
                </div>
            </div>
        </>
    );
};

export default Card;
