import React from "react";
import propTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Chip } from "@mui/material";
import List from "@mui/material/List";

import { COLORS, PERSON_LABELS } from "../../config/globalVariables";

const ListData = ({ title, type, data }) => (
  <>
    <Typography style={{ fontWeight: 600, fontSize: 14 }} variant="body1">
      {title}:
    </Typography>
    <List
      direction="row"
      sx={{
        maxWidth: 360,
        width: "100%",
        position: "relative",
        overflow: "auto",
        maxHeight: `${
          type === PERSON_LABELS.PERSONAS.toLowerCase() ? 370 : 145
        }`,
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
                background: COLORS.menuItemSelected,
              }}
              label={item.full_name}
              key={item.id}
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
