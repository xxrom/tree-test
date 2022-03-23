import {memo, useState} from 'react';
import ReactFamilyTree from 'react-family-tree';
import {Node, ExtNode} from 'relatives-tree/lib/types';
import {FamilyNode} from '../FamilyNode';
import styles from './Tree.module.css';
import {PinchZoomPan} from '../PinchZoomPan';

type Source = Array<Node>;

const WIDTH = 70;
const HEIGHT = 80;

export type TreeProps = {
  data: Source;
};

export const Tree = memo<TreeProps>(({data}) => {
  const [rootId] = useState(data[0].id);
  const [nodes] = useState(data);

  return (
    <PinchZoomPan min={0.5} max={2.5} captureWheel className={styles.wrapper}>
      <ReactFamilyTree
        nodes={nodes as Node[]}
        rootId={rootId}
        width={WIDTH}
        height={HEIGHT}
        className={styles.tree}
        renderNode={(node: ExtNode) => {
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
        }}
      />
    </PinchZoomPan>
  );
});
