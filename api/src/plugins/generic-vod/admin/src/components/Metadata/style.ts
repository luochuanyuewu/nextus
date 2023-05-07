import styled from 'styled-components'
import { FormInput, SubTitle } from '../../styles/form'
import { IconButton } from '@strapi/design-system/IconButton'

export const SubTitleMetadata = styled(SubTitle)`
    padding-bottom: 10px;
`

export const FormKey = styled(FormInput)``

export const FormValue = styled(FormInput)`
    margin-left: -120px;
`

export const FooterAction = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 10px 86px;
    /* filter: brightness(90%); */

    /* background-color: #f9f9f9; */
    background-color: rgba(0, 0, 0, 0.025);
    width: 100%;
    height: 64px;
    box-shadow: 0px 1px 4px rgb(33 33 52 / 10%);
    border-bottom: 1px solid #eaeaef;
    border-left: 1px solid #eaeaef;
    border-right: 1px solid #eaeaef;
`

export const AddButton = styled(IconButton)`
    border-radius: 50%;
`
