import {RelType, Gender} from 'relatives-tree/lib/types';
import {Source} from './useStore';

export const nodes: Source = [
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
