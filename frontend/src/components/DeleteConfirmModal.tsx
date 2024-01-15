import { Rating, Modal, Box, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import DeleteConfirmModalStyles from "../styles/DeleteConfirmModalStyles";

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
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={DeleteConfirmModalStyles.container}>
        <Box sx={{textAlign: "center", fontSize: "1.5em"}}>
          {`Delete ${volunteer.name}?`}
        </Box>
        <br/>
        <Button onClick={() => handleClose(true)}>Confirm</Button>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmModal;
