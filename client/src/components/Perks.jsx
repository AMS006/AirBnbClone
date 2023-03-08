import React, { useEffect } from 'react'
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai'
import {TbToolsKitchen2} from 'react-icons/tb'
import {IoWaterOutline} from 'react-icons/io5'
import {CgSmartHomeRefrigerator} from 'react-icons/cg'
import {MdIron} from 'react-icons/md'
import {RiComputerLine} from 'react-icons/ri'
import { FaSwimmingPool } from 'react-icons/fa'
function Perks({setPerks,perks}) {
    const handlePerksChange = (e) =>{
        
        if(e.target.checked){
            setPerks((prev) => [...prev,e.target.value])
        }else{
            setPerks((prev) => prev.filter((item) => item!== e.target.value))
        }
    }
    
  return (
    <div className='grid grid-cols-4 mt-2 gap-3'>
        <label htmlFor="wifi" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes("wifi")} onChange={handlePerksChange} name="" id="wifi" value={'wifi'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <AiOutlineWifi />
                <span>Wifi</span>
            </div>
        </label>
        <label htmlFor="parking" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('parking')} onChange={handlePerksChange} name="" id="parking" value={'parking'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <AiFillCar />
                <span>Free Parking Spot</span>
            </div>
        </label>
        <label htmlFor="kitchen" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('kitchen')} onChange={handlePerksChange} name="" id="kitchen" value={'kitchen'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <TbToolsKitchen2 />
                <span>Kitchen</span>
            </div>
        </label>
        <label htmlFor="water" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('water')} onChange={handlePerksChange} name="" id="water" value={'water'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <IoWaterOutline />
                <span>Hot water</span>
            </div>
        </label>
        <label htmlFor="refrigerator" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes("refrigerator")} onChange={handlePerksChange} name="" id="refrigerator" value={'refrigerator'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <CgSmartHomeRefrigerator />
                <span>Refrigerator</span>
            </div>
        </label>
        <label htmlFor="iron" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('iron')} onChange={handlePerksChange} name="" id="iron" value={'iron'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <MdIron />
                <span>Iron</span>
            </div>
        </label>
        <label htmlFor="television" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('television')} onChange={handlePerksChange} name="" id="television" value={'television'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="wifi" className='flex items-center gap-2 font-semibold text-lg'>
                <RiComputerLine />
                <span>Televison</span>
            </div>
        </label>
        <label htmlFor="swimming" className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
            <input type="checkbox" checked={perks.includes('swimming')} onChange={handlePerksChange} name="" id="swimming" value={'swimming'} onSelect={(e) => setPerks((prev) => [...prev,e.target.value])}/>
            <div htmlFor="swimming" className='flex items-center gap-2 font-semibold text-lg'>
                <FaSwimmingPool />
                <span>Swimming Pool</span>
            </div>
        </label>
    </div>
  )
}

export default Perks