import React, { FC } from 'react'
import styled from 'styled-components'
import { Box } from '@strapi/design-system/Box'
import { Field, FieldError, FieldHint, FieldInput, FieldLabel } from '@strapi/design-system/Field'
import { Flex } from '@strapi/design-system/Flex'
import { Link } from '@strapi/design-system/Link'
import { Stack } from '@strapi/design-system/Stack'

interface IFieldProps {
    name: string
    label?: string
    value: string
    isPassword?: boolean
    placeholder?: string
    description?: string
    tooltip?: string
    detailsLink?: string
    error?: string
    required?: boolean
    onChange?: (e: React.ChangeEvent<any>) => void
    editable?: boolean
}

const FieldLabelStyled = styled(FieldLabel)`
    & > div {
        width: max-content;
    }
`

const TooltipButtonStyled = styled.button`
    border: none;
    padding: 0;
    background: transparent;
`

const FieldComp: FC<IFieldProps> = ({
    name,
    label,
    value,
    isPassword,
    placeholder,
    description,
    tooltip,
    detailsLink,
    error,
    required,
    onChange = () => {},
    editable,
}): JSX.Element => {
    return (
        <Field name={name} hint={description} error={error}>
            <Stack spacing={1}>
                <Flex>
                    <FieldLabelStyled required={required}>{label}</FieldLabelStyled>
                    <Box paddingLeft={2}></Box>
                    {detailsLink && (
                        <Flex width="100%" justifyContent="flex-end">
                            <Link isExternal href={detailsLink}>
                                Details
                            </Link>
                        </Flex>
                    )}
                </Flex>
                <FieldInput
                    disabled={editable === undefined ? false : !editable}
                    placeholder={placeholder}
                    value={value}
                    type={isPassword ? 'password' : 'text'}
                    onChange={onChange}
                />
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    )
}

export default FieldComp
