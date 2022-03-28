import classNames from 'classnames';
import {memo, useCallback, useMemo} from 'react';
import shallow from 'zustand/shallow';
import {useStore} from '../../hooks';
import {MyDialog} from '../MyDialog';
import {HEIGHT, WIDTH} from '../Tree/Tree';
import styles from './FamilyNode.module.css';

interface FamilyNodeProps {
  id: string;
  gender: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  hasSubTree: boolean;
  isRoot: boolean;
  left: number;
  top: number;
  children?: any;
}

export const FamilyNode = memo(
  ({
    id,
    firstName,
    lastName,
    gender,
    photoUrl,
    children,
    hasSubTree,
    isRoot,
    left,
    top,
  }: FamilyNodeProps) => {
    const {addChild, delNode} = useStore(
      state => ({addChild: state.addChild, delNode: state.delNode}),
      shallow,
    );

    const getStyles = useCallback(
      () => ({
        width: WIDTH,
        height: HEIGHT,
        transform: `translate(${left * (WIDTH / 2)}px, ${top *
          (HEIGHT / 2)}px)`,
      }),
      [left, top],
    );

    const style = useMemo(() => getStyles(), [getStyles]);

    const onAddChild = useCallback(
      fromUser => {
        addChild(id, fromUser);
      },
      [addChild, id],
    );
    const onDelNode = useCallback(() => {
      delNode(id);
    }, [delNode, id]);

    return (
      <div className={styles.root} style={style}>
        <div
          className={classNames(
            styles.inner,
            'p-4 py-6 ring-2 ring-purple-500 rounded-2xl',
            gender === 'male' ? 'bg-sky-100' : 'bg-purple-100',
            isRoot &&
              'ring-blue-800 ring-4 ring-purple-700 shadow-lg shadow-purple-500',
          )}>
          <div className={styles.info}>
            {photoUrl && (
              <picture>
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src={photoUrl}
                  alt=""
                />
              </picture>
            )}

            <div className={styles.text}>{gender}</div>

            <div className={styles.text}>{firstName}</div>
            <div className={styles.text}>{lastName}</div>
          </div>

          <div className={styles.control}>
            <MyDialog onAdd={onAddChild}>
              <span
                className={classNames(
                  styles.button,
                  'cursor-pointer bg-purple-400',
                )}>
                +
              </span>
            </MyDialog>

            {(!isRoot || (isRoot && children.length === 1)) && (
              <button
                className={classNames(styles.button, 'bg-blue-400')}
                onClick={onDelNode}>
                -
              </button>
            )}
          </div>
        </div>

        {hasSubTree && (
          <div
            className={classNames(
              styles.sub,
              gender === 'male' ? 'bg-sky-100' : 'bg-purple-100',
            )}
          />
        )}
      </div>
    );
  },
);
