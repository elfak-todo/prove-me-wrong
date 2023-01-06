import { Stack, TextField } from '@mui/material';
import { useContext } from 'react';

import UserAvatar from '../avatar/UserAvatar';
import UserContext from '../userManager/UserManager';

function CommentForm() {
  const { user } = useContext(UserContext);

  return (
    <Stack direction="row" spacing={1}>
      <UserAvatar name={`${user?.firstName} ${user?.lastName}`} size={32} />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={1}
        placeholder="Ostavi komentar"
      />
    </Stack>
  );
}

export default CommentForm;
