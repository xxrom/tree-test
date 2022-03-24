import classNames from 'classnames';
import React, {memo, useCallback} from 'react';
import {ExtNode} from 'relatives-tree/lib/types';
import {useStore} from '../../hooks';
import styles from './FamilyNode.module.css';

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  style?: React.CSSProperties;
}

export const FamilyNode = memo(({node, isRoot, style}: FamilyNodeProps) => {
  const {addChild} = useStore();

  console.log('Render: FamilyNode', node);
  console.log('addChild');
  const onAddChild = useCallback(() => {
    addChild(node?.id);
  }, [addChild, node?.id]);

  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
        className={classNames(
          styles?.inner,
          styles[node.gender],
          isRoot && styles.isRoot,
        )}>
        <div>{node?.id}</div>
        <button onClick={onAddChild}>addChild</button>
      </div>
      {node.hasSubTree && (
        <div className={classNames(styles.sub, styles[node.gender])} />
      )}
    </div>
  );
});
