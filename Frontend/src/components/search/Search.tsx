import { Autocomplete, Box, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useDebounce from '../../debaunce';
import User from '../../models/user';
import { searchUsers } from '../../services/user.service';
import UserAvatar from '../avatar/UserAvatar';
import './Search.css';

function Search() {
  const [result, setResult] = useState<User[]>([]);
  const [input, setInput] = useState<string>('');
  const debauncedInput = useDebounce<string>(input, 250);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debauncedInput.length) {
      setResult([]);
      return;
    }
    searchUsers(debauncedInput)
      .then(({ data }) => setResult(data))
      .catch(({ error }) => console.log(error));
  }, [debauncedInput]);

  return (
    <Paper className="search-main" elevation={2}>
      <Autocomplete
        freeSolo
        options={result}
        getOptionLabel={(r) =>
          typeof r === 'string' ? r : `${r.firstName} ${r.lastName}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pretraži ljude"
            variant="outlined"
            color="primary"
          />
        )}
        renderOption={(params, option) => (
          <Box
            key={option.id}
            onClick={() => navigate(`/profile/${option.id}`)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
            }}
          >
            <UserAvatar
              id={option.id}
              name={`${option.firstName} ${option.lastName}`}
              size={24}
            />
            <Typography mb={0} variant="body1">
              {`${option.firstName} ${option.lastName}`}
            </Typography>
          </Box>
        )}
        onInputChange={(ev, val) => setInput(val)}
      />
    </Paper>
  );
}

export default Search;
