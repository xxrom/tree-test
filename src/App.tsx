import {memo} from 'react';
import {Tree} from './components';
import styles from './App.module.css';

export const App = memo(() => (
  <div className={styles.root}>
    <Tree />
  </div>
));
