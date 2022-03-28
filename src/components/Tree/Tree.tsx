import {memo, useCallback} from 'react';
import ReactFamilyTree from 'react-family-tree';
import {FamilyNode} from '../FamilyNode';
import styles from './Tree.module.css';
import {PinchZoomPan} from '../PinchZoomPan';
import {useStore} from '../../hooks/useStore';

export const WIDTH = 220;
export const HEIGHT = 270;

export const Tree = memo(() => {
  const {nodes, rootId} = useStore();

  const onRenderNode = useCallback(
    node => (
      <FamilyNode key={node?.id} isRoot={node?.id === rootId} {...node} />
    ),
    [rootId],
  );

  return (
    <PinchZoomPan min={0.5} max={2.5} captureWheel className={styles.wrapper}>
      <div>Tree</div>

      <ReactFamilyTree
        nodes={nodes}
        rootId={rootId}
        width={WIDTH}
        height={HEIGHT}
        className={styles.tree}
        renderNode={onRenderNode}
      />
    </PinchZoomPan>
  );
});
