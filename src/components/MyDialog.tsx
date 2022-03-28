import {Dialog, RadioGroup, Transition} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/solid';
import {Fragment, memo, useCallback, useMemo, useState} from 'react';
import {FromUserType} from '../hooks/useStore/useStore';
import cx from 'classnames';

export type MyDialogProps = {
  children: React.ReactNode;
  onAdd: (fromUser: FromUserType) => void;
};

const genderList = ['male', 'female'];

export const MyDialog = memo(({children, onAdd}: MyDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<FromUserType>({
    lastName: '',
    firstName: '',
  });
  const [gender, setGender] = useState();

  const closeModal = useCallback(() => {
    setUserInfo({});
    setGender(undefined);
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => setIsOpen(true), []);

  const onChange = useCallback(
    (key: string) => (event: any) => {
      const val = event?.target?.value;
      setUserInfo(state => ({...state, [key]: val}));
    },
    [],
  );

  const onAddClick = useCallback(() => {
    onAdd(userInfo);

    closeModal();
  }, [closeModal, onAdd, userInfo]);

  const isAddNewDisabled = useMemo(
    () =>
      typeof userInfo?.firstName !== 'string' ||
      typeof userInfo.lastName !== 'string' ||
      userInfo?.firstName?.length < 2 ||
      userInfo?.lastName?.length < 2 ||
      !gender,
    [gender, userInfo?.firstName, userInfo.lastName],
  );

  return (
    <>
      <div>
        <span onClick={openModal}>{children}</span>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  New user
                </Dialog.Title>

                <p className="my-2 mt-5 ml-1 text-lg text-gray-500">
                  Enter firstName:
                </p>

                <div className="mt-2">
                  <input
                    name="firstName"
                    type="text"
                    value={userInfo?.firstName}
                    onChange={onChange('firstName')}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                    placeholder="first name"
                  />
                </div>

                <p className="my-2 mt-3 ml-1 text-lg text-gray-500">
                  Enter lastName:
                </p>
                <div className="mt-2">
                  <input
                    name="lastName"
                    type="text"
                    value={userInfo?.lastName}
                    onChange={onChange('lastName')}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                    placeholder="last name"
                  />
                </div>

                <p className="my-2 mt-5 text-md text-gray-500">
                  Choose gender:
                </p>

                <div className="mt-4">
                  <RadioGroup value={gender} onChange={setGender}>
                    {genderList?.map(value => (
                      <RadioGroup.Option value={value} key={value}>
                        {({checked}) => (
                          <div
                            className={cx(
                              checked
                                ? 'bg-sky-700 text-white hover:bg-sky-800'
                                : 'bg-white text-neutral-500 bg-neutral-200 hover:bg-neutral-300',
                              'block my-2 text-lg font-medium p-2 rounded-2xl relative rounded-lg shadow-md px-5 py-3 cursor-pointer flex focus:outline-none',
                            )}>
                            {value}
                            {checked && (
                              <div className="ml-4">
                                <CheckIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mt-7 flex flex-wrap justify-between">
                  <button
                    type="button"
                    disabled={isAddNewDisabled}
                    className={cx(
                      'inline-flex justify-center my-1 px-4 py-2 text-lg font-medium text-blue-900 bg-blue-200 border border-transparent rounded-xl hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
                      isAddNewDisabled &&
                        'cursor-not-allowed bg-neutral-200 text-neutral-400 hover:bg-neutral-200',
                    )}
                    onClick={onAddClick}>
                    Add person
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center my-1 px-4 py-2 text-lg font-medium text-white bg-purple-600 border border-transparent rounded-xl hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onAddClick}>
                    Add random
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center my-1 px-4 py-2 text-lg font-medium text-neutral-700 bg-neutral-300 border border-transparent rounded-xl hover:bg-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
