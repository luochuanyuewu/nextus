import { mainCreateAction, mainDeleteAction, mainReadAction, mainUpdateAction, settingsReadAction, settingsUpdateAction } from './actions'

const settingsRead = [{ action: settingsReadAction, subject: null }]
const settingsUpdate = [{ action: settingsUpdateAction, subject: null }]
const mainRead = [{ action: mainReadAction, subject: null }]
const mainCreate = [{ action: mainCreateAction, subject: null }]
const mainUpdate = [{ action: mainUpdateAction, subject: null }]
const mainDelete = [{ action: mainDeleteAction, subject: null }]

const pluginPermissions = {
    // This permission regards the main component (App) and is used to tell
    // If the plugin link should be displayed in the menu
    // And also if the plugin is accessible. This use case is found when a user types the url of the
    // plugin directly in the browser
    settingsRoles: new Array().concat(settingsRead, settingsUpdate),
    settingsRead,
    settingsUpdate,
    mainRead,
    mainCreate,
    mainUpdate,
    mainDelete,
}

export default pluginPermissions
