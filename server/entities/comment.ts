export interface CommentsProps {
  id?: number;
  id_user: number;
  id_task: number;
  starts_date: Date;
  description: string;
}

export class Comment {
  private props: CommentsProps;

  constructor(props: CommentsProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.id_user;
  }

  get taskId() {
    return this.props.id_task;
  }

  get startDate() {
    return this.props.starts_date;
  }

  get description() {
    return this.props.description;
  }
}
