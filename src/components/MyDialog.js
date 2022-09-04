import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'

export default function MyDialog({success, color}) {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
   setIsOpen(false)
  }

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-580 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {success ? 'You won !' : 'You lost :('}
                  </Dialog.Title>
                  <div className="mt-2">
                    {
                     !success ? 
                     <>
                        <p className="text-sm text-gray-500">
                           The correct guess was <span className="font-regular text-red">{color.red}</span>, <span className="font-regular text-green">{color.green}</span> and <span className="font-regular text-blue">{color.blue}</span>..
                        </p>
                        <p className="font-bold my-2 text-sm text-gray-500">
                           loser
                        </p>
                    </> : 
                     <>
                        <p className="text-sm text-gray-500">
                           You won ! That was the correct color :)
                        </p>
                        <p className="font-bold my-2 text-sm text-gray-500">
                           who the fuck knows rgb values you  monster
                        </p>
                     </>
                    }
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close this message
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
