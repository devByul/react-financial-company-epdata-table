interface IGetFinancialParam {
  brnNo: number; // 차 브랜드 코드넘버
  modlNo: number | null; // 차 모델명 코드넘버
  trimNo: number | null; // 차 트림 코드넘버
  dtlTrimNo: number | null; // 차 상세트림 코드넘버
  prodType: "L" | "R" | "I"; // 금융상품 타입 (L-리스 / R- 렌트 / I - 할부)
  period: 36 | 48 | 60; // 할부기간 (36,48,60)
  jogun: 1 | 2 | 3; // 조건 (1: 보증0/선납0  2: 보증0/선납30   3: 보증30/선납0)
}

interface ICorpData {
  [key: string]: string | any;
  CDwr001: string;
  CPlt001: string;
  CPmr001: string;
  CDsh001: string;
  CPnh001: string;
  CPor001: string;
  CPhs001: string;
  RTjo001: string;
  CPdg001: string;
  CPkd001: string;
  CPhk001: string;
  CPbn001: string;
  CDsh002: string;
}
interface IGetFinancialData extends ICorpData {
  [key: string]: string | number;
  idx: number;
  BRN_C_NO: string;
  brnNm: string;
  carNm: string;
  prodType: string;
  period: number;
  jogun: number;
}

export type { IGetFinancialParam, ICorpData, IGetFinancialData };
