import {Popover, RadioGroup} from '@headlessui/react';
import {memo, useCallback, useState} from 'react';
import {FromUserType} from '../../hooks/useStore/useStore';
import cx from 'classnames';
import styles from './MyPopover.module.css';

export type MyPopoverProps = {
  children: React.ReactNode;
  onAdd: (fromUser: FromUserType) => void;
};

export const MyPopover = memo(({children, onAdd}: MyPopoverProps) => {
  const [userInfo, setUserInfo] = useState<FromUserType>({
    lastName: '',
    firstName: '',
  });
  const [gender, setGender] = useState('male');

  const onChange = useCallback(
    (key: string) => (event: any) => {
      const val = event?.target?.value;
      setUserInfo(state => ({...state, [key]: val}));
    },
    [],
  );

  const onClick = useCallback(
    close => () => {
      onAdd({
        firstName: 'test',
        lastName: 'test2',
        gender: 'male',
        ...userInfo,
      });
      close();
    },
    [onAdd, userInfo],
  );

  return (
    <Popover className={cx('relative', styles.in)}>
      {({close}) => (
        <>
          <Popover.Button>{children}</Popover.Button>

          <Popover.Panel className="fixed top-2 left-5 z-50 w-52 [transform:translateZ(50px)]">
            <div className="relative mt-1 flex rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white z-50">
              <div className="flex flex-col p-2 z-50">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title">
                    {`Create new user:`}
                  </h3>
                  <RadioGroup value={gender} onChange={setGender}>
                    <RadioGroup.Option value="male">
                      {({checked}) => (
                        <span
                          className={cx(
                            checked
                              ? 'bg-sky-900 bg-opacity-75 text-white'
                              : 'bg-white',
                            'block text-sm font-medium p-2 rounded-lg',
                          )}>
                          Male
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="female">
                      {({checked}) => (
                        <span
                          className={cx(
                            checked
                              ? 'bg-sky-900 bg-opacity-75 text-white'
                              : 'bg-white',

                            'block text-sm font-medium p-2 rounded-lg',
                          )}>
                          Female
                        </span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>

                  <div className="mt-2">
                    <input
                      name="firstName"
                      type="text"
                      value={userInfo?.firstName}
                      onChange={onChange('firstName')}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="first name"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      name="lastName"
                      type="text"
                      value={userInfo?.lastName}
                      onChange={onChange('lastName')}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="last name"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="ttt"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={userInfo?.lastName}
                  onChange={onChange('lastName')}
                />

                <button onClick={onClick(close)}>add</button>
                <button onClick={() => close()}>close</button>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
});
