import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import TableContainer from './Table';


const tableRender = ({ resultSet }) => (
    TableContainer(resultSet)
);

const API_URL = "http://localhost:3989"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODc0NzAyNDksImV4cCI6MTU4NzU1NjY0OX0.nbmTk2kmgEDyaGMqNY7TGLfYIkVhN-NT-nkUrEqTlIQ",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || 
  (<Spin />)
)

const ChartRenderer = () => <QueryRenderer
  query={{
    "measures": [],
    "timeDimensions": [],
    "filters": [],
    "dimensions": [
      "Channels.title",
      "Channels.type"
    ]
  }}
  cubejsApi={cubejsApi}
  render={renderChart(tableRender)}
/>;

export default ChartRenderer;
