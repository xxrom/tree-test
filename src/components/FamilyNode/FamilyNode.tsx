import classNames from 'classnames';
import React, {memo} from 'react';
import {ExtNode} from 'relatives-tree/lib/types';
import styles from './FamilyNode.module.css';

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  style?: React.CSSProperties;
}

export const FamilyNode = memo(({node, isRoot, style}: FamilyNodeProps) => {
  console.log('Render: FamilyNode');

  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
        className={classNames(
          styles?.inner,
          styles[node.gender],
          isRoot && styles.isRoot,
        )}
      />
      {node.hasSubTree && (
        <div className={classNames(styles.sub, styles[node.gender])} />
      )}
    </div>
  );
});
