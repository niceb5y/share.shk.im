import React from 'react'
import Link from 'next/link'

const NavBar = () => (
  <nav className='navbar navbar-light my-4 px-0'>
    <Link href='/'>
      <a className='navbar-brand mr-auto text-primary'>Share</a>
    </Link>
  </nav>
)

export default NavBar
