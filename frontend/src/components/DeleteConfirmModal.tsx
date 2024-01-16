import { Rating, Modal, Box, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import "../styles/DeleteConfirmModal.css"
function DeleteConfirmModal({
  open,
  volunteer,
  handleClose
}: {
  open: boolean;
  volunteer: Volunteer;
  handleClose: (confirm: boolean) => void;
}) {
  return (
    <Modal className="DeleteConfirmModal" open={open} onClose={() => handleClose(false)}>
      <Box className="container">
        <Box sx={{textAlign: "center", fontSize: "1.5rem"}}>
          {`Delete ${volunteer.name}?`}
        </Box>
        <br/>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={() => handleClose(false)} className="btn-action">
              Cancel
            </Button>
            <Button className="btn-action" onClick={() => handleClose(true)} sx={{ fontWeight: 600 }}>
              Confirm
            </Button>
          </div>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmModal;
