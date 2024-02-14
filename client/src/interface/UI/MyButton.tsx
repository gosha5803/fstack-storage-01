import { Button } from "@mui/material";
import React, { FC } from "react";

type MyButtonProps = {
    children: string,
    color: "error" | "inherit" | "primary" | "secondary" | "info" | "success" | "warning",
    variant: "contained" | "text" | "outlined",
    type?: "button" | "reset" | "submit",
    disabled?: boolean, 
    clickHandler?: () => void
}

export const MyButton: FC<MyButtonProps> = ({children, color, variant, type, disabled = false, clickHandler}) => {
    return(
        <Button
        disabled={disabled}
        color={color}
        variant={variant}
        type={type}
        onClick={clickHandler}
        >
            {children}
        </Button>
    )
}