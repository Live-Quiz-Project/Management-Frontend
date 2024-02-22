import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface IAppDropdownProps {
  items: MenuProps['items']
  indexSelected: number
  minWidth?: number
  suffixIcon?: JSX.Element
  label?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  placeholder?: string
}

function AppDropdown({
  items,
  indexSelected,
  minWidth,
  suffixIcon,
  label,
  required,
  disabled,
  errorMessage,
  placeholder,
}: IAppDropdownProps) {
  const newMenu = items?.map(item => ({
    ...item,
    style: {
      backgroundColor:
        item?.key === indexSelected?.toString() ? "#E3E3E0" : '',
      color: item?.key === indexSelected?.toString() ? "#FFF" : '',
    },
  }))

  return (
    <div
      className='flex flex-col gap-1'
      style={{ minWidth: minWidth ?? '100%' }}
    >
      <p className={`text-xs ${!label ? 'hidden' : ''}`}>
        {label}{' '}
        <span className={`text-main-primary-red ${!required ? 'hidden' : ''}`}>
          {' '}
          *
        </span>
      </p>
      <Dropdown
        menu={{ items: newMenu }}
        disabled={disabled}
        trigger={['click']}
      >
        <a
          className={`border-[1px] ${
            errorMessage ? 'border-status-error' : 'border-pastel-orange'
          } ${
            newMenu?.find(item => item.key === indexSelected?.toString())
              ? ''
              : 'text-gray-placeholder hover:text-gray-placeholder '
          }
          rounded py-2 px-3 bg-main-white w-full flex items-center justify-between gap-2
          `}
          onClick={e => e.preventDefault()}
        >
          {newMenu.find(item => item.key === indexSelected?.toString())?.label ||
            (placeholder ?? 'No item selected')}
          {suffixIcon ? (
            suffixIcon
          ) : (
            <KeyboardArrowDownIcon style={{ fontSize: 20 }} />
          )}
        </a>
      </Dropdown>
      <p
        className={`${!errorMessage ? 'hidden' : ''} text-status-error text-xs`}
      >
        {errorMessage}
      </p>
    </div>
  )
}

export default AppDropdown
