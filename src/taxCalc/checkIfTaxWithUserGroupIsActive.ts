function checkIfTaxWithUserGroupIsActive (configTax) {
  return typeof configTax.userGroupId === 'number'
}

export default checkIfTaxWithUserGroupIsActive
