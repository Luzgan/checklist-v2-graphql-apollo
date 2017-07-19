/**
 * Created by luzga_000 on 06/07/2017.
 */

import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import TaskStatusEnum from '../enums/TaskStatusEnum';

class TaskAdd extends Component {
  constructor() {
    super();
    this.addTask.bind(this);
  }

  addTask = (e) => {
    const { mutate } = this.props;
    const name = this._name.value;
    e.preventDefault();
    this._name.value = '';
    mutate({
      variables: { name },
      optimisticResponse: {
        taskRepositoryMutation: {
          __typename: 'TaskRepositoryMutation',
          addTask: {
            __typename: 'Task',
            id: `temp${Date.now()}`,
            name,
            status: TaskStatusEnum.CREATING,
          },
        },
      },
    });
  };

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.addTask}>
          <div className="form-group w-100">
            <input type="text" ref={input => this._name = input} className="form-control w-75" />
            <button onClick={this.addTask} type="button" className="btn btn-secondary w-25">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

TaskAdd.fragments = {
  task: gql`
    fragment TaskAdd_task on Task {
      id,
      name,
      status
    }
  `,
};

TaskAdd.propTypes = {
  mutate: PropTypes.func.isRequired,
};

const TaskAddMutation = gql`
  mutation TaskAdd_AddMutation($name: String!) {
    taskRepositoryMutation {
      addTask(name: $name) {
        ...TaskAdd_task
      }
    }
  }
  
  ${TaskAdd.fragments.task}
`;

export default graphql(TaskAddMutation)(TaskAdd);
