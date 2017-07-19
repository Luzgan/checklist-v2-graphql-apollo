/*
 * Created by luzga_000 on 06/07/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';
import { propType, filter } from 'graphql-anywhere';
import Task from './Task';
import TaskAdd from '../components/TaskAdd';

class TasksList extends Component {
  static defaultProps = {

  };

  render() {
    const { loading, error, tasks } = this.props;

    if (loading) {
      return (<div>Loading...</div>);
    }

    if (error) {
      console.log(error);
      return (<div>Error: {error.message}</div>);
    }

    return (
      <div>
        <TaskAdd />
        <div>
          {_.map(tasks, task => (<Task
            key={task.id}
            task={filter(Task.fragments.task, task)}
          />))}
        </div>
        <button onClick={this.props.loadMore} type="button" className="btn btn-secondary w-25">Load more</button>
      </div>
    );
  }
}

const TasksListQuery = gql`
  query TasksList($lastId: String, $limit: Int) {
    taskRepositoryQuery {
      allTasks(lastId: $lastId, limit: $limit) {
        tasks {
          id
          ...Task_task
        }
        lastId
      }
    }
  }
  
  ${Task.fragments.task}
`;

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(propType(Task.fragments.task)),
  loading: PropTypes.bool,
  error: PropTypes.object,
  loadMore: PropTypes.func,
};

const QueriedTasksList = graphql(TasksListQuery, {
  options: {
    variables: { limit: 20, lastId: null },
    reducer: (previousResults, action) => {
      switch (action.operationName) {
        case 'TaskAdd_AddMutation':
          const newResultAdd = { ...previousResults },
            newTasks = [action.result.data.taskRepositoryMutation.addTask,
              ...previousResults.taskRepositoryQuery.allTasks.tasks];
          newResultAdd.taskRepositoryQuery.allTasks.tasks = newTasks;
          return newResultAdd;
        case 'Task_DeleteTaskMutation':
          const { id } = action.variables,
            newResultDelete = { ...previousResults },
            tasks = [...previousResults.taskRepositoryQuery.allTasks.tasks];

          _.remove(tasks, t => t.id === id);
          newResultDelete.taskRepositoryQuery.allTasks.tasks = tasks;
          return newResultDelete;
        default:
          return previousResults;
      }
    },
  },
  props: ({
    data: { loading, error, fetchMore, taskRepositoryQuery },
  }) => ({
    loading,
    error,
    tasks: _.get(taskRepositoryQuery, 'allTasks.tasks', []),
    lastId: _.get(taskRepositoryQuery, 'allTasks.lastId', null),
    loadMore: () => fetchMore({
      query: TasksListQuery,
      variables: {
        limit: 20,
        lastId: _.get(taskRepositoryQuery, 'allTasks.lastId', null),
      },
      updateQuery: (
        { taskRepositoryQuery: { allTasks: { tasks } } },
        { fetchMoreResult:
          { taskRepositoryQuery: { allTasks: { tasks: newTasks, lastId } } } },
      ) =>
      ({
        taskRepositoryQuery: {
          allTasks:
          {
            lastId,
            tasks: [...tasks, ...newTasks],
            __typename: 'AllTasks',
          },
          __typename: 'TaskRepositoryQuery',
        },
      }),
    }),
  }),
})(TasksList);
QueriedTasksList.Query = TasksListQuery;

export default QueriedTasksList;
