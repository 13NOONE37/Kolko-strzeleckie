import React, {  FC } from "react";
import { Navbar } from "../Navbar";

import {ReactComponent as Ranking} from 'assets/leaderboard.svg'
import {ReactComponent as Target} from 'assets/target.svg'


 const UserNavbar:FC = ()=>{
    return <Navbar elements={[
        {name:'Ranking',Icon:Ranking},
        {name:'Twoje wyniki',Icon:Target},
    ]}/>
}

export default UserNavbar