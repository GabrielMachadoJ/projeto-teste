export interface TaskProps {
  id?: number;
  title: string;
  description: string;
  id_user: number;
  type: string;
  priority: string;
  status: string;
  starts_date: Date;
}

export class Task {
  private props: TaskProps;

  constructor(props: TaskProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get id_user() {
    return this.props.id_user;
  }

  get type() {
    return this.props.type;
  }

  get status() {
    return this.props.status;
  }

  get priority() {
    return this.props.priority;
  }

  get starts_date() {
    return this.props.starts_date;
  }
}
