


export const ConfigurationConstants = {
  HEADER_SKIP_LOADER: "Skip-Loader",
  HEADER_CACHE_REQUEST: "Cache-Request",
  LOADING_TIMEOUT: 500,
}

export class Froala {
  public static key: string = 'iMFIZJNKLDXIREJI==';

}

export const HeaderConstants = {
  PERMISSIONHEADER: (permissionObj, orgId) => {
    return [
      { name: 'Dashboard', link: '/dashboard', image: '../../../assets/images/dashboard-hamburger.svg', flag: true },
      { name: 'Global Store', link: '/globalStore/' + orgId, image: '../../../assets/images/global-store-hamburger.svg', flag: permissionObj.globalStoreFlag },
      { name: 'Project Store', link: '/project-dashboard', image: '../../../assets/images/Add-Project-hamburger.svg', flag: permissionObj.projectStoreFlag },
      { name: 'Request For Quotation', link: '/rfq', image: '../../../assets/images/create-RFQ-hambuger.svg', flag: permissionObj.rfqFlag },
      { name: 'Purchase Order', link: '/po', image: '../../../assets/images/po-hamburger.svg', flag: permissionObj.purchaseOrderFlag },
      { name: 'My Materials', link: '/myMaterial', image: '../../../assets/images/my-materials-hamburger.svg', flag: permissionObj.rfqFlag },
      { name: 'Supplier', link: '/supplier', image: '../../../assets/images/supplier-hamburger.svg', flag: permissionObj.supplierFlag },
      { name: 'Users', link: '/users/', image: '../../../assets/images/user-hamburger.svg', flag: permissionObj.usersFlag }
      // { name: 'Reports', link: '/reports/supplier-liability', image: '../../../assets/images/report-hamburger.svg', flag: permissionObj.usersFlag }

    ]

  }
}

