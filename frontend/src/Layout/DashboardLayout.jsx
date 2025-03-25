import { SideBar } from "../components/SideBar/SideBar.jsx"
import {Headers} from "../components/SideBar/Headers.jsx"
import { Outlet } from "react-router-dom"

export const DashboardLayout = () => {
  return (
    <div>
       <div className="flex">
        <SideBar/>
        <div className="w-full ml-16  md:ml-56">
          <Headers/>
          <Outlet/>
        </div>
       </div>
    </div>
  )
}
