import { Dialog, Transition } from '@headlessui/react'
import { forwardRef, Fragment, useImperativeHandle, useState } from 'react'

const HelpModal = forwardRef((props, ref) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
   setIsOpen(false)
  }

  useImperativeHandle(ref, () => ({
      open: () => {
         setIsOpen(true);
      }
   })); 

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
                     How to play ?
                  </Dialog.Title>
                  <div className="mt-2">
                  <p className="text-sm text-gray-500 whitespace-pre-wrap	">
                     <ol className='list-decimal pl-3'>
                        <li>A random color is generated and displayed on top of the screen</li>
                        <li>Enter the three RGB values in the corresponding three input fields</li>
                        <li>Click the button at the bottom. The accuracy of
                           your guess is displayed as a "heatmap". 
                           ex: the more it is red, the closer you are from the true value. <br></br>Also, an indicator tells you if you should increase the value or decrease it.
                        </li>
                     </ol>
                  </p>
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
})
export default HelpModal;