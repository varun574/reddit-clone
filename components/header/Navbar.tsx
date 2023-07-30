import React, { useEffect } from 'react'
import NavBrand from './NavBrand'
import NavSearch from './NavSearch'
import NavLinksDropdown from './NavLinksDropdown'
import NavProfile from './NavProfile'
import {useAuth} from '@/hooks/useAuth';

type Props = {
}

const Navbar = (props: Props) => {

  const [user, isLoggedIn, loading] = useAuth();

  return (
    <div className={`${loading && 'opacity-50 cursor-progress'}`}>
      <nav className={`flex h-12 px-5 py-1 gap-5 bg-white dark:bg-neutral-900 dark:outline-1 dark:outline dark:outline-neutral-700 w-screen sticky ${loading && 'pointer-events-none'}`}>
        <NavBrand></NavBrand>
        {isLoggedIn && <NavLinksDropdown></NavLinksDropdown>}
        <NavSearch></NavSearch>
        <NavProfile></NavProfile>
      </nav>
    </div>
  )
}

export default Navbar