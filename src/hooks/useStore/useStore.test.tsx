import '../../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import {useStore} from './useStore';
import {oneNodeObject, twoNodes} from './nodes';

describe('useStore', () => {
  // Init global store hook
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

    // Add child for parent node
    await act(async () => {
      result.current.addChild(nodes[0]?.id);
    });

    // Nodes should increase size
    expect(result.current.nodes.length).toEqual(nodesSize + 1);
  });

  it('call addChild, parentNode.children + 1', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;
    const parentChildrenSize = parentNode?.children?.length;

    // Add child to parentNode
    await act(async () => {
      result.current.addChild(parentId);
    });

    // ParentNode.children should increase size
    expect(result.current.nodes[0]?.children?.length).toEqual(
      parentChildrenSize + 1,
    );
  });

  it('call addChild, parentNode.child.Id === lastNode.id', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;

    // Add new child for parentNode
    await act(async () => {
      result.current.addChild(parentId);
    });

    const parentChildrenSize = result.current.nodes[0]?.children?.length;

    // Get id for last child for parentNode
    const parentLastChildId =
      result.current.nodes[0].children[parentChildrenSize - 1]?.id;

    const nodesSize = result.current.nodes.length;

    // Compare IDs for parentNode child and last added node in nodes
    expect(parentLastChildId).toEqual(result.current.nodes[nodesSize - 1].id);
  });

  // ---
  // delNode
  // ---
  it('delNode(), two nodes, remove root node and check updated rootId', async () => {
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

  it('delNode(), two nodes, remove child node and check availabily for remoing in parent node', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {replaceNodes} = result?.current;

    // Init with two Nodes before each test
    act(() => {
      replaceNodes(twoNodes);
    });

    const {nodes} = result?.current;

    const rootNodeId = nodes[0].id;
    const nextNodeId = nodes[1].id;

    // Remove RootNode
    await act(async () => {
      result.current.delNode(nextNodeId);
    });

    // Check updated rootId with nextNodeId
    expect(result?.current?.rootId).toEqual(rootNodeId);

    // Check that it's impossible to delete child, becasue we have only parent node
    expect(() => result.current.delNode(rootNodeId)).toThrowError();
  });
});
