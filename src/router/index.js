//
import Vue from 'vue'
import VueRouter from 'vue-router'

//Components
import Main from '../components/home/Main'
import Otp from '../components/otp'
import Register from '../components/NewAccount'
import NotFound from '../components/404'
import Search from '../components/Search'
import Watch from '../components/Watch'
import Profile from '../components/home/AccountInfo'
import Home from '../components/home/Home'
import Collections from '../components/home/HomeCollections'
import Payment from '../components/Payment'
import Gallery from '../components/home/Gallery'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home',
        children:[
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                beforeEnter(to, from, next){
                    const token = localStorage.getItem('token')
                    if(token != null){
                        next()
                    }
                    else{
                        next('/login')
                    }
                }
            },
            {
                path: '/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/collections',
                name: 'Collections',
                component: Collections
            },
            {
                path: '/gallery',
                name: 'Gallery',
                component: Gallery,
                beforeEnter(to, from, next){
                    const token = localStorage.getItem('token')
                    if(token != null){
                        next()
                    }
                    else{
                        next('/login')
                    }
                }
            },
        ]
    },
    {
        path: '/login',
        component: Otp,
        name: 'Login',
        beforeEnter(to, from, next){
            const token = localStorage.getItem('token')
            if(token == null){
                next()
            }
            else{
                next('/home')
            }
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        beforeEnter(to, from, next){
            const registerToken = document.cookie.match('(^|;)\\s*' + 'on_register_token' + '\\s*=\\s*([^;]+)')?.pop() || ''
            const token = localStorage.getItem('token')
            if(registerToken != '' && token == null){
                next()
            }else if(registerToken=='' || token == null){
                next('/login')
            }else {
                next('/home')
            }
        }
    },
    {
        path: '/payment',
        component: Payment,
        name: 'Payment',
        beforeEnter(to, from, next){
            const registerToken = document.cookie.match('(^|;)\\s*' + 'on_register_token' + '\\s*=\\s*([^;]+)')?.pop() || ''
            if(registerToken != ''){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {
        path: '/watch/:id',
        component: Watch,
        name: 'Watch',
        beforeEnter(to, from, next){
            const token = localStorage.getItem('token')
            if(token != null){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {
        path: '/search/',
        component: Search,
        name: 'Search',
    },
    {
        path: '*',
        component: NotFound,
        name: 'Page Not Found'
    }
]


const router = new VueRouter({routes, mode: 'history'})
router.beforeEach((to, from, next)=>{
    document.title = to.name + ' | POPCORN'
    next()
})
export default router