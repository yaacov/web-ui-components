import React from 'react';
import PropTypes from 'prop-types';

export const HealthBody = ({ children, className }) => <div className={className}>{children}</div>;

HealthBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
