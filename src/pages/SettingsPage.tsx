import { Link, Outlet } from "react-router";
import type { TTabs } from "../types/global.types";
import { useState } from "react";

function SettingsPage() {



    const [activeTab, setActiveTab] = useState(0)

    const tabs : TTabs[]  = [
        {
            id: 1,
            name: 'profile',
            link: ''
        },
        {
            id: 2,
            name: 'account',
            link: 'account'
        },
        {
            id: 3,
            name: 'subscription',
            link: 'subscription'
        },
        {
            id: 4,
            name: 'billing',
            link: 'billing'
        },
        {
            id: 4,
            name: 'privacy',
            link: 'privacy'
        },
        
    ];


    const handleActiveTab = (index : number) : void => {
        setActiveTab(index)
    }

  return (
    <div className="px-4 lg:px-0" >
        <div className="lg:max-w-[1000px] w-full flex-col lg:flex-row flex gap-10 mx-auto pb-14 pt-14">
            <div className="flex flex-col   gap-4 w-12/12 lg:w-3/12">
                <h3 className="text-3xl font-medium ">Settings</h3>
            <div className="flex lg:flex-col justify-between flex-row gap-0  lg:gap-1">
                {
                    tabs.map((tab, index) => (
                        <Link key={index} to={tab.link}>
                            <h4 onClick={() => handleActiveTab(index)} className={`lg:px-6 px-2 capitalize py-1  lg:py-2 text-[15px] lg:text-[17px] rounded-lg font-medium text-textPrimary  hover:bg-black/5 transition-all duration-200 ${activeTab === index ? 'bg-black/5' : ''}`}>{tab.name}</h4>
                        </Link>
                    ))
                }
            </div>
            </div>
            <div className="lg:w-9/12 w-12/12 mt-5 lg:mt-13 ">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default SettingsPage