import '../../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import {useStore} from './useStore';
import {oneNodeObject, twoNodes} from './nodes';

describe('useStore', () => {
  beforeEach(() => {
    fetch.resetMocks();
    //fetch.mockResponseOnce(JSON.stringify({results: [oneNodeObject]}));
    fetch.mockResponse(JSON.stringify({results: [oneNodeObject]}));
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

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

  it('call delNode', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes, rootId} = result?.current;
    const rootNodeId = nodes[0].id;

    expect(rootId).toEqual(rootNodeId);

    await act(async () => {
      result.current.addChild(rootNodeId);
    });

    expect(rootId).toEqual(rootNodeId);
  });
});
