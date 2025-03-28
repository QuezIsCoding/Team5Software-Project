"use client";

import { createClientComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react"; //used to setup authentication 
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function AuthPage() {
    const supabaseClient = createClientComponentClient();
    return(
        <div id="AuthPage" className="w-full min-h-screen bg-white">
            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                <Link href="/" className="min-w[170px]">
                    <img width="170" src="/images/A&MLogo.png/" />
                </Link>
            </div>

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                Login or Register
            </div>
            
            <div className="max-w-[400px] mx-auto px-2">
                <Auth
                    onlyThirdPartyProviders
                    redirectTo={'${window.location.origin}/auth/callback'}
                    supabaseClient={supabaseClient}
                    providers={['google']}
                    appearance={{theme: ThemeSupa}}
                />
            </div>
        </div>
    )
}``