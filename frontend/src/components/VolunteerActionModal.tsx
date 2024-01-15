import { Checkbox, Rating, Modal, Box, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import "../styles/VolunteerActionModal.css";

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
  isEditing: boolean;
}) {
  return (
    <Modal open={open} onClose={() => handleClose(false)} className="VolunteerActionModal">
      <Box className="container">
        
        <Box sx={{ textAlign: "center", fontSize: "1.5rem" }}>{isEditing ? `Edit ${volunteer.name}'s Info` : "Add New Volunteer"}</Box>
        <br />
        <form onSubmit={() => handleClose(true)} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
          <TextField required={true} fullWidth id="name" label="Name" variant="outlined" value={volunteer.name} onChange={onInputChange} />
          <TextField fullWidth id="avatar" label="Avatar URL" variant="outlined" value={volunteer.avatar} onChange={onInputChange} />
          <TextField type="phone" required fullWidth id="phone" label="Phone" variant="outlined" value={volunteer.phone} onChange={onInputChange} />
          <TextField type="email" required fullWidth id="email" label="Email" variant="outlined" value={volunteer.email} onChange={onInputChange} />
          <TextField fullWidth id="hero_project" label="Hero Project" variant="outlined" value={volunteer.hero_project} onChange={onInputChange} />
          <div style={{ display: "flex", alignItems: "center", paddingTop: "2vh", paddingBottom: "2vh" }}>
            <Box sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Rating:</Box>
            <Rating sx={{ flex: 1, justifyContent: "center" }} id="rating" max={9} value={volunteer.rating} onChange={onRatingChange} />
            <Box sx={{ flex: 1.5, textAlign: "left" }}>{`(${volunteer.rating} / 9)`}</Box>
          </div>
          <div style={{ width: "100%", textAlign: "start" }}>
            <FormControlLabel sx={{ marginLeft: 0, color: "rgba(0, 0, 0, 0.6)" }} id="status" labelPlacement="start" control={<Checkbox checked={volunteer.status} onChange={onInputChange} />} label="Active?" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={() => handleClose(false)} className="btn-action">
              Cancel
            </Button>
            <Button type="submit" className="btn-action" sx={{ fontWeight: 600 }}>
              Confirm
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default VolunteerActionModal;
