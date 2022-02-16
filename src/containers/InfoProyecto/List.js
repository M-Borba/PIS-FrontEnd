import React from "react";
import propTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Chip } from "@mui/material";
import List from "@mui/material/List";

const ListData = ({ title, type, data }) => (
  <>
    <Typography style={{ fontWeight: 600, fontSize: 14 }} variant="body1">
      {title}:
    </Typography>
    <List
      maxWidth={360}
      direction="row"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "auto",
        maxHeight: `${type === "personas" ? 370 : 145}`,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {data?.length !== 0 ? (
        data?.map((item) => {
          return (
            <Chip
              sx={{
                margin: "3px",
                fontFamily: "Nunito Sans",
                background: "#E3E1F3",
              }}
              label={item.full_name}
            />
          );
        })
      ) : (
        <Box style={{ paddingTop: 5 }}>
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
  data: propTypes.object.isRequired,
};

export default ListData;
