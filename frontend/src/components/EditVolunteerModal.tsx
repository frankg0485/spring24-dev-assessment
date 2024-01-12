import { Modal, Box, TextField, Button } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import NewVolunteerModalStyles from "../styles/NewVolunteerModal";

function EditVolunteerModal({ open, onInputChange, volunteer, handleClose }: { open: boolean; onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, volunteer: Volunteer, handleClose: (submit: boolean) => void }) {

    return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={NewVolunteerModalStyles.container}>
        <TextField fullWidth id="name" label="Name" variant="outlined" value={volunteer.name} onChange={onInputChange}/>
        <TextField fullWidth id="avatar" label="Avatar URL" variant="outlined" value={volunteer.avatar} onChange={onInputChange} />
        <TextField fullWidth id="phone" label="Phone" variant="outlined" value={volunteer.phone} onChange={onInputChange} />
        <TextField fullWidth id="email" label="Email" variant="outlined" value={volunteer.email} onChange={onInputChange} />
        <TextField fullWidth id="rating" label="Rating" variant="outlined" value={volunteer.rating} onChange={onInputChange} />
        <TextField fullWidth id="status" label="Status" variant="outlined" value={volunteer.status} onChange={onInputChange} />
        <TextField fullWidth id="hero_project" label="Hero Project" variant="outlined" value={volunteer.hero_project} onChange={onInputChange} />
        <Button onClick={() => handleClose(true)}>Save Changes</Button>
      </Box>
    </Modal>
  );
}

export default EditVolunteerModal;
