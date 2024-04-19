/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { List, ListItem } from '@chakra-ui/react';
import { AiOutlineHistory, AiOutlineSetting } from 'react-icons/ai';

import { NavItem } from './NavItem';

const items = [
  // {
  //   type: 'link',
  //   label: 'New Chat',
  //   icon: AiOutlineRobot,
  //   path: '/',
  // },
  // {
  //   type: 'link',
  //   label: 'Marked As Favorite',
  //   icon: AiOutlineStar,
  //   path: '/',
  // },
  {
    type: 'link',
    label: 'History',
    icon: AiOutlineHistory,
    path: '/',
  },
  {
    type: 'link',
    label: 'Setting',
    icon: AiOutlineSetting,
    path: '/',
  },
  // {
  //   type: 'link',
  //   label: 'Logout',
  //   icon: AiOutlineLogout,
  //   path: '/',
  // },
];

export function Navigation({ collapse }) {
  return (
    <List w="full" my={12}>
      {items.map((item, index) => (
        <ListItem key={[index]}>
          <NavItem item={item} isActive={index === 0} collapse={collapse} />
        </ListItem>
      ))}
    </List>
  );
}
