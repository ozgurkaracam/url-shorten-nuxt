import { RouteLocationRaw } from "vue-router";

export default function auth(to:RouteLocationRaw,from:RouteLocationRaw,next:any):any{
    const user=useSupabaseUser();
    if(user.value==null){
        return navigateTo('login');
    }
} 