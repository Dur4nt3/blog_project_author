import { Popover } from '@mantine/core';

export default function HelpPopover({ content }) {
    return <Popover position='top' classNames={{
        dropdown: 'popover-dropdown-container'
    }}>
        <Popover.Target>
            <button className='popover-target-button' type='button'>?</button>
        </Popover.Target>
        <Popover.Dropdown>
            <p className="popover-dropdown-text">{content}</p>
        </Popover.Dropdown>
    </Popover>
}