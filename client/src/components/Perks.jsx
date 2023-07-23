import React from 'react'
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { IoWaterOutline } from 'react-icons/io5'
import { CgSmartHomeRefrigerator } from 'react-icons/cg'
import { MdIron } from 'react-icons/md'
import { RiComputerLine } from 'react-icons/ri'
import { FaSwimmingPool } from 'react-icons/fa'

function Perks({ setPerks, perks }) {
    const handlePerksChange = (e) => {
        if (e.target.checked) {
            setPerks((prev) => [...prev, e.target.value])
        } else {
            setPerks((prev) => prev.filter((item) => item !== e.target.value))
        }
    }
    const allPerks = [
        {
            name: "Wifi",
            icons: <AiOutlineWifi />,
            check: "wifi"
        },
        {
            name: "Free Parking Spot",
            icons: <AiFillCar />,
            check: "parking"
        },
        {
            name: "Kitchen",
            icons: <TbToolsKitchen2 />,
            check: "kitchen"
        },
        {
            name: "Hot Water",
            icons: <IoWaterOutline />,
            check: "water"
        },
        {
            name: "Refrigerator",
            icons: <CgSmartHomeRefrigerator />,
            check: "refrigerator"
        },
        {
            name: "Iron",
            icons: <MdIron />,
            check: "iron"
        },
        {
            name: "Television",
            icons: <RiComputerLine />,
            check: "television"
        },
        {
            name: "Swimming Pool",
            icons: <FaSwimmingPool />,
            check: "swimming"
        },

    ]
    return (
        <div className='grid md:grid-cols-4 grid-cols-2 mt-2 gap-3'>
            {allPerks.map((perk) => (
                <label htmlFor={perk.name} key={perk.name} className='border hover:bg-gray-200 transition-all ease-in-out duration-75 cursor-pointer border-gray-400 rounded-2xl px-4 py-2 flex items-center gap-2' >
                    <input type="checkbox" checked={perks.includes(perk.check)} onChange={handlePerksChange} name="" id={perk.name} value={perk.check} onSelect={(e) => setPerks((prev) => [...prev, e.target.value])} />
                    <div className='flex items-center gap-2 font-semibold text-lg'>
                        {perk.icons}
                        <span>{perk.name}</span>
                    </div>
                </label>
            ))}

        </div>
    )
}

export default Perks