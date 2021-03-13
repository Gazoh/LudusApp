import React from 'react'

interface Props {
    id?: string;
    className?: string;
    showSpan?: boolean;
    children: React.ReactNode;
    extraChildren?: React.ReactNode;
    isLoading?: boolean;
    overrideIcon?: boolean;
    loadingElement?: React.ReactNode;
    onClick?: Function;
    icon?: any;
    iconColorString?: string
    disabled?: boolean;
    ref?: any,
    style?: any,
    type?: "button" | "submit" | "reset" | undefined;
}

function CustomButton(props: Props) {
    const onClick = async (e: any) => {
        if (props.onClick) {
            props.onClick(e);
        }
        e.stopPropagation(); // prevent clickthrough
    }

    return (
        <button style={props.style} ref={props.ref} id={props.id} className={props.className} onClick={(e: any) => onClick(e)} type={props.type} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default CustomButton