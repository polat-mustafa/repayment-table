import React from 'react'
import './Headerstyle.css'
import { useUiControls } from "../context/ui/UiControls";

const Header = () => {

  const { uiControls } = useUiControls();

  return (
    <div className='header'>
    <nav>
      <a href={uiControls.header.nav.links[0].href} target={uiControls.header.nav.links[0].target}>
        <img src={uiControls.header.logo.src} alt={uiControls.header.logo.alt} width={uiControls.header.logo.width} height={uiControls.header.logo.height} />
      </a>
    </nav>
    </div>
  )
}

export default Header