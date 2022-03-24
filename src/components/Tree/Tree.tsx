import {memo, useCallback, useState} from 'react';
import ReactFamilyTree from 'react-family-tree';
import {Node, ExtNode} from 'relatives-tree/lib/types';
import {FamilyNode} from '../FamilyNode';
import styles from './Tree.module.css';
import {PinchZoomPan} from '../PinchZoomPan';
import {useStore} from '../../hooks/useStore';

const WIDTH = 70;
const HEIGHT = 80;

export const Tree = memo(() => {
  const {nodes, bears, addBear, decBear} = useStore();

  const [rootId] = useState(nodes[0].id);

  const onRenderNode = useCallback(
    (node: ExtNode) => {
      console.log('node', node);

      return (
        <FamilyNode
          key={node.id}
          node={node}
          isRoot={node.id === rootId}
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top *
              (HEIGHT / 2)}px)`,
          }}
        />
      );
    },
    [rootId],
  );

  return (
    <PinchZoomPan min={0.5} max={2.5} captureWheel className={styles.wrapper}>
      <div>
        <h1>{bears}</h1>
        <button onClick={addBear}>addBear</button>
        <button onClick={decBear}>decBear</button>

        <div>Tree</div>
        <ReactFamilyTree
          nodes={nodes as Node[]}
          rootId={rootId}
          width={WIDTH}
          height={HEIGHT}
          className={styles.tree}
          renderNode={onRenderNode}
        />
      </div>
    </PinchZoomPan>
  );
});
