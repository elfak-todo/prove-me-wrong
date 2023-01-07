import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Dispatch, useState, MouseEvent, useEffect } from 'react';
import Tag from '../../models/tag';
import { ITopic } from '../../models/topic';
import TopicFeedData from '../../models/topic.feed.dto';
import { getTags } from '../../services/tag.service';
import { createTopic } from '../../services/topic.service';

interface TopicFormProps {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  feed: TopicFeedData[];
  setFeed: Dispatch<React.SetStateAction<TopicFeedData[]>>;
}

function TopicForm({ setIsOpen, feed, setFeed }: TopicFormProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  const [topic, setTopic] = useState<ITopic>({
    title: '',
    description: '',
    tags: [],
  });

  useEffect(() => {
    getTags()
      .then(({ data }) => setTags(data))
      .catch(({ error }) => console.log(error));
  }, []);

  const handlePost = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const { title, description, tags } = topic;

    if (title === '' || description === '') return;

    if (!tags || tags.length === 0 || tags.length > 3) return;

    createTopic(topic)
      .then(({ data }) => {
        setFeed([
          {
            topic: data.topic,
            author: data.author,
            tags: topic.tags!,
          },
          ...feed,
        ]);
      })
      .catch(({ error }) => console.log(error));

    setIsOpen(false);
  };

  return (
    <>
      <DialogTitle>Kreiranje teme za diskusiju</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2} mt={2}>
          <Autocomplete
            size="small"
            multiple
            options={tags}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Izaberite tagove"
                placeholder="Programiranje, Sport, Politika..."
              />
            )}
            onChange={(event, value) => setTopic({ ...topic, tags: value })}
          />
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
