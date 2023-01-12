import {
  Box,
  Chip,
  Typography,
  IconButton,
  Dialog,
  Autocomplete,
  TextField,
  DialogTitle,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import DialogContent from '@mui/material/DialogContent';
import { getTags } from '../../services/tag.service';
import Tag from '../../models/tag';
import DialogActions from '@mui/material/DialogActions';
import UserProfileData from '../../models/user.profile.dto';
import { editInterests } from '../../services/user.service';
import UserContext from '../userManager/UserManager';

interface InterestsProps {
  profileData: UserProfileData;
  setProfileData: Dispatch<SetStateAction<UserProfileData>>;
}

function Interests({ profileData, setProfileData }: InterestsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [interests, setInterests] = useState<Tag[]>(profileData.interests);
  const {user} = useContext(UserContext);
  
  const handleSave = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (JSON.stringify(interests) === JSON.stringify(profileData.interests)) {
      setIsOpen(false);
      return;
    }

    editInterests(interests)
      .then((res) => setProfileData({ ...profileData, interests: interests }))
      .catch(({ error }) => console.log(error));

    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    getTags()
      .then(({ data }) => setTags(data))
      .catch(({ error }) => console.log(error));
  }, [isOpen]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mt={2} variant="subtitle1" color="text.secondary">
          Interesovanja
        </Typography>
        {profileData.user?.id === user?.id && <IconButton
          color="primary"
          sx={{ marginTop: 1 }}
          onClick={() => setIsOpen(true)}
        >
          <EditIcon />
        </IconButton>}
      </Box>
      <Box sx={{ display: 'flex', margin: 0, padding: 0 }}>
        {profileData.interests?.length ? (
          profileData.interests?.map((el) => {
            return (
              <Chip
                key={el.id}
                label={el.name}
                color="primary"
                size="small"
                sx={{ marginRight: 1 }}
              />
            );
          })
        ) : (
          <Typography variant="subtitle2" color="text.secondary">
            Nema interesovanja za prikaz
          </Typography>
        )}
      </Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
        <DialogTitle>Odabir interesovanja</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <Autocomplete
            sx={{ marginTop: 2 }}
            multiple
            options={tags}
            getOptionLabel={(option) => option.name}
            defaultValue={profileData.interests}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Izaberite interesovanja"
                placeholder="Programiranje, Sport, Politika..."
              />
            )}
            onChange={(event, value) => setInterests(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSave}>
            Sačuvaj
          </Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Otakaži
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Interests;
