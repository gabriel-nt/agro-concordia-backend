export default interface IUpdateUserDTO {
  name: string;
  phone: string;
  email: string;
  old_password?: string;
  password?: string;
  confirm_password?: string;
}
