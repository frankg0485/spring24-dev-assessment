import { Rating, Modal, Box, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import VolunteerActionModalStyles from "../styles/VolunteerActionModalStyles";

function VolunteerActionModal({
  open,
  onInputChange,
  onRatingChange,
  volunteer,
  handleClose,
  isEditing,
}: {
  open: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRatingChange: (e: React.SyntheticEvent<Element>, val: number | null) => void;
  volunteer: Volunteer;
  handleClose: (submit: boolean) => void;
  isEditing: boolean
}) {
  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={VolunteerActionModalStyles.container}>
        <Box sx={{textAlign: "center", fontSize: "1.5rem"}}>
          {isEditing ? `Edit ${volunteer.name}'s Info` : "Add New Volunteer"}
        </Box>
        <br />
        <TextField fullWidth id="name" label="Name" variant="outlined" value={volunteer.name} onChange={onInputChange} />
        <TextField fullWidth id="avatar" label="Avatar URL" variant="outlined" value={volunteer.avatar} onChange={onInputChange} />
        <TextField fullWidth id="phone" label="Phone" variant="outlined" value={volunteer.phone} onChange={onInputChange} />
        <TextField fullWidth id="email" label="Email" variant="outlined" value={volunteer.email} onChange={onInputChange} />
        <div style={{display: "flex", alignItems: "center", paddingTop: "2vh", paddingBottom: "2vh"}}>
          <Box sx={{color: "rgba(0, 0, 0, 0.6)"}}>Rating:</Box>
          <Rating sx={{flex: 1, justifyContent: "center"}}id="rating" max={9} value={volunteer.rating} onChange={onRatingChange} />
          <Box sx={{flex: 1.5, textAlign: "left"}}>{`(${volunteer.rating} / 9)`}</Box>
        </div>
        
        <RadioGroup row id="status" value={volunteer.status} onChange={onInputChange} sx={{display: "flex", alignItems: "center"}}>
          <FormLabel>Status: </FormLabel>
          <FormControlLabel sx={{flex: 1, justifyContent: "center"}} value={true} control={<Radio />} label="Active" />
          <FormControlLabel sx={{flex: 3}} value={false} control={<Radio />} label="Inactive" />
        </RadioGroup>
        <TextField fullWidth id="hero_project" label="Hero Project" variant="outlined" value={volunteer.hero_project} onChange={onInputChange} />
        <Button onClick={() => handleClose(true)}>Confirm</Button>
      </Box>
    </Modal>
  );
}

export default VolunteerActionModal;
