import {RelType, Gender} from 'relatives-tree/lib/types';
import {Source} from './useStore';

export const twoNodes: Source = [
  {
    id: 'dyTpfj6sr',
    gender: 'female' as Gender,
    firstName: 'Hailey',
    lastName: 'Ginnish',
    photoUrl: 'https://randomuser.me/api/portraits/women/95.jpg',
    spouses: [],
    siblings: [],
    parents: [],
    children: [
      {
        id: 'ahfR5lR2s',
        type: 'blood' as RelType,
      },
    ],
  },
  {
    id: 'ahfR5lR2s',
    gender: 'male' as Gender,
    firstName: 'Abdullah',
    lastName: 'Nybakk',
    photoUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
    spouses: [],
    siblings: [],
    parents: [
      {
        id: 'dyTpfj6sr',
        type: 'blood' as RelType,
      },
    ],
    children: [],
  },
];

export const threeNodes: Source = [
  {
    id: 'dyTpfj000',
    gender: 'male' as Gender,
    firstName: 'first1',
    lastName: 'last1',
    photoUrl: '',
    spouses: [],
    siblings: [],
    parents: [],
    children: [
      {
        id: 'ahfR5lR22',
        type: 'blood' as RelType,
      },
      {
        id: 'ahfR5lR23',
        type: 'blood' as RelType,
      },
    ],
  },
  {
    id: 'ahfR5lR22',
    gender: 'female' as Gender,
    firstName: 'first2',
    lastName: 'last2',
    photoUrl: '',
    spouses: [],
    siblings: [],
    parents: [
      {
        id: 'dyTpfj000',
        type: 'blood' as RelType,
      },
    ],
    children: [],
  },
  {
    id: 'ahfR5lR33',
    gender: 'female' as Gender,
    firstName: 'first3',
    lastName: 'last3',
    photoUrl: '',
    spouses: [],
    siblings: [],
    parents: [
      {
        id: 'dyTpfj000',
        type: 'blood' as RelType,
      },
    ],
    children: [],
  },
];

export const oneNodeObject = {
  id: 'ahfR5lRRR',
  gender: 'female' as Gender,
  firstName: 'first2',
  lastName: 'last2',
  photoUrl: '',
  spouses: [],
  siblings: [],
  parents: [],
  children: [],
};
