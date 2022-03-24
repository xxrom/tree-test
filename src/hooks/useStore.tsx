import create from 'zustand';
import {Node} from 'relatives-tree/lib/types';
import {data} from './data';

export type Source = Array<Node>;

export interface NodesType {
  nodes: Source;
  bears: number;
  addBear: () => void;
  decBear: () => void;
}

export const useStore = create<NodesType>(set => ({
  nodes: data,
  bears: 0,
  addBear: () => set(state => ({bears: state.bears + 1})),
  decBear: () => set(state => ({bears: state.bears - 1})),
}));
