import {Node, RelType, Gender} from 'relatives-tree/lib/types';
import {Tree} from './components';
import styles from './App.module.css';

type Source = Array<Node>;

export const App = () => {
  return (
    <div className={styles.root}>
      <Tree data={data} />
    </div>
  );
};

const data: Source = [
  {
    id: 'dyTpfj6sr',
    gender: 'male' as Gender,
    spouses: [],
    siblings: [],
    parents: [],
    children: [
      {
        id: 'ahfR5lR2s',
        type: 'blood' as RelType,
      },
      {
        id: 'aoF9dn5Ew',
        type: 'blood' as RelType,
      },
    ],
  },
  {
    id: 'ahfR5lR2s',
    gender: 'female' as Gender,
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
  {
    id: 'aoF9dn5Ew',
    gender: 'male' as Gender,
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
