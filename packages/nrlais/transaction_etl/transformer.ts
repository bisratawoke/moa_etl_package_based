import { partyTypeConv } from "./utils";

export function InheritanceWithWillTransformer(jsonData) {
  const personalInfo: any = [];

  for (let i = 0; i < jsonData.beneficiaryHolding.length; i++) {
    const holding = jsonData.beneficiaryHolding[i];
    for (let j = 0; j < holding.parties.length; j++) {
      const party = holding.parties[j];
      const { sex, name1, name2 } = party.party;
      let partyType = partyTypeConv(party.party.partyType);

      personalInfo.push({
        gender_name: sex === 1 ? "Female" : "Male",
        first_name: name1,
        last_name: name2,
        ...party.party,
        pt: party.partyType,
        partyTypeText: partyType,
      });
    }
  }

  return personalInfo;
}

export function InheritanceWithWillTransformer_v2(jsonData) {
  const personalInfo: any = [];

  for (let i = 0; i < jsonData.beneficiaryHolding.length; i++) {
    const holding = jsonData.beneficiaryHolding[i];
    for (let j = 0; j < holding.parties.length; j++) {
      const party = holding.parties[j];
      const { sex, name1, name2 } = party.party;
      let partyType = partyTypeConv(party.party.partyType);

      personalInfo.push({
        gender_name: sex === 1 ? "Female" : "Male",
        first_name: name1,
        last_name: name2,
        partyTypeText: partyType,
      });
    }
  }

  return personalInfo;
}

export function InheritanceWithOutTransformerWill(jsonData) {
  const personalInfo: any = [];

  const holding = jsonData.beneficiaryHolding[0];
  for (let i = 0; i < holding.parties.length; i++) {
    const party = holding.parties[i];
    const { sex, name1, name2 } = party.party;
    let partyType = partyTypeConv(party.party.partyType);

    personalInfo.push({
      gender_name: sex === 1 ? "Female" : "Male",
      first_name: name1,
      last_name: name2,
      partyTypeText: partyType,
    });
  }

  return personalInfo;
}

export function divorceTransformer(jsonData) {
  const personalInfo: any = [];

  for (let x = 0; x < jsonData.data.applicants.length; x++) {
    const applicant = jsonData.data.applicants[x];
    const { selfPartyUID, idDocument, relationWithParty, inheritancRole } =
      applicant;
    const party = jsonData.parties.find(
      (party) => party.existingPartyUID === selfPartyUID
    ).party;
    let partyType = partyTypeConv(party.partyType);

    personalInfo.push({
      gender_name: party.sex === 1 ? "Female" : "Male",
      first_name: party.name1,
      last_name: party.name2,
      relationWithParty,
      inheritancRole,
      partyTypeText: partyType,
    });
  }

  return personalInfo;
}

export function giftTransfomer(jsonData) {
  const personalInfo: any = [];

  for (let i = 0; i < jsonData.beneficiaryHolding.length; i++) {
    const beneficiary = jsonData.beneficiaryHolding[i];
    const { selfPartyUID, idDocument, relationWithParty, inheritancRole } =
      beneficiary.holderBeneficiaries[0] || {};
    const party = beneficiary.parties.find(
      (party) => party.existingPartyUID === selfPartyUID
    ).party;
    let partyType = partyTypeConv(party.partyType);

    personalInfo.push({
      gender_name: party.sex === 2 ? "Female" : "Male",
      first_name: party.name1,
      last_name: party.name2,
      relationWithParty,
      inheritancRole,
      ...party,
      partyTypeText: partyType,
      p1: party.partyType,
    });
  }

  return personalInfo;
}

