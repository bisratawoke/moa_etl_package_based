"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuarter = exports.marrageTransformer = exports.cancelMorgageTransform = exports.registerMorgageTransform = exports.specialCaseTransformer = exports.reallocationTransformer = exports.giftTransfomer = exports.divorceTransformer = exports.InheritanceWithOutTransformerWill = exports.InheritanceWithWillTransformer_v2 = exports.InheritanceWithWillTransformer = void 0;
var utils_1 = require("./utils");
function InheritanceWithWillTransformer(jsonData) {
    var personalInfo = [];
    for (var i = 0; i < jsonData.beneficiaryHolding.length; i++) {
        var holding = jsonData.beneficiaryHolding[i];
        for (var j = 0; j < holding.parties.length; j++) {
            var party = holding.parties[j];
            var _a = party.party, sex = _a.sex, name1 = _a.name1, name2 = _a.name2;
            var partyType = (0, utils_1.partyTypeConv)(party.party.partyType);
            personalInfo.push(__assign(__assign({ gender_name: sex === 1 ? "Female" : "Male", first_name: name1, last_name: name2 }, party.party), { pt: party.partyType, partyTypeText: partyType }));
        }
    }
    return personalInfo;
}
exports.InheritanceWithWillTransformer = InheritanceWithWillTransformer;
function InheritanceWithWillTransformer_v2(jsonData) {
    var personalInfo = [];
    for (var i = 0; i < jsonData.beneficiaryHolding.length; i++) {
        var holding = jsonData.beneficiaryHolding[i];
        for (var j = 0; j < holding.parties.length; j++) {
            var party = holding.parties[j];
            var _a = party.party, sex = _a.sex, name1 = _a.name1, name2 = _a.name2;
            var partyType = (0, utils_1.partyTypeConv)(party.party.partyType);
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
exports.InheritanceWithWillTransformer_v2 = InheritanceWithWillTransformer_v2;
function InheritanceWithOutTransformerWill(jsonData) {
    var personalInfo = [];
    var holding = jsonData.beneficiaryHolding[0];
    for (var i = 0; i < holding.parties.length; i++) {
        var party = holding.parties[i];
        var _a = party.party, sex = _a.sex, name1 = _a.name1, name2 = _a.name2;
        var partyType = (0, utils_1.partyTypeConv)(party.party.partyType);
        personalInfo.push({
            gender_name: sex === 1 ? "Female" : "Male",
            first_name: name1,
            last_name: name2,
            partyTypeText: partyType,
        });
    }
    return personalInfo;
}
exports.InheritanceWithOutTransformerWill = InheritanceWithOutTransformerWill;
function divorceTransformer(jsonData) {
    var personalInfo = [];
    var _loop_1 = function (x) {
        var applicant = jsonData.data.applicants[x];
        var selfPartyUID = applicant.selfPartyUID, idDocument = applicant.idDocument, relationWithParty = applicant.relationWithParty, inheritancRole = applicant.inheritancRole;
        var party = jsonData.parties.find(function (party) { return party.existingPartyUID === selfPartyUID; }).party;
        var partyType = (0, utils_1.partyTypeConv)(party.partyType);
        personalInfo.push({
            gender_name: party.sex === 1 ? "Female" : "Male",
            first_name: party.name1,
            last_name: party.name2,
            relationWithParty: relationWithParty,
            inheritancRole: inheritancRole,
            partyTypeText: partyType,
        });
    };
    for (var x = 0; x < jsonData.data.applicants.length; x++) {
        _loop_1(x);
    }
    return personalInfo;
}
exports.divorceTransformer = divorceTransformer;
function giftTransfomer(jsonData) {
    var personalInfo = [];
    var _loop_2 = function (i) {
        var beneficiary = jsonData.beneficiaryHolding[i];
        var _a = beneficiary.holderBeneficiaries[0] || {}, selfPartyUID = _a.selfPartyUID, idDocument = _a.idDocument, relationWithParty = _a.relationWithParty, inheritancRole = _a.inheritancRole;
        var party = beneficiary.parties.find(function (party) { return party.existingPartyUID === selfPartyUID; }).party;
        var partyType = (0, utils_1.partyTypeConv)(party.partyType);
        personalInfo.push(__assign(__assign({ gender_name: party.sex === 2 ? "Female" : "Male", first_name: party.name1, last_name: party.name2, relationWithParty: relationWithParty, inheritancRole: inheritancRole }, party), { partyTypeText: partyType, p1: party.partyType }));
    };
    for (var i = 0; i < jsonData.beneficiaryHolding.length; i++) {
        _loop_2(i);
    }
    return personalInfo;
}
exports.giftTransfomer = giftTransfomer;
function reallocationTransformer(jsonData) {
    var personalInfo = [];
    // Extract personal information from beneficiaries
    for (var i = 0; i < jsonData.beneficiaries.length; i++) {
        var beneficiary = jsonData.beneficiaries[i];
        var gender_name = beneficiary.party.sex === 1 ? "Female" : "Male";
        var full_name = "".concat(beneficiary.party.name1, " ").concat(beneficiary.party.name2, " ").concat(beneficiary.party.name3);
        var partyType = (0, utils_1.partyTypeConv)(beneficiary.party.partyType);
        personalInfo.push(__assign(__assign({ gender_name: gender_name, full_name: full_name }, beneficiary.party), { partyTypeText: partyType, p1: beneficiary.party.partyType }));
    }
    // Extract personal information from applicants
    for (var i = 0; i < jsonData.applicants.length; i++) {
        var applicant = jsonData.applicants[i];
        var gender_name = applicant.representative.sex === 1 ? "Female" : "Male";
        var full_name = "".concat(applicant.representative.name1, " ").concat(applicant.representative.name2, " ").concat(applicant.representative.name3);
        personalInfo.push({ gender_name: gender_name, full_name: full_name });
    }
    return personalInfo;
}
exports.reallocationTransformer = reallocationTransformer;
function specialCaseTransformer(jsonData) {
    var personalInfo = [];
    for (var i = 0; i < jsonData.applicants.length; i++) {
        var applicant = jsonData.applicants[i];
        var party = applicant.party;
        var gender_name = party.sex === 1 ? "Female" : "Male";
        var full_name = "".concat(party.name1, " ").concat(party.name2, " ").concat(party.name3);
        var partyType = (0, utils_1.partyTypeConv)(party.partyType);
        // const partyType = partyTypeConv(party.partyType)
        personalInfo.push(__assign(__assign({ gender_name: gender_name, full_name: full_name }, party), { partyTypeText: partyType }));
    }
    return personalInfo;
}
exports.specialCaseTransformer = specialCaseTransformer;
function registerMorgageTransform(jsonObj) {
    var personalInfo = [];
    if (jsonObj.applicants && Array.isArray(jsonObj.applicants)) {
        for (var i = 0; i < jsonObj.applicants.length; i++) {
            var party = jsonObj.applicants[i];
            if (party && party.sex !== undefined && party.name1) {
                var gender_name = party.sex === 1 ? "Female" : "Male";
                var first_name = "".concat(party.name1, " ").concat(party.name2 || "", " ").concat(party.name3 || "");
                var partyType = (0, utils_1.partyTypeConv)(party.partyType);
                personalInfo.push(__assign(__assign({ gender_name: gender_name, first_name: first_name }, party), { partyType: partyType }));
            }
        }
    }
    return personalInfo;
}
exports.registerMorgageTransform = registerMorgageTransform;
function cancelMorgageTransform(jsonObj) {
    var personalInfo = [];
    if (jsonObj.applicants && Array.isArray(jsonObj.applicants)) {
        for (var i = 0; i < jsonObj.applicants.length; i++) {
            var applicant = jsonObj.applicants[i];
            var party = applicant.party;
            if (party && party.sex !== undefined && party.name1) {
                var gender_name = party.sex === 1 ? "Female" : "Male";
                var first_name = "".concat(party.name1, " ").concat(party.name2 || "", " ").concat(party.name3 || "");
                var partyType = (0, utils_1.partyTypeConv)(party.partyType);
                personalInfo.push(__assign(__assign({ gender_name: gender_name, first_name: first_name }, party), { partyTypeText: partyType }));
            }
        }
    }
    return personalInfo;
}
exports.cancelMorgageTransform = cancelMorgageTransform;
function marrageTransformer(jsonObj) {
    var personalInfo = [];
    if (jsonObj.spouses && Array.isArray(jsonObj.spouses)) {
        for (var i = 0; i < jsonObj.spouses.length; i++) {
            var spouse = jsonObj.spouses[i];
            if (spouse.newParty && spouse.newParty.party) {
                var party = spouse.newParty.party;
                if (party.sex !== undefined && party.name1) {
                    var gender_name = party.sex === 1 ? "Female" : "Male";
                    var first_name = "".concat(party.name1, " ").concat(party.name2 || "", " ").concat(party.name3 || "");
                    var party_id = party.id;
                    var partyType = (0, utils_1.partyTypeConv)(party.partyType);
                    personalInfo.push(__assign(__assign({ gender_name: gender_name, first_name: first_name, party: party, party_id: party_id }, party), { partyTypeText: partyType }));
                }
            }
        }
    }
    return personalInfo;
}
exports.marrageTransformer = marrageTransformer;
function getQuarter(month) {
    var quarter = "";
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
exports.getQuarter = getQuarter;
