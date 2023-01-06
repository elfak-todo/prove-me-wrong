import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string, size: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      mr: 0.5,
      fontSize: size / 2,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

interface UserAvatarProps {
  name: string;
  size: number;
}

function UserAvatar({ name, size }: UserAvatarProps) {
  return <Avatar {...stringAvatar(name, size)} />;
}

export default UserAvatar;
