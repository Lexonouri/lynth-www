import {useRef} from 'react'
import {useTheme} from 'next-themes'
import {useIntl} from "react-intl"
import ThemeIcon from "./icons/ThemeIcon"

export default function ThemeSwitch() {

  const {theme, setTheme} = useTheme()
  const {formatMessage} = useIntl()
  const __ = id => formatMessage({id})
  let _themeRef = useRef()

  return (
    theme !== undefined && (<>
      <div>
        <form className="block w-max flex items-center py-2">
          <label htmlFor="theme-switch" className="block text-sm pr-4">
            <ThemeIcon/>
          </label>
          <select
            ref={(input) => _themeRef = input}
            id="theme-switch"
            value={theme}
            onChange={(e) => {
              e.preventDefault()
              setTheme(_themeRef.value)
            }}
            className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 bg-transparent focus:outline-none sm:text-sm rounded-md">
            <option value="system">{__('theme.option.auto')}</option>
            <option value="dark">{__('theme.option.dark')}</option>
            <option value="light">{__('theme.option.light')}</option>
          </select>
        </form>
      </div>
    </>)
  )

}
