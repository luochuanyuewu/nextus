import React, { FC } from 'react'
import styled from 'styled-components'
import { ToggleInput } from '@strapi/design-system/ToggleInput'
import { Flex } from '@strapi/design-system/Flex'
import { FieldLabel } from '@strapi/design-system/Field'

interface IToggleProps {
    label?: string
    required?: boolean
    checked?: boolean
    onLabel?: string
    offLabel?: string
    onChange?: (e: React.ChangeEvent<any>) => void
}

const FieldLabelStyled = styled(FieldLabel)`
    & > div {
        width: max-content;
    }
`

const Toggle: FC<IToggleProps> = ({
    label,
    required,
    checked,
    onLabel,
    offLabel,
    onChange = () => { },
}): JSX.Element => {
    return (
        <>
            <Flex>
                <FieldLabelStyled required={required}>{label}</FieldLabelStyled>
            </Flex>
            <ToggleInput
                checked={checked}
                onLabel={onLabel}
                offLabel={offLabel}
                onChange={onChange}
            />
        </>
    )
}

export default Toggle
