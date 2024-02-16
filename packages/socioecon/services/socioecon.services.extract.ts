export async function extract_pds_member(db_conn: any) {
  const result = await db_conn.request().query(
    `SELECT
  kebele_location.Name_Eng as kebele_name ,
  woreda_location.Name_Eng as woreda_name , 
  zone_location.Name_Eng as zone_name ,  
  region_location.Name_Eng as region_name,
  H.Id,
  H.HouseHoldIdNumber,
  H.MaleMemberSize,
  H.FemaleMemberSize,
  H.NumberOfParticipatingMale,
  H.NumberOfParticipatingFemale,
  H.NumberOfMaleAbleBody,
  H.NumberOfFemaleAbleBody,
  H.RegistrationDate,
  H.PSNPMemberSince,
  H.IsEligible,
  H.IsHouseholdLaborOutsidePSNP,
  H.IsSelfSupportEnabled,
  H.HouseholdStatusId,
  HS.Description_Eng as household_status_description,
  H.HouseholdProgramId,
  P.Description_Eng as program_component_description,
  H.HouseholdPD,
  H.HouseholdDataUpdateReasonId,
  H.BudgetSourceId,
  H.ReasonForUsingBudgetCategoryId,
  H.NoOfHHMembersSelectedForHRD,
  HM.HouseholdMembmerIdNumber,
  HM.FirstName_Eng,
  HM.FatherName_Eng,
  HM.GrandFatherName_Eng,
  HM.GenderId,
  G.Description_Eng gender_description,
  HM.DateOfBirth,
  HM.BeneficiaryTypeId,
  BT.Description_Eng beneficiary_type,
  HM.BankAccountNo
  FROM Registration.Households H
  INNER JOIN Registration.HouseholdMembers HM ON HM.HouseholdId = H.Id
  INNER JOIN Config.Genders G ON G.Id = HM.GenderId
  LEFT JOIN Config.BeneficiaryTypes BT ON BT.Id = HM.BeneficiaryTypeId
  INNER JOIN Config.HouseholdStatuses HS ON HS.Id = H.HouseholdStatusId
  INNER JOIN Config.ProgramComponents P ON P.Id = H.HouseholdProgramId
  inner join Registration.HouseholdAddresses as RH on RH.HouseholdId = H.Id
  inner join Maintenance.AdminLocations as AdminLocation on RH.AdminLocationId = AdminLocation.Id
  inner join Config.AdminLocationTypes as AdminLocationTypes on AdminLocation.AdminLocTypeId = AdminLocationTypes.Id 
  inner join Maintenance.AdminLocations as kebele_location on AdminLocation.ParentAdminLocationId = kebele_location.Id
  inner join Config.AdminLocationTypes as kebele_config on kebele_config.Id = kebele_location.AdminLocTypeId
  inner join Maintenance.AdminLocations as woreda_location on kebele_location.ParentAdminLocationId = woreda_location.Id
  inner join Config.AdminLocationTypes as woreda_config on woreda_config.Id = woreda_location.AdminLocTypeId
  inner join Maintenance.AdminLocations as zone_location on woreda_location.ParentAdminLocationId = zone_location.Id
  inner join Config.AdminLocationTypes as zone_config on zone_config.Id = zone_location.AdminLocTypeId
  inner join Maintenance.AdminLocations as region_location on zone_location.ParentAdminLocationId = region_location.Id
  inner join Config.AdminLocationTypes as region_config on region_config.Id = region_location.AdminLocTypeId
  WHERE H.HouseholdProgramId = 1 AND H.Status <> 0 AND HM.IsHouseholdHead = 1`
  );

  return result.recordset;
}

//mlm_soil_and_water_conservation_activities_result
export async function extract_pw_member(db_conn) {
  const result = await db_conn.request().query(`SELECT
  kebele_location.Name_Eng as kebele_name , woreda_location.Name_Eng as woreda_name , zone_location.Name_Eng as zone_name ,  region_location.Name_Eng as region_name,
  H.Id,
  H.HouseHoldIdNumber,
  H.MaleMemberSize,
  H.FemaleMemberSize,
  H.NumberOfParticipatingMale,
  H.NumberOfParticipatingFemale,
  H.NumberOfMaleAbleBody,
  H.NumberOfFemaleAbleBody,
  H.RegistrationDate,
  H.PSNPMemberSince,
  H.IsEligible,
  H.IsHouseholdLaborOutsidePSNP,
  H.IsSelfSupportEnabled,
  H.HouseholdStatusId,
  HS.Description_Eng,
  H.HouseholdProgramId,
  P.Description_Eng,
  H.HouseholdPD,
  H.HouseholdDataUpdateReasonId,
  H.BudgetSourceId,
  H.ReasonForUsingBudgetCategoryId,
  H.NoOfHHMembersSelectedForHRD,
  HM.HouseholdMembmerIdNumber,
  HM.FirstName_Eng,
  HM.FatherName_Eng,
  HM.GrandFatherName_Eng,
  HM.GenderId,
  G.Description_Eng,
  HM.DateOfBirth,
  HM.BeneficiaryTypeId,
  BT.Description_Eng,
  HM.BankAccountNo
FROM Registration.Households H
INNER JOIN Registration.HouseholdMembers HM ON HM.HouseholdId = H.Id
INNER JOIN Config.Genders G ON G.Id = HM.GenderId
LEFT JOIN Config.BeneficiaryTypes BT ON BT.Id = HM.BeneficiaryTypeId
INNER JOIN Config.HouseholdStatuses HS ON HS.Id = H.HouseholdStatusId
INNER JOIN Config.ProgramComponents P ON P.Id = H.HouseholdProgramId
inner join Registration.HouseholdAddresses as RH on RH.HouseholdId = H.Id
inner join Maintenance.AdminLocations as AdminLocation on RH.AdminLocationId = AdminLocation.Id
inner join Config.AdminLocationTypes as AdminLocationTypes on AdminLocation.AdminLocTypeId = AdminLocationTypes.Id 
inner join Maintenance.AdminLocations as kebele_location on AdminLocation.ParentAdminLocationId = kebele_location.Id
inner join Config.AdminLocationTypes as kebele_config on kebele_config.Id = kebele_location.AdminLocTypeId
inner join Maintenance.AdminLocations as woreda_location on kebele_location.ParentAdminLocationId = woreda_location.Id
inner join Config.AdminLocationTypes as woreda_config on woreda_config.Id = woreda_location.AdminLocTypeId
inner join Maintenance.AdminLocations as zone_location on woreda_location.ParentAdminLocationId = zone_location.Id
inner join Config.AdminLocationTypes as zone_config on zone_config.Id = zone_location.AdminLocTypeId
inner join Maintenance.AdminLocations as region_location on zone_location.ParentAdminLocationId = region_location.Id
inner join Config.AdminLocationTypes as region_config on region_config.Id = region_location.AdminLocTypeId
WHERE H.HouseholdProgramId = 2 AND H.Status <> 0 AND HM.IsHouseholdHead = 1`);
  return result.recordset;
}

