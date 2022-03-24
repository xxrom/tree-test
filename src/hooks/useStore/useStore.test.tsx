import '../../matchMedia';
import {act, renderHook} from '@testing-library/react-hooks';
import {cleanup} from '@testing-library/react';
import {useStore} from './useStore';

describe('useStore', () => {
  afterEach(() => {
    // You can chose to set the store's state to a default value here.
    jest.resetAllMocks();
    cleanup();
  });

  it('check addBear function', () => {
    const {result} = renderHook(() => useStore(state => state));

    act(() => {
      result.current.addBear();
    });

    expect(result.current.bears).toEqual(1);
  });

  it('call addChild(), nodes size + 1', () => {
    const {result} = renderHook(() => useStore(state => state));
    const {nodes} = result?.current;

    const nodesSize = nodes?.length;

    act(() => {
      result.current.addChild(nodes[0]?.id);
    });

    expect(result.current.nodes.length).toEqual(nodesSize + 1);
  });

  it('call addChild, parentNode.children + 1', () => {
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

  it('call addChild, parentNode.chiild.Id === lastNode.id', () => {
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
});
