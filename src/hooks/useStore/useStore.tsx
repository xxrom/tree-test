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

export type FromUserType = {
  gender?: 'male' | 'female';
  firstName?: string;
  lastName?: string;
};

export interface StoreType {
  nodes: Source;
  rootId: string;
  replaceNodes: (nodes: Source) => void;
  addChild: (parentId: string, fromUser?: FromUserType) => void;
  delNode: (nodeId: string) => void;
}

const userApiUrl = 'https://randomuser.me/api/';

export const useStore = create<StoreType>(set => ({
  nodes: twoNodes,
  rootId: twoNodes[0].id,
  replaceNodes: newNodes =>
    set(state => ({...state, rootId: newNodes[0].id, nodes: newNodes})),
  addChild: async (parentId, fromUser = {}) => {
    const newChild = await getNewChild(parentId, fromUser);

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

      if (nodeId === state.rootId && deletedNode.children.length !== 1) {
        console.info(
          'Node have more then one child or does`t have any',
          deletedNode,
        );

        return state;
      }

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

const getNewChild = async (
  parentId: string,
  {gender, firstName, lastName}: FromUserType,
) => {
  const response = await fetch(userApiUrl);
  const {results} = await response.json();
  const [item] = results;

  return {
    id: v4(),
    gender: gender || item?.gender || 'male',
    firstName: firstName || item?.name?.first || 'firstName',
    lastName: lastName || item?.name?.last || 'lastName',
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
