export const ConfigurationConstants = {
  HEADER_SKIP_LOADER: "Skip-Loader",
  HEADER_CACHE_REQUEST: "Cache-Request"
};
export const API = {
  PROJECTS: (organizationId, userId) => `projects/${organizationId}/${userId}`,
  GETPROJECT: (organizationId, projectId) =>
    `project/${organizationId}/${projectId}`,
  GETCATERGORY: `material/groups`,
  ADDPROJECT: `addProject`,
  UPDATEPROJECT: (organizationId, projectId) =>
    `updateProjectDetails/${organizationId}/${projectId}`,
  RAISEINDENT: projectId => `indent/${projectId}`,
  DELETE: (organizationId, projectId) =>
    `deleteProject/${organizationId}/${projectId}`,
  GETMATERIALSWITHSPECS: `material/materialsSpecs`,
  GETMATERIALSWITHQUANTITY: (organizationId, projectId) =>
    `materials/${organizationId}/${projectId}`,
  GETINDENTLIST: projectId => `indent/list/${projectId}`,
  POSTMATERIALSQUANTITY: (userId, projectId) =>
    `materials/${userId}/${projectId}`,
  GETMATERIALWISE: organizationId => `global/materials/${organizationId}`,
  GETPROJECTWISE: organizationId => `global/projects/${organizationId}`,
  RFQMATERIALS: `rfqMaterials`,
  RFQDETAIL: organizationId => `rfq/list/1`,
  RFQPO: (organizationId, rfqId) => `rfq/details/${organizationId}/${rfqId}`,
  RFQADDPO: `po/addPO`,
  GETSUPPLIERS: organizationId => `projects/getsuppliers/${organizationId}`,
  ADDSUPPLIER: organizationId => `projects/addSuppliers/${organizationId}`,
  GETPODETAILLIST: organizationId => `po/detail/list/${organizationId}`,
  GETPODATA: poId => `po/genarate/${poId}`,
  SENDPODATA: `po/updatePO`,
  ADDRFQ: `rfq/addrfq`,
  GETRFQDETAILSUPPLIER: (rfqId, supplierId) =>
    `rfq/details/supplier/${rfqId}/${supplierId}`,
  POSTRFQDETAILSUPPLIER: supplierId => `rfq/addSupplierDetail/${supplierId}`,
  GETAPPROVER: (organizationId, projectId) =>
    `po/users/${organizationId}/${projectId}`,
  POSTADDADDRESS: (type, id) => `address/add/${type}/${id}`,
  GETPOADDADDRESS: (type, id) => `address/get/${type}/${id}`,
  POSTDOCUMENTUPLOAD: `documents/upload`,
  SIGNUP: `sso/api/auth/signup`,
  SIGNIN: `sso/oauth/token`,
  //STATE: 'account/api/permitted/address/states',
  GETISSUETOINDENT: (projectId, materialId) =>
    `materials/updateStock/${projectId}/${materialId}`,
  POSTISSUETOINDENT: (materialId) =>
    `indent/issueQty/${materialId}`,
  GETSINGLEINDENT: (indentId) => `indent/detail/${indentId}`,
  GETGRNDETAILS: (grnId) => `po/view/grn/${grnId}`,
  // POSTGRNDETAILS: (organizationId, purchaseOrderId) => `po/add/grn/${organizationId}/${purchaseOrderId}`,
   ROLES : `user/getroles`,
  ALLUSERS: organizationId => `user/getall/${organizationId}`,
  ADDUSER : `user/add`,
  EDITUSER : `user/update/roleproject`,
  DEACTIVATEUSER: userId => `user/delete/${userId}`
};
