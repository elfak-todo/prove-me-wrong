import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Dispatch, useState, MouseEvent } from 'react';
import { ITopic } from '../../models/topic';
import { createTopic } from '../../services/topic.service';

interface TopicFormProps {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  feed: ITopic[];
  setFeed: Dispatch<React.SetStateAction<ITopic[]>>;
}

function TopicForm({ setIsOpen, feed, setFeed }: TopicFormProps) {
  const [topic, setTopic] = useState<ITopic>({
    title: '',
    description: '',
  });

  const handlePost = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const { title, description } = topic;

    if (title === '' || description === '') return;

    console.log(feed);
    createTopic(topic)
      .then(({ data }) => setFeed([...feed, data]))
      .catch(({ error }) => console.log(error));

    setIsOpen(false);
  };

  return (
    <>
      <DialogTitle>Kreiranje teme za diskusiju</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            label="Tema"
            fullWidth
            variant="outlined"
            onChange={(event) =>
              setTopic({ ...topic, title: event.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Opis teme"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange={(event) =>
              setTopic({ ...topic, description: event.target.value })
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePost} variant="contained">
          Kreiraj
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Odustani
        </Button>
      </DialogActions>
    </>
  );
}

export default TopicForm;
