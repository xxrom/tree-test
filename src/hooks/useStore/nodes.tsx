import {RelType, Gender} from 'relatives-tree/lib/types';
import {Source} from './useStore';

export const twoNodes: Source = [
  {
    id: 'dyTpfj6sr',
    gender: 'male' as Gender,
    firstName: 'first',
    lastName: 'last',
    photoUrl: '',
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
    gender: 'female' as Gender,
    firstName: 'first',
    lastName: 'last',
    photoUrl: '',
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
