import './theme.css'
import img from '../../imgs/theme.png'
import { useLayoutEffect, useState } from 'react'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || defaultTheme
  )

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export function Theme() {
  const { theme, setTheme } = useTheme()

  const handleThemeClick = () => {
    if(theme == 'dark')
        setTheme('light')
    else 
        setTheme('dark')
  }

  return (
    <div className="theme aText" onClick={handleThemeClick}>
      <img className='themeImg' src={img}></img>
    </div>
  )
}