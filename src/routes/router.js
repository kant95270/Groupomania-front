import WallPage from "../pages/Wall/WallPage.vue"

import LoginPage from "../pages/LoginPage.vue"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {path: "/login", component : LoginPage } ,
    {path : "/home", component: WallPage },
    { path : "/", redirect: "/home"} ,
]
const router = createRouter({history: createWebHistory(), routes})

export  {router}