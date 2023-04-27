import Link from 'next/link';
import { useSession } from "next-auth/react";
import s from './loginWidget.module.css';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';

const LoginWidget = () => {
    const [visibleMenu, setVisibleMenu] = useState(false);

    const session = useSession();

    const toggleMenu = () => {
        setVisibleMenu(visibleMenu == false);
    }

    return <div className={s.accountMenu}>
        <div onClick={toggleMenu} className={s.accountBubble}>
            {session.status === "loading" && <Link href="/account" className={s.loading}>Account</Link>}
            {!session.data && <div><Link href="/api/auth/signin" className={s.menuButton} onClick={(e) => {
                e.preventDefault();
                signIn("twitch");
            }}>Login</Link><Link href="/api/auth/signin" className={s.menuButton} onClick={(e) => {
                e.preventDefault();
                signIn("okta");
            }}>OKTA</Link></div>}
            {session.status === "authenticated" && <img className={s.userImage} src={session.data.user?.image!} />}
        </div>
        {visibleMenu && <div className={s.optionMenu}>
            <button className={s.menuButton} onClick={() => signOut()}>Log-out</button>
            {session && <button className={s.menuButton} onClick={() => signOut()}>Session</button>}
        </div>}
    </div>
}

export default LoginWidget;