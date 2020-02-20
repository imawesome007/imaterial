export interface ProjectDetails {
  addressLine1: string;
  addressLine2: string;
  area: number;
  city: string;
  cost: number;
  country: string;
  pinCode: string;
  state: string;
  type: string;
  projectId: number;
  projectName: string;
  userId: number;
  organizationId: number;
  addressShortname: string;
  addressType: string;
  createdAt: Date;
  createdBy: string;
  endDate: Date;
  gstNo: string;
  lowStockMaterialCount: string;
  materialCount: number;
  openIndentCount: number;
  pincode: string;
  primaryAddress: number;
  projectAddressId: number;
  purchaseOrderId?: number;
  purchaseOrderCost: string;
  purchaseOrderCount: string;
  startDate: Date;
  unit: string;
  matCount: number;
  checked?: boolean;
}

export interface ProjetPopupData {
  isDelete?: boolean;
  isEdit: boolean;
  detail?: ProjectDetails;
}

export interface ProjectIds {
  projectIds?: Array<Number>;
}
