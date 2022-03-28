import classNames from 'classnames';
import {memo, useCallback, useMemo} from 'react';
import shallow from 'zustand/shallow';
import {useStore} from '../../hooks';
import {FromUserType, PersonType} from '../../hooks/useStore/useStore';
import {MyPopover} from '../MyPopover';
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
    console.log('Render: FamilyNode', top, left);

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
            styles[gender],
            isRoot && styles.isRoot,
          )}>
          <div className={styles.info}>
            {photoUrl && (
              <picture>
                <img className={styles.photo} src={photoUrl} alt="" />
              </picture>
            )}

            <div className={styles.text}>{`${gender}:`}</div>

            <div className={styles.text}>{firstName}</div>
            <div className={styles.text}>{lastName}</div>
          </div>

          <div className={styles.control}>
            <MyPopover onAdd={onAddChild}>
              <span className={classNames(styles.button, 'bg-lime-400')}>
                +
              </span>
            </MyPopover>

            {(!isRoot || (isRoot && children.length === 1)) && (
              <button
                className={classNames(styles.button, 'bg-purple-400')}
                onClick={onDelNode}>
                -
              </button>
            )}
          </div>
        </div>

        {hasSubTree && (
          <div className={classNames(styles.sub, styles[gender])} />
        )}
      </div>
    );
  },
);
