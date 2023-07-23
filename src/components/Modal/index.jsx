import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import close from '../../assets/img/close.png';
import btn1 from '../../assets/img/btn1.png';
import btn2 from '../../assets/img/btn2.png';
import btn3 from '../../assets/img/btn3.png';
import Button from '../Button';
import Select from '../Select';

export default function Example() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
  
  const sportOptions = [
    'Basketball',
    'Rugby',
    'Hockey',
    'Baseball'
  ]


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main pb-4 text-left shadow-xl transition-all sm:my-8 bg-slate h-[609px] md:w-[735px] mx-3">
                <div className='divide-y divide-solid divide-[#3A3A3A]'>
                  <div className="flex items-center text-left h-[88px] justify-between px-[26px]">
                    <p className="text-2xl text-white font-bold">Create League</p>
                    <img src={close}></img>
                  </div>
                  <div className='flex divide-x divide-solid divide-[#3A3A3A]'>
                    <div className='flex flex-col space-y-8 w-[290px] h-[521px] p-[26px]'>
                      <Button icon={btn1} className="w-[238px] h-[48px] bg-primary">Select Sport</Button>
                      <Button icon={btn2} className="w-[238px] h-[48px]">Basic Details</Button>
                      <Button icon={btn3} className="w-[238px] h-[48px]">Schedule</Button>
                    </div>
                    <div className='flex flex-col w-[444px] p-[26px]'>
                      <Select className='w-full h-[48px]' options={sportOptions}></Select>
                      <Button className='bg-primary w-full h-[53px] mt-auto'>Next: Basic Details</Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                        pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
