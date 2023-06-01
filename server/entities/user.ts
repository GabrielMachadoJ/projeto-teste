export interface UserProps {
  id?: number;
  name: string;
  login: string;
  password: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get login() {
    return this.props.login;
  }

  get password() {
    return this.props.password;
  }
}
