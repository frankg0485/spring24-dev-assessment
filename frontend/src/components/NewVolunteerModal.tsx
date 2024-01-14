import { Rating, Modal, Box, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import NewVolunteerModalStyles from "../styles/NewVolunteerModal";

function NewVolunteerModal({ open, onInputChange, onRatingChange, volunteer, handleClose }:
    { open: boolean; onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onRatingChange: (e: React.SyntheticEvent<Element>, val: number | null) => void, volunteer: Volunteer; handleClose: (submit: boolean) => void }) {
  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={NewVolunteerModalStyles.container}>
        <TextField fullWidth id="name" label="Name" variant="outlined" value={volunteer.name} onChange={onInputChange} />
        <TextField fullWidth id="avatar" label="Avatar URL" variant="outlined" value={volunteer.avatar} onChange={onInputChange} />
        <TextField fullWidth id="phone" label="Phone" variant="outlined" value={volunteer.phone} onChange={onInputChange} />
        <TextField fullWidth id="email" label="Email" variant="outlined" value={volunteer.email} onChange={onInputChange} />
        <div>
        <Rating
          id="rating"
          value={volunteer.rating / 2}
          onChange={onRatingChange}
          precision={0.5}
        />
        </div>
        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
        <RadioGroup row id="status" value={volunteer.status} onChange={onInputChange}>
          <FormControlLabel value={true} control={<Radio />} label="Active" />
          <FormControlLabel value={false} control={<Radio />} label="Inactive" />
        </RadioGroup>
        <TextField fullWidth id="hero_project" label="Hero Project" variant="outlined" value={volunteer.hero_project} onChange={onInputChange} />
        <Button onClick={() => handleClose(true)}>Confirm</Button>
      </Box>
    </Modal>
  );
}

export default NewVolunteerModal;