export const API = {
  PROJECTS: (organizationId, userId) => `projects/${organizationId}/${userId}`,
  USERPROJECTS: `user/project`,
  GETPROJECT: (organizationId, projectId) => `project/${organizationId}/${projectId}`,
  GETCATERGORY: `material/groups`,
  ADDPROJECT: `addProject`,
  VERIFYRESETEMAIL: (email, clientId) => `api/auth/forgotPassword?emailId=${encodeURI(email)}&client_id=${clientId}`,
  // VERIFYRESETEMAIL: `api/auth/forgotPassword`,
  EMAILRESETPASSWORD: `api/user/resetPassword`,
  UPDATEPROJECT: (organizationId, projectId) => `updateProjectDetails/${organizationId}/${projectId}`,
  RAISEINDENT: projectId => `indent/raise/${projectId}`,
  DELETE: (organizationId, projectId) => `deleteProject/${organizationId}/${projectId}`,
  GETMATERIALSWITHSPECS: `material/materialsSpecs`,
  GETMATERIALSWITHQUANTITY: (organizationId, projectId) => `materials/${organizationId}/${projectId}`,
  GETINDENTLIST: projectId => `indent/list/${projectId}`,
  POSTMATERIALSQUANTITY: (userId, projectId) => `materials/${userId}/${projectId}`,
  GETMATERIALWISE: organizationId => `global/materials/${organizationId}`,
  GETPROJECTWISE: organizationId => `global/projects/${organizationId}`,
  RFQMATERIALS: `rfqMaterials`,
  RFQDETAIL: organizationId => `rfq/list/${organizationId}`,
  RFQPO: (organizationId, rfqId) => `rfq/details/${organizationId}/${rfqId}`,
  RFQADDPO: `po/addPO`,
  GETSUPPLIERS: organizationId => `projects/getsuppliers/${organizationId}`,
  ADDSUPPLIER: organizationId => `projects/addSuppliers/${organizationId}`,
  GETPODETAILLIST: organizationId => `po/detail/list/${organizationId}`,
  GETPODATA: poId => `po/genarate/${poId}`,
  SENDPODATA: `po/updatePO`,
  ADDRFQ: `rfq/addrfq`,
  GETRFQDETAILSUPPLIER: (rfqId, supplierId) => `rfq/details/supplier/${rfqId}/${supplierId}`,
  POSTRFQDETAILSUPPLIER: supplierId => `rfq/addSupplierDetail/${supplierId}`,
  GETAPPROVER: (organizationId, projectId) => `po/users/${organizationId}/${projectId}`,
  POSTADDADDRESS: (type, id) => `address/add/${type}/${id}`,
  GETPOADDADDRESS: (type, id) => `address/get/${type}/${id}`,
  VERIFYRESETPASSWORD: (token, clientId) => `api/auth/verifyResetPassword?token=${token}&client_id=${clientId}`,
  POSTDOCUMENTUPLOAD: `documents/upload`,
  POSTSUPPLIERDOCUMENTUPLOAD: `supplier/documents/upload`,
  SIGNUP: `api/auth/signup`,
  SIGNIN: `oauth/token`,
  GETISSUETOINDENT: (materialId, projectId) => `materials/updateStock/${materialId}/${projectId}`,
  POSTISSUETOINDENT: materialId => `indent/issueQty/${materialId}`,
  GETSINGLEINDENT: indentId => `indent/detail/${indentId}`,
  GETGRNDETAILS: grnId => `po/view/grn/poDetails/${grnId}`,
  ADDGRN: `po/add/grn`,
  VIEWGRN: (organizationId, purchaseOrderId) => `po/grn/detail/${organizationId}/${purchaseOrderId}`,
  GETRFQVIEW: rfqId => `rfq/view/details/${rfqId}`,
  ROLES: `user/getroles`,
  ALLUSERS: organizationId => `user/getall/${organizationId}`,
  ADDUSER: `user/add`,
  EDITUSER: `user/update/roleproject`,
  DEACTIVATEUSER: userId => `user/delete/${userId}`,
  UPLOADEXCEL: projectId => `bom/custmaterials/fileupload/${projectId}`,
  DELETESUPPLIER: supplierId => `projects/deleteSupplier/${supplierId}`,
  DELETEMATERIAL: (projectId, materialId) => `material/delete/${projectId}/${materialId}`,
  APPROVEREJECTPO: `po/approveRejectPO`,
  GETGENERATEDRFQ: rfqId => `fq/stepper/${rfqId}`,
  DELETEDRAFTEDPO: purchaseOrderId => `po/delete/${purchaseOrderId}`,
  GETSUPPLIERADDRESS: supplierId => `address/get/Supplier/${supplierId}`,
  ADDSUPPLIERADDRESS: supplierId => `address/add/Supplier/${supplierId}`,
  NUMBERTOWORDS: currency => `commons/numtowords/${currency}`,
  GET_USER_PROFILE: USERID => `user/profile/${USERID}`,
  GET_ALL_TRADES: 'all/tades',
  SUBMIT_USER_DETAILS: 'user/update/profile',
  GET_NOTIFICATIONS: userId => `user/notification/${userId}`,
  GETRFQTERMS: 'rfq/payment/terms',
  GETADDEDRFQ: rfqId => `rfq/stepper/${rfqId}`,
  GET_USER_INFO_UNIQUE_CODE: uniqueCode => `user/info/${uniqueCode}`,
  GET_DASHBOARD_DATA: 'dashboard',
  UPLOADSUPPLIEREXCEL: organisationId => `projects/uploadSuppliers/${organisationId}`,
  GETCITYANDSTATE: pincode => `city-state/get/${pincode}`,
  GETCITYANDSTATEBYCOUNTRY: (pincode, countryId) => `city-state/get/${pincode}/${countryId}`,
  SENDOTP: (phone, callingCode) => `api/auth/otp/create?phone=${encodeURI(phone)}&countryCode=${encodeURIComponent(callingCode)}`,
  VERIFYOTP: (phone, countryCode, otp) => `api/auth/otp/verify?phone=${encodeURI(phone)}&countryCode=${encodeURIComponent(countryCode)}&otp=${encodeURI(otp)}`,
  VERIFYEMAIL: email => `verify/email?email=${email}`,
  GETUSERGUIDEFLAG: `userGuide`,
  SENDUSERGUIDEFLAG: `add/userGuide`,
  GETBOMTRADES: `material/get/trades`,
  GET25BOMTRADES: `topmaterial/get/trades`,
  ORGANIZATIONTRADES: projectId => `all/org/trades/${projectId}`,
  PROJECTTRADES: `add/projectTrades`,
  TERMS: id => `update/terms/${id}`,
  TURNOVERLIST: `get/turnovers`,
  VERIFYMOBILE: (mobile, countryCode) => `verify/contact?contact=${mobile}&countryCode=${encodeURI(countryCode)}`,
  VERIFYFORGETPASSWORDOTP: (phone, otp, clientId, countryCode) => `api/auth/otp/verify?phone=${encodeURI(phone)}&countryCode=${encodeURIComponent(countryCode)}&otp=${encodeURI(otp)}&tokenRequired=true&client_id=${encodeURI(clientId)}`,
  FORGOTPASSWORD: `api/user/resetPassword`,
  CHECKTERMS: `get/isuser/terms/accepted`,
  MATERIALUNIT: `material/get/unit`,
  MYCUSTOMMATERIAL: (type) => `material/get/custom/${type}`,
  DOWNLOADPO: purchaseOrderId => `po/download/${purchaseOrderId}`,
  TRADERELATEDCATEGORY: (tradeName) => `trade/get/categories/${tradeName}`,
  MATERIALEXIST: `material/search/materialexist`,
  ADDMYMATERIAL: projectId => `material/add/custom/${projectId}`,
  GETRELEASENOTES: `user/get/releaseNote`,
  UPDATEMYMATERIAL: `material/update/approved/custom`,
  APPROVEMYMATERIAL: `material/update/approve/custom`,
  SENDRELEASENOTE: `user/add/releaseNote`,
  DELETEMYMATERIAL: (id) => `material/delete/custom/${id}`,
  ALLCATEGORY: `trade/get/all/categories`,
  PAYMENTRECORD: (poId) => `po/add/payment/${poId}`,
  PAYMENTHISTORY: (poId) => `po/get/payment/${poId}`,
  PAYMENTDETAIL: (poId) => `po/get/payment/indetail/${poId}`,
  CURRENCY: `get/currency`,
  COUNTRYCODE: `get/country`,
  BASECURRENCY: `get/basecurrency`,
  POSTTAXANDOTHERCOST: `organization/add/tax/otherCost`,
  POTAXANDOTHERCOST: `po/organization/add/tax/otherCost`,
  GETPOTAXESLIST: 'po/tax/otherCost',
  GETTAXESLIST: (rfqId) => `supplier/tax/otherCost/${rfqId}`,
  RESENDEMAIL: `email/resend`,
  EMAILVERFICATIONSTATUS: `email/verification/status`,
  EMAILVERFICATION: (token) => `emailVerification/${token}`,
  DASHBOARD_VIDEOS: 'marketing/dashboardVideo',
  PUSHNOTIFICATIONDATA: 'user/web/notification/savetoken',
  ADDGRNWITHOUTPO: 'po/add/grn/withoutpo',
  GETSUBSCRIPTIONPLAN: 'subscription/getSubscriptionPlan',
  POST_SUBSCRIPTIONPAYMENTGATEWAY: 'payments/subscription/initiate',
  POST_SUBSCRIPTIONINITIATE: 'payment/subscription/initiate',
  POST_SUBSCRIPTION_UNSUBSCRIBE: 'payment/unsubscribe',
  SUPPLIER_RATING: 'supplier/update/rating',
  UPLOAD_IMAGE: 'material/addImages',
  VIEW_IMAGES: (projectId, materialId) => `material/getImages/${projectId}/${materialId}`,
  DOWNLOAD_IMAGE: 'documents/download',
  GET_ALL_RFQ_IMAGES: (rfqId, materialId) => `rfq/getImages/${rfqId}/${materialId}`,
  GET_SUPPLIER_IMAGES: (rfqId, materialId, supplierId) => `rfq/getImages/${rfqId}/${materialId}/${supplierId}`,
  PO_ADD_IMAGES: 'po/addImages',
  GET_ALL_PO_IMAGES: (purchaseOrderId, materialId) => `po/getImages/${purchaseOrderId}/${materialId}`,
  GET_MENU: 'subscription/menu',
  GRNDOWNLOADTEMPELATE: (projectId) => `po/download/GRNExcelTemplate/${projectId}`,
  GRNUPLOADTEMPELATE: (projectId) => `po/add/opengrn/excel/${projectId}`,
  SUPPLIERLIABILITYREPORT: 'supplier/getLiabilityReport'
};
