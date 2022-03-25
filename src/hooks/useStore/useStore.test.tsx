import '../../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import {useStore} from './useStore';
import {oneNodeObject, twoNodes} from './nodes';

describe('useStore', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify({results: [oneNodeObject]}));
    //fetch.mockResponse(JSON.stringify({results: [oneNodeObject]}));
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('call addChild(), nodes size + 1', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const nodesSize = nodes?.length;

    fetch.mockResponseOnce(() => {
      console.log('mock fetch');

      return Promise.resolve(JSON.stringify({results: [oneNodeObject]}));
    });

    await act(async () => {
      await result.current.addChild(nodes[0]?.id);
    });

    expect(result.current.nodes.length).toEqual(nodesSize + 1);
  });

  xit('call addChild, parentNode.children + 1', async () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;
    const parentChildrenSize = parentNode?.children?.length;

    act(() => {
      result.current.addChild(parentId);
    });

    expect(result.current.nodes[0]?.children?.length).toEqual(
      parentChildrenSize + 1,
    );
  });

  xit('call addChild, parentNode.chiild.Id === lastNode.id', () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const parentNode = nodes[0];
    const parentId = parentNode?.id;

    act(() => {
      result.current.addChild(parentId);
    });

    const parentChildrenSize = result.current.nodes[0]?.children?.length;
    const parentLastChildId =
      result.current.nodes[0].children[parentChildrenSize - 1]?.id;

    const nodesSize = result.current.nodes.length;

    expect(parentLastChildId).toEqual(result.current.nodes[nodesSize - 1].id);
  });

  xit('call delNode', () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes, rootId} = result?.current;
    const rootNodeId = nodes[0].id;

    expect(rootId).toEqual(rootNodeId);

    act(() => {
      result.current.addChild(rootNodeId);
    });

    expect(rootId).toEqual(rootNodeId);
  });
});
