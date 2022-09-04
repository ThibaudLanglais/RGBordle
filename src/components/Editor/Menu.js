import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Download, Camera, Layout } from 'react-feather';
import LayoutTab from './LayoutTab';
const Menu = forwardRef((props, ref) => {

   const [opened, setOpened] = useState(true);
   
   useImperativeHandle(ref, () => ({
      toggle: () => {
         setOpened(!opened);
      }
   }));

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }

   function renderIcon(icon, selected){
      const color = selected ? 'purple' : 'white';
      switch(icon){
         case 'layout': return <Layout color={color}/>;
         case 'download': return <Download color={color}/>;
         case 'camera': return <Camera color={color}/>;
         default: return null;
      }
   }

   let categories = {
      Layout: {
         icon: 'layout',
         content: <LayoutTab />
      },
      Save: {
         icon: 'download'
      },
      Preview: {
         icon: 'camera'
      },
   }

   return (
      <div onClick={() => setOpened(false)} className={`${!opened && 'opacity-0 pointer-events-none'} transition-opacity cursor-pointer fixed inset-0 bg-indigo bg-opacity-40 flex justify-center`}>
         <div onClick={(e) => e.stopPropagation()} className="cursor-auto min-w-sm w-2/6 rounded-md h-20 mt-10">
            <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl p-1 bg-purple shadow-md px-2 py-2">
               {Object.keys(categories).map((category) => (
                  <Tab
                     key={category}
                     className={({ selected }) =>
                        classNames(
                           'w-16 h-16 flex justify-center items-center rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                           'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                           selected
                           ? 'shadow bg-white'
                           : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        )
                     }
                  >
                     {
                        ({selected}) => renderIcon(categories[category].icon, selected)
                     }
                  </Tab>
               ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
               {Object.values(categories).map((keys, idx) => 
                  (
                     keys.content && <Tab.Panel
                     key={idx}
                     className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                     )}
                     >
                        {keys.content}
                     </Tab.Panel>
                  )
               )}
            </Tab.Panels>
            </Tab.Group>
         </div>
      </div>
   )
})
export default Menu;