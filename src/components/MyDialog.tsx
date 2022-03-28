import {Dialog, RadioGroup, Transition} from '@headlessui/react';
import {Fragment, memo, useCallback, useState} from 'react';
import {FromUserType} from '../hooks/useStore/useStore';
import cx from 'classnames';

export type MyDialogProps = {
  children: React.ReactNode;
  onAdd: (fromUser: FromUserType) => void;
};

export const MyDialog = memo(({children, onAdd}: MyDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<FromUserType>({
    lastName: '',
    firstName: '',
  });
  const [gender, setGender] = useState('male');

  const closeModal = useCallback(() => {
    setUserInfo({});
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

  return (
    <>
      <div className="">
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

                <p className="my-2 mt-5 text-md text-gray-500">
                  Choose gender.
                </p>

                <div className="mt-4">
                  <RadioGroup value={gender} onChange={setGender}>
                    <RadioGroup.Option value="male">
                      {({checked}) => (
                        <span
                          className={cx(
                            checked
                              ? 'bg-sky-800 text-white'
                              : 'bg-white bg-neutral-300',
                            'block w-1/2 text-lg font-medium p-2 rounded-2xl relative rounded-lg shadow-md px-5 py-3 cursor-pointer flex focus:outline-none',
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
                              : 'bg-white bg-neutral-300',
                            'mt-1 w-1/2 block text-lg font-medium p-2 rounded-2xl relative rounded-lg shadow-md px-5 py-3 cursor-pointer flex focus:outline-none',
                          )}>
                          Female
                        </span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>

                  <p className="my-2 mt-5 ml-1 text-md text-gray-500">
                    Enter firstName:
                  </p>

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

                  <p className="my-2 mt-3 ml-1 text-md text-gray-500">
                    Enter lastName:
                  </p>
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

                <div className="mt-7 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-lg font-medium text-blue-900 bg-blue-200 border border-transparent rounded-xl hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onAddClick}>
                    Add new user
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-lg font-medium text-white bg-purple-600 border border-transparent rounded-xl hover:bg-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onAddClick}>
                    Random user
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-lg font-medium text-blue-900 bg-neutral-200 border border-transparent rounded-xl hover:bg-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}>
                    Exit
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