export async function extract_pw_total_cash_transfer(db_conn) {
  const result = await db_conn.request()
    .query(`Select   G.Description_Eng,TP.Id ,TP.CreatedDate, NetPay AS Total_Cash_Transfer,region_location.Name_Eng as region_name, zone_location.Name_Eng zone_name,woreda_location.Name_Eng woreda_name, kebele_location.Name_Eng as kebele_name from PSNPMISDB.Transfer.PayrollDetails as TP 
inner join Registration.Households as RG on TP.HouseholdId = RG.Id
INNER JOIN Registration.HouseholdMembers HM ON HM.HouseholdId = RG.Id
INNER JOIN Config.Genders G ON G.Id = HM.GenderId
inner join Registration.HouseholdAddresses as RH on RH.HouseholdId = RG.Id
inner join Maintenance.AdminLocations as AdminLocation on RH.AdminLocationId = AdminLocation.Id
inner join Config.AdminLocationTypes as AdminLocationTypes on AdminLocation.AdminLocTypeId = AdminLocationTypes.Id 
inner join Maintenance.AdminLocations as kebele_location on AdminLocation.ParentAdminLocationId = kebele_location.Id
inner join Config.AdminLocationTypes as kebele_config on kebele_config.Id = kebele_location.AdminLocTypeId
inner join Maintenance.AdminLocations as woreda_location on kebele_location.ParentAdminLocationId = woreda_location.Id
inner join Config.AdminLocationTypes as woreda_config on woreda_config.Id = woreda_location.AdminLocTypeId
inner join Maintenance.AdminLocations as zone_location on woreda_location.ParentAdminLocationId = zone_location.Id
inner join Config.AdminLocationTypes as zone_config on zone_config.Id = zone_location.AdminLocTypeId
inner join Maintenance.AdminLocations as region_location on zone_location.ParentAdminLocationId = region_location.Id
inner join Config.AdminLocationTypes as region_config on region_config.Id = region_location.AdminLocTypeId
where PayrollMasterId  in (
Select id from PSNPMISDB.Transfer.PayrollMasters  where ProgramComponentId  = 2 and TransferTypeId = 2) `);
  return result.recordset;
}

export async function extract_pds_total_cash_transfer(db_conn) {
  const result = await db_conn.request()
    .query(`Select G.Description_Eng,TP.Id ,TP.CreatedDate, NetPay AS Total_Cash_Transfer,region_location.Name_Eng as region_name, zone_location.Name_Eng as zone_name,woreda_location.Name_Eng as woreda_name, kebele_location.Name_Eng as kebele_name from PSNPMISDB.Transfer.PayrollDetails as TP 
inner join Registration.Households as RG on TP.HouseholdId = RG.Id
INNER JOIN Registration.HouseholdMembers HM ON HM.HouseholdId = RG.Id
INNER JOIN Config.Genders G ON G.Id = HM.GenderId
inner join Registration.HouseholdAddresses as RH on RH.HouseholdId = RG.Id
inner join Maintenance.AdminLocations as AdminLocation on RH.AdminLocationId = AdminLocation.Id
inner join Config.AdminLocationTypes as AdminLocationTypes on AdminLocation.AdminLocTypeId = AdminLocationTypes.Id 
inner join Maintenance.AdminLocations as kebele_location on AdminLocation.ParentAdminLocationId = kebele_location.Id
inner join Config.AdminLocationTypes as kebele_config on kebele_config.Id = kebele_location.AdminLocTypeId
inner join Maintenance.AdminLocations as woreda_location on kebele_location.ParentAdminLocationId = woreda_location.Id
inner join Config.AdminLocationTypes as woreda_config on woreda_config.Id = woreda_location.AdminLocTypeId
inner join Maintenance.AdminLocations as zone_location on woreda_location.ParentAdminLocationId = zone_location.Id
inner join Config.AdminLocationTypes as zone_config on zone_config.Id = zone_location.AdminLocTypeId
inner join Maintenance.AdminLocations as region_location on zone_location.ParentAdminLocationId = region_location.Id
inner join Config.AdminLocationTypes as region_config on region_config.Id = region_location.AdminLocTypeId
where PayrollMasterId  in (
Select id from PSNPMISDB.Transfer.PayrollMasters  where ProgramComponentId  = 1 and TransferTypeId = 2) `);
  return result.recordset;
}
