import {Popover} from '@headlessui/react';
import {memo, useCallback} from 'react';
import {FromUserType} from '../hooks/useStore/useStore';

export type MyPopoverProps = {
  children: React.ReactNode;
  onAdd: (fromUser: FromUserType) => void;
};

export const MyPopover = memo(({children, onAdd}: MyPopoverProps) => {
  const onClick = useCallback(() => {
    onAdd({firstName: 'test', lastName: 'test2', gender: 'male'});
  }, [onAdd]);

  return (
    <Popover className="relative">
      {({open}) => (
        <>
          <Popover.Button>{children}</Popover.Button>

          <Popover.Panel className="fixed top-0 z-50">
            <div className="relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white z-50">
              <div className="flex flex-col p-2 z-50">
                <a href="/analytics">Analytics</a>
                <a href="/engagement">Engagement</a>
                <a href="/security">Security</a>
                <a href="/integrations">Integrations</a>

                <button onClick={onClick}>add</button>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
});
