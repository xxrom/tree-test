import React, {memo, useEffect, useRef} from 'react';
import classNames from 'classnames';
import styles from './PinchZoomPan.module.css';
import {create} from 'pinch-zoom-pan';

export type PinchZoomPanProps = {
  min?: number;
  max?: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const PinchZoomPan = memo<PinchZoomPanProps>(
  ({min, max, captureWheel, className, style, children}) => {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
      try {
        const element = root.current;

        // window?.matchMedia fix for tests
        if (!element || window?.matchMedia) return;

        return create({element, minZoom: min, maxZoom: max, captureWheel});
      } catch (error) {
        console.error(error);
      }
    }, [min, max, captureWheel]);

    return (
      <div
        ref={root}
        className={classNames(className, styles.root)}
        style={style}>
        <div className={styles.point}>
          <div className={styles.canvas}>{children}</div>
        </div>
      </div>
    );
  },
);
