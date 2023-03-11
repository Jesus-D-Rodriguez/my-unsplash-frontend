import React from 'react';
import { Grid, GridList, GridListTile } from '@material-ui/core';

const MyMansoryLayout = ({ data }) => {
  return (
    <Grid container spacing={3}>
      <GridList cellHeight={200} cols={3}>
        {data.map((item) => (
          <GridListTile key={item.id} cols={item.cols || 1}>
            <img src={item.img} alt={item.title} />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
};

export default MyMansoryLayout;