import create from 'zustand';
import {Node, RelType} from 'relatives-tree/lib/types';
import {twoNodes} from './nodes';
import {v4} from 'uuid';

export type PersonType = Node & {
  firstName: string;
  lastName: string;
  photoUrl: string;
};
export type Source = Array<PersonType>;

export interface StoreType {
  nodes: Source;
  rootId: string;
  addChild: (parentId: string) => void;
  delNode: (nodeId: string) => void;
}

const getNewChild = async (parentId: string) => {
  const response = await fetch(userApiUrl);
  console.log('fetch reponse', response);
  const {results} = await response.json();
  const [item] = results;
  console.log('fetch user', item);

  return {
    id: v4(),
    gender: item?.gender || 'male',
    firstName: item?.name?.first || 'firstName',
    lastName: item?.name?.last || 'lastName',
    photoUrl: item?.picture?.large || '',
    spouses: [],
    siblings: [],
    parents: [
      {
        id: parentId,
        type: 'blood' as RelType,
      },
    ],
    children: [],
  };
};

const userApiUrl = 'https://randomuser.me/api/';

export const useStore = create<StoreType>(set => ({
  nodes: twoNodes,
  rootId: twoNodes[0].id,
  addChild: async parentId => {
    const newChild = await getNewChild(parentId);

    return set(state => {
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
    });
  },
  delNode: nodeId =>
    set(state => {
      const [deletedNode] = state?.nodes?.filter(node => node.id === nodeId);

      // Removing node with id === nodeId
      const nodes0 = state?.nodes?.filter(node => node.id !== nodeId);

      // Removing nodeId in children and parents (for parents and children)
      const nodes1 = nodes0.map(node => ({
        ...node,
        children: node?.children?.filter(({id}) => id !== nodeId),
        parents: node?.parents?.filter(({id}) => id !== nodeId),
      }));

      // Linking all children to parents
      const nodes2 = nodes1.map(node => {
        if (deletedNode?.parents.some(({id}) => id === node.id)) {
          // Found parent where we have to add children from deletedNode
          return {
            ...node,
            children: [...node.children, ...deletedNode.children],
          };
        }

        return node;
      });

      // Adding parents to all children from deletedNode
      const nodes3 = nodes2.map(node => {
        if (deletedNode?.children?.some(({id}) => id === node.id)) {
          // Found child from deletedNode.children => add parents from deletedNode
          return {
            ...node,
            parents: [...node.parents, ...deletedNode?.parents],
          };
        }

        return node;
      });

      return {
        ...state,
        rootId:
          state.rootId === nodeId ? deletedNode?.children[0]?.id : state.rootId,
        nodes: nodes3,
      };
    }),
}));
