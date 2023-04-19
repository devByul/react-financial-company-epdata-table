type TEpDataAPIQuery =
  | "prod"
  | "period"
  | "jogun"
  | "brn"
  | "mdl"
  | "trim"
  | "dtlTrim";

type TProdType = "L" | "R" | "I";
type TPeorid = 36 | 48 | 60;
type TJogun = 1 | 2 | 3;

interface ISelectDtlTrim {
  DTL_TRIM_C_NO: string;
  DTL_TRIM_C_NM: string;
}
interface ISelectTrim {
  TRIM_C_NO: string;
  TRIM_C_NM: string;
}
interface ISelectModel {
  MODL_C_NO: string;
  MODL_C_NM: string;
}
interface ISelectBrand {
  BRN_C_NO: string;
  BRN_C_NM: string;
}
interface ISelectAll {
  brand: ISelectBrand;
  model: ISelectModel;
  trim: ISelectTrim;
  dtlTrim: ISelectDtlTrim;
}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

export type {
  TEpDataAPIQuery,
  TProdType,
  TPeorid,
  TJogun,
  ISelectDtlTrim,
  ISelectTrim,
  ISelectModel,
  ISelectBrand,
  ISelectAll,
  ExpandedDataType,
};
