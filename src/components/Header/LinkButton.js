import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

export const LinkButton = ({ src, alt, title, to, isSelected }) => {
  const classes = useStyles();
  const selectedStyle = isSelected ? classes.selected : "";

  return (
    <Link className={`${classes.link} ${selectedStyle}`} to={to}>
      <div className={classes.button}>
        <img style={{ marginRight: 9 }} src={src} alt={alt} />
        {title}
      </div>
    </Link>
  );
};

LinkButton.propTypes = {
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
