import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase/firebaseconfig';
import { collection, deleteDoc, doc } from 'firebase/firestore';

export const Cards = ({message}) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async (documentId) => {
        try {
          const documentRef = doc(collection(db , "Post"), documentId);
          await deleteDoc(documentRef);
        //   await documentRef.delete();
        setOpen(false)
    
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };

      const handleClose = () => {
        setOpen(false);
      };

    const AlertDialog =()=>{
        return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(message.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        )
    }

    return (
        <div className='card'>            
                <Card variant="outlined" sx={{alignItems: 'center', justifyContent: 'center', width: 300}}>
                        <CardContent sx={{ minHeight: '180px', display: 'flex', flexDirection: 'column',justifyContent: 'space-around', alignItems: 'center'}}> 
                            <Typography sx={{ fontSize: 20}} color="text.secondary" gutterBottom>Confession</Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center', maxHeight: '100px', overflow: 'hidden', scrollbarWidth: 'none' }}>{message.Message}</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => setOpen(true)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                </Card>
                {open && <AlertDialog/>}
        </div>
    )
}
