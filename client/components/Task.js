/**
 * Created by luzga_000 on 06/07/2017.
 */

import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import TaskStatusEnum from '..//enums/TaskStatusEnum';

class Task extends Component {
  static defaultProps = {
    task: {
      name: '',
      status: '',
    },
  };

  deleteAction = () => {
    const { deleteTaskMutation, task } = this.props;
    deleteTaskMutation({
      variables: { id: task.id }
    });
  };

  completeAction = () => {
    const { markAsDoneMutation, task } = this.props;
    markAsDoneMutation({
      variables: { id: task.id },
      optimisticResponse: {
        taskRepositoryMutation: {
          __typename: 'TaskRepositoryMutation',
          markDone: { ...task, __typename: 'Task', status: TaskStatusEnum.DONE },
        },
      },
    });
  };

  renderCheckbox = (status) => {
    switch (status) {
      case TaskStatusEnum.CREATING:
        return (
          <button type="button" className="btn btn-secondary">
            <div className="octicon octicon-clock" aria-hidden="true" />
          </button>
        );
      case TaskStatusEnum.READY:
        return (
          <button onClick={this.completeAction} type="button" className="btn btn-secondary">
            <div className="octicon octicon-check" aria-hidden="true" />
          </button>
        );
      case TaskStatusEnum.DONE:
        return (
          <button onClick={this.deleteAction} type="button" className="btn btn-secondary">
            <div className="octicon octicon-trashcan" aria-hidden="true" />
          </button>
        );
      default:
        return (<div>Task corrupted</div>);
    }
  };

  render() {
    const { name, status } = this.props.task,
      divClass = `task ${status.toLowerCase()} my-4 card p-2`
    return (
      <div className={divClass}>
        <div className="d-flex align-items-center justify-content-start">
          <div className="task__name"><div>{name}</div></div>
          <div className="ml-auto">{this.renderCheckbox(status)}</div>
        </div>
      </div>
    );
  }
}

Task.fragments = {
  task: gql`
    fragment Task_task on Task {
      name,
      status,
      id
    }
  `,
};

const TaskMarkAsDoneMutation = gql`
  mutation Task_MarkAsDoneMutation($id: String!) {
    taskRepositoryMutation {
      markDone(id: $id) {
        ...Task_task
      }
    }
  }
  
  ${Task.fragments.task}
`;


const TaskDeleteTaskMutation = gql`
  mutation Task_DeleteTaskMutation($id: String!) {
    taskRepositoryMutation {
      deleteTask(id: $id)
    }
  }
`;


Task.propTypes = {
  task: propType(Task.fragments.task).isRequired,
  markAsDoneMutation: PropTypes.func.isRequired,
  deleteTaskMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(TaskMarkAsDoneMutation, { name: 'markAsDoneMutation' }),
  graphql(TaskDeleteTaskMutation, { name: 'deleteTaskMutation' }),
)(Task);