export function reallocationTransformer(jsonData) {
  const personalInfo: any = [];

  // Extract personal information from beneficiaries
  for (let i = 0; i < jsonData.beneficiaries.length; i++) {
    const beneficiary = jsonData.beneficiaries[i];
    const gender_name = beneficiary.party.sex === 1 ? "Female" : "Male";
    const full_name = `${beneficiary.party.name1} ${beneficiary.party.name2} ${beneficiary.party.name3}`;
    let partyType = partyTypeConv(beneficiary.party.partyType);

    personalInfo.push({
      gender_name,
      full_name,
      ...beneficiary.party,
      partyTypeText: partyType,
      p1: beneficiary.party.partyType,
    });
  }

  // Extract personal information from applicants
  for (let i = 0; i < jsonData.applicants.length; i++) {
    const applicant = jsonData.applicants[i];
    const gender_name = applicant.representative.sex === 1 ? "Female" : "Male";
    const full_name = `${applicant.representative.name1} ${applicant.representative.name2} ${applicant.representative.name3}`;

    personalInfo.push({ gender_name, full_name });
  }

  return personalInfo;
}

export function specialCaseTransformer(jsonData) {
  const personalInfo: any = [];

  for (let i = 0; i < jsonData.applicants.length; i++) {
    const applicant = jsonData.applicants[i];
    const party = applicant.party;
    const gender_name = party.sex === 1 ? "Female" : "Male";
    const full_name = `${party.name1} ${party.name2} ${party.name3}`;
    let partyType = partyTypeConv(party.partyType);

    // const partyType = partyTypeConv(party.partyType)
    personalInfo.push({
      gender_name,
      full_name,
      ...party,
      partyTypeText: partyType,
    });
  }

  return personalInfo;
}

export function registerMorgageTransform(jsonObj) {
  const personalInfo: any = [];
  if (jsonObj.applicants && Array.isArray(jsonObj.applicants)) {
    for (let i = 0; i < jsonObj.applicants.length; i++) {
      const party = jsonObj.applicants[i];
      if (party && party.sex !== undefined && party.name1) {
        const gender_name = party.sex === 1 ? "Female" : "Male";
        const first_name = `${party.name1} ${party.name2 || ""} ${
          party.name3 || ""
        }`;
        let partyType = partyTypeConv(party.partyType);

        personalInfo.push({ gender_name, first_name, ...party, partyType });
      }
    }
  }

  return personalInfo;
}

export function cancelMorgageTransform(jsonObj) {
  const personalInfo: any = [];

  if (jsonObj.applicants && Array.isArray(jsonObj.applicants)) {
    for (let i = 0; i < jsonObj.applicants.length; i++) {
      const applicant = jsonObj.applicants[i];
      const party = applicant.party;
      if (party && party.sex !== undefined && party.name1) {
        const gender_name = party.sex === 1 ? "Female" : "Male";
        const first_name = `${party.name1} ${party.name2 || ""} ${
          party.name3 || ""
        }`;
        let partyType = partyTypeConv(party.partyType);

        personalInfo.push({
          gender_name,
          first_name,
          ...party,
          partyTypeText: partyType,
        });
      }
    }
  }

  return personalInfo;
}

export function marrageTransformer(jsonObj) {
  const personalInfo: any = [];
  if (jsonObj.spouses && Array.isArray(jsonObj.spouses)) {
    for (let i = 0; i < jsonObj.spouses.length; i++) {
      const spouse = jsonObj.spouses[i];
      if (spouse.newParty && spouse.newParty.party) {
        const party = spouse.newParty.party;
        if (party.sex !== undefined && party.name1) {
          const gender_name = party.sex === 1 ? "Female" : "Male";
          const first_name = `${party.name1} ${party.name2 || ""} ${
            party.name3 || ""
          }`;

          const party_id = party.id;
          let partyType = partyTypeConv(party.partyType);

          personalInfo.push({
            gender_name,
            first_name,
            party,
            party_id,
            ...party,
            partyTypeText: partyType,
          });
        }
      }
    }
  }

  return personalInfo;
}

export function getQuarter(month) {
  let quarter = "";
  switch (month) {
    case 1:
    case 2:
    case 3:
      quarter = "First";
      break;

    case 4:
    case 5:
    case 6:
      quarter = "Second";
      break;
    case 7:
    case 8:
    case 9:
      quarter = "Third";
      break;
    default:
      quarter = "Fourth";
      break;
  }

  return quarter;
}
