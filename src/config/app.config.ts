interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Registered User'],
  tenantRoles: ['Administrator', 'Course Creator'],
  tenantName: 'Organization',
  applicationName: 'CouseMaker v3',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
