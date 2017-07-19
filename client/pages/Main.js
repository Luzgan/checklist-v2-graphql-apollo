/**
 * Created by luzga_000 on 06/07/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import TasksList from '../components/TasksList';

class Main extends Component {
  static defaultProps = {
    data: {

    },
  };
  render() {
    const { userRepositoryQuery, taskRepositoryQuery, loading, error } = this.props.data;
    if (loading) {
      return (<div>Loading...</div>);
    }

    if (error) {
      console.log(error);
      return (<div>Error: {error.message}</div>);
    }

    return (
      <div className="row">
        <div className="col-lg-10">
          {userRepositoryQuery.user.name} {taskRepositoryQuery.tasksCount}
          <TasksList />
        </div>
      </div>
    );
  }
}

Main.fragments = {
  userRepositoryQuery: gql`
    fragment Main_userRepositoryQuery on UserRepositoryQuery {
      user {
        name
      }
    }
  `,
  taskRepositoryQuery: gql`
    fragment Main_taskRepositoryQuery on TaskRepositoryQuery {
      tasksCount
    }
  `,
};

Main.propTypes = {
  data: PropTypes.shape({
    userRepositoryQuery: propType(Main.fragments.userRepositoryQuery),
    taskRepositoryQuery: propType(Main.fragments.taskRepositoryQuery),
    loading: PropTypes.bool,
    error: PropTypes.object,
  }),
};

const MainQuery = gql`
  query Main {
    userRepositoryQuery {
      ...Main_userRepositoryQuery
    }
    
    taskRepositoryQuery {
      ...Main_taskRepositoryQuery
    }
  }
  
  ${Main.fragments.userRepositoryQuery}
  ${Main.fragments.taskRepositoryQuery}
`;

const QueriedMain = graphql(MainQuery, {
  options: {
    reducer: (previousResults, action) => {
      switch (action.operationName) {
        case 'TaskAdd_AddMutation':
          const newResultAdd = { ...previousResults };
          newResultAdd.taskRepositoryQuery.tasksCount += 1;

          return newResultAdd;
        case 'Task_DeleteTaskMutation':
          const newResultDelete = { ...previousResults };
          newResultDelete.taskRepositoryQuery.tasksCount -= 1;

          return newResultDelete;
        default:
          return previousResults;
      }
    },
  },
})(Main);
QueriedMain.Query = MainQuery;

export default QueriedMain;
