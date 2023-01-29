export enum PermissionNames {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}

export type Permission = keyof typeof PermissionNames;

export type Group = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};

export type GroupParams = {
  id: string;
}

export type GroupDTO = {
  name: string;
  permissions: Array<Permission>;
};
