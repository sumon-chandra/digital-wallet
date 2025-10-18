/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MyProfileUiProps {
  myProfile: any;
  isEditing: boolean;
  isUpdating: boolean;
  form: {
    name: string;
    phone: string;
    address: string;
    newPassword: string;
    confirmPassword: string;
  };
  showPassword: {
    newPassword: boolean;
    confirmPassword: boolean;
  };
  profileInfo: Array<{
    icon?(icon: any, arg1: { className: string; }): import("react").ReactNode;
    label: string;
    value: string;
    colSpan: string;
    badge?: boolean;
  }>;
  formFields: Array<{
    name: string;
    placeholder: string;
    type: string;
    value: string;
    hasEye?: boolean;
  }>;
  initial: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean | undefined;
  onEditClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility: (field: keyof MyProfileUiProps["showPassword"]) => void;
  onCancelEdit: () => void;
}
