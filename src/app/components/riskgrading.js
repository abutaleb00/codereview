export const TYPEOFONBOARDING = {
  BranchOrRelationshipManager: {
    title: "Branch/Relationship Manager",
    value: 2,
  },
  DirectSalesAgent: { title: "Direct Sales Agent", value: 2 },
  Walkin: { title: "Walk-in", value: 3 },
  nonFacetoFace: {
    title: "Internet/Self check-in/Other non Face to Face",
    value: 5,
  },
};

export const GeographicRisks = {
  ResidentBangladeshi: { title: "Resident Bangladeshi", value: 1 },
  NonresidentBangladeshi: { title: "Non-resident Bangladeshi", value: 2 },
  ForeignCitizen: { title: "Foreign Citizen", value: 3 },
  RiskClassificationofcountryoforigin: {
    title: "Risk classification of country of origin",
    value: {
      YES: { title: "Yes", value: 5 },
      NO: { title: "No", value: 0 },
    },
  },
};
export const TypeofCustomer = {
  Is_client_a_PEP_or_Chief_or_High_Official_of_International_Organization: {
    NO: { title: "No", value: 0 },
    YES: { title: "Yes", value: 5 },
  },
  Is_client_family_or_close_associates_related_to_PEP_or_Chief_or_High_Official_of_International_Organization: {
    NO: { title: "No", value: 0 },
    YES: { title: "Yes", value: 5 },
  },
  Is_client_a_IP_or_his_family_or_close_associates_related_to_IP: {
    NO: { title: "No", value: 1 },
    YES: { title: "Yes", value: 5 },
  },
};

export const ProductAndChannelRisk = {
  Savings_account: { title: "Savings account", value: 1 },
  Current_account: { title: "Current account", value: 4 },
  FDR: { title: "FDR", value: 3 },
  Deposit_upto_12_lac: { title: "Deposit Scheme upto 12 lac", value: 1 },
  Deposit_Scheme_above_12_lac: {
    title: "Deposit Scheme above 12 lac",
    value: 3,
  },
  Forex_account: { title: "Forex account", value: 5 },
  SND: { title: "S.N.D.", value: 3 },
  RFCD: { title: "R.F.C.D.", value: 5 },
};

export const TransactionRisk = {
  less_than_BDT_1_million: { title: "<BDT 1 million", value: 1 },
  From_BDT_1_million_to_5_million: {
    title: "From BDT 1 million to 5 million",
    value: 2,
  },
  From_BDT_5_million_to_50_million_5_crores_: {
    title: "From BDT 5 million to 50 million (5 crores)",
    value: 3,
  },
  More_than_BDT_50_million_5_crores: {
    title: "More than BDT 50 million (5 crores)",
    value: 5,
  },
};

export const TransparencyRisk = {
  YES: { title: "Yes", value: 1 },
  NO: { title: "No", value: 5 },
};

export const Client_Profession = {
  No_Profession: 0,
};

export const Client_Buisness = {
  Jeweller_Gold_Valuable_Metals_Business: 5,
  Money_Changer_Courier_Service_Mobile_Banking_Agent: 5,
  Real_Estate_Developer_Agent: 5,
  Promoter_Contractor_Construction_Projects: 5,
  Art_and_Antiquities_Dealer: 5,
  Restaurant_Bar_Night_Club_Parlour_Hotel: 5,
  Export_Import: 5,
  Manpower_export: 5,
  Firearms: 5,
  RMG_Garments_Accessories_Buying_House: 5,
  Share_Stocks_Investor: 5,
  Software_Information_and_Technology_Business: 5,
  Travel_Agent: 4,
  Merchant_with_over_10_million_takas_invested_in_business: 4,
  Freight_Shipping_Cargo_Agent: 4,
  Automobiles_business_New_or_Reconditioned: 4,
  Leather_Leather_goods_Business: 4,
  Construction_Materials_Trader: 4,
  Business_Agent: 3,
  Thread_Jhut_Merchant: 3,
  Transport_Operator: 3,
  Tobacco_and_Cigarettes_Business: 3,
  Amusement_Park_Entertainment_Provider: 3,
  Motor_Parts_Trader_Workshop: 3,
  Small_Business_Investment_below_BDT_5_million: 2,
  Computer_Mobile_Phone_Dealer: 2,
  Manufacturer_except_weapons: 2,
  Others: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  },
  NO_Busness: 0,
};

export const BuisnessAndActivityRisk = [Client_Buisness, Client_Profession];
export const RiskGrading = [
  TYPEOFONBOARDING,
  GeographicRisks,
  TypeofCustomer,
  ProductAndChannelRisk,
  BuisnessAndActivityRisk,
  TransactionRisk,
  TransparencyRisk,
];
