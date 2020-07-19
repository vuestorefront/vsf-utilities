function getUserGroupIdToUse (userGroupId, configTax) {
  return configTax.useOnlyDefaultUserGroupId ? configTax.userGroupId : userGroupId
}

export default getUserGroupIdToUse
