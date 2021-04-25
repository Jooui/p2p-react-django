import { useState } from 'react';
import './admin.editUsers.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const EditUserModal = ({ user, visibleModal, setVisibleModal }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setVisibleModal(false);
    };

    return (
        <Dialog className="dialogEditUser" onClose={handleClose} aria-labelledby="customized-dialog-title" open={visibleModal} fullScreen={fullScreen}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Edit user
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email_user"
                    label="Email"
                    type="email"
                    fullWidth
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="username_user"
                    label="Username"
                    type="text"
                    fullWidth
                />



                <TextField
                    autoFocus
                    margin="dense"
                    id="bio_user"
                    label="Biography"
                    type="text"
                    fullWidth
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="image_user"
                    label="Image"
                    type="text"
                    fullWidth
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            id="isadmin_user"
                            name="isadmin"
                            color="secondary"
                        />
                    }
                    label="Administrator"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Save changes
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditUserModal