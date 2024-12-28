
// FormDialog.js
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category,
    });

    const handleEditValues = () => {
        axios.put(`${baseUrl}/edit`, {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        axios.delete(`${baseUrl}/delete/${editValues.id}`);
    };

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="name" label="Title" defaultValue={props.name} type="text" onChange={handleChangeValues} fullWidth variant="standard" />
                <TextField autoFocus margin="dense" id="cost" label="Cost" defaultValue={props.cost} type="text" onChange={handleChangeValues} fullWidth variant="standard" />
                <TextField autoFocus margin="dense" id="category" label="Category" defaultValue={props.category} type="text" onChange={handleChangeValues} fullWidth variant="standard" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditValues}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
