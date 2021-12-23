import React from "react";
import propTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ListData = ({ title, type, data }) => (
  <>
    <Typography style={{ fontWeight: 600 }} variant="body1">
      {title}
    </Typography>
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        position: "relative",
        overflow: "auto",
        maxHeight: `${type === "personas" ? 370 : 145}`,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {data.length != 0 ? (
        data.map((item) => {
          return (
            <ListItem key={item.id} role="listitem">
              <ListItemText primary={item.full_name} />
            </ListItem>
          );
        })
      ) : (
        <Box style={{ paddingTop: 20 }}>
          <Typography variant="button" display="block" gutterBottom>
            Aún no hay {type} asociadas
          </Typography>
        </Box>
      )}
    </List>
  </>
);

ListData.propTypes = {
  title: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  data: propTypes.string.isRequired,
};

export default ListData;
