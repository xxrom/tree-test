import '../../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import {useStore} from './useStore';
import {oneNodeObject, twoNodes, threeNodes} from './nodes';

describe('useStore', () => {
  // Init store hook
  const view = renderHook(() => useStore(state => state));

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({results: [oneNodeObject]}));
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();

    const {replaceNodes} = view?.result?.current;

    // Init with two Nodes before each test
    act(() => {
      replaceNodes(twoNodes);
    });
  });

  // ---
  // addChild
  // ---
  it('call addChild(), nodes size + 1', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const nodesSize = nodes?.length;

    await act(async () => {
      result.current.addChild(nodes[0]?.id);
    });

    expect(result.current.nodes.length).toEqual(nodesSize + 1);
  });

  it('call addChild, parentNode.children + 1', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;
    const parentChildrenSize = parentNode?.children?.length;

    await act(async () => {
      result.current.addChild(parentId);
    });

    expect(result.current.nodes[0]?.children?.length).toEqual(
      parentChildrenSize + 1,
    );
  });

  it('call addChild, parentNode.chiild.Id === lastNode.id', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;

    await act(async () => {
      result.current.addChild(parentId);
    });

    const parentChildrenSize = result.current.nodes[0]?.children?.length;
    const parentLastChildId =
      result.current.nodes[0].children[parentChildrenSize - 1]?.id;

    const nodesSize = result.current.nodes.length;

    expect(parentLastChildId).toEqual(result.current.nodes[nodesSize - 1].id);
  });

  // ---
  // delNode
  // ---
  it('delNode(), updated rootId', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {replaceNodes} = result?.current;

    // Init with two Nodes before each test
    act(() => {
      replaceNodes(twoNodes);
    });

    const {nodes, rootId} = result?.current;

    const rootNodeId = nodes[0].id;
    const nextNodeId = nodes[1].id;

    // Check first node.id with rootId
    expect(rootId).toEqual(rootNodeId);

    // Remove RootNode
    await act(async () => {
      result.current.delNode(rootNodeId);
    });

    // Check updated rootId with nextNodeId
    expect(result?.current?.rootId).toEqual(nextNodeId);
  });
});
