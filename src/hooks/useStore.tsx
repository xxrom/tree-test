import create from 'zustand';
import {Node, RelType, Gender} from 'relatives-tree/lib/types';
import {data} from './data';
import {v4} from 'uuid';

export type Source = Array<Node>;

export interface NodesType {
  nodes: Source;
  bears: number;
  addBear: () => void;
  decBear: () => void;
  addChild: (parentId: string) => void;
}

const getNewChild = (parentId: string) => ({
  id: v4(),
  gender: 'female' as Gender,
  spouses: [],
  siblings: [],
  parents: [
    {
      id: parentId,
      type: 'blood' as RelType,
    },
  ],
  children: [],
});

export const useStore = create<NodesType>(set => ({
  nodes: data,
  bears: 0,
  addBear: () => set(state => ({bears: state.bears + 1})),
  decBear: () => set(state => ({bears: state.bears - 1})),
  addChild: parentId =>
    set(state => {
      const newChild = getNewChild(parentId);

      const nodes = [...state.nodes].map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: newChild.id,
                type: 'blood' as RelType,
              },
            ],
          };
        }

        return node;
      });

      return {nodes: [...nodes, newChild]};
    }),
}));
